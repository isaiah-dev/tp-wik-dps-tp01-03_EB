"use strict";

import * as http from "http";

const var_env: string | undefined = process.env.PING_LISTEN_PORT;

http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {

    const route: string | undefined = req.url;

    try {
        if (req.method === "GET") {
            if (route === '/ping') {
                res.setHeader("Content-Type", "application/json");
                console.log("OK - Route connue : /ping");
                res.write(JSON.stringify(req.headers));
                res.end();
            } else {
                res.statusCode = 404;
                console.log(`404 - Adresse inconnue: "http://${var_env}${route}" n'est pas accessible.`);
                res.end();
            }
        }
    }
    catch (error: any) {
        console.error(error);
        res.statusCode = 500;
        res.end();
    }
}).listen(var_env);
