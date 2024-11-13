import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import * as morgan from "morgan";
import { Routes } from "./routes";

import { port } from "./config";

function handleError(err, req, res, next) {
    res.status(err.statusCode || 500).send({message: err.message});
}

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(morgan('tiny')); // Production: 'combined'
    app.use(bodyParser.json());

    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next);
                res.json(result);
            } catch(error) {
                next(error);
            }
        });
    });

    app.use(handleError);
    app.listen(port);

    console.log(`Express server has started on port ${port}.`);
}).catch(error => console.log(error));
