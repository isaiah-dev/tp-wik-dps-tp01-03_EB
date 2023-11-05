"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const var_env = process.env.PING_LISTEN_PORT;
http.createServer((req, res) => {
    const route = req.url;
    try {
        if (req.method === "GET") {
            if (route === '/ping') {
                res.setHeader("Content-Type", "application/json");
                console.log("OK - Route connue : /ping");
                res.write(JSON.stringify(req.headers));
                res.end();
            }
            else {
                res.statusCode = 404;
                console.log(`404 - Adresse inconnue: "http://${var_env}${route}" n'est pas accessible.`);
                res.end();
            }
        }
    }
    catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end();
    }
}).listen(var_env);
