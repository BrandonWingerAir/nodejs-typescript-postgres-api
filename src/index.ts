import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"

function handleError(err, req, res, next) {
    res.status(err.statusCode || 500).send({message: err.message});
}

AppDataSource.initialize().then(async () => {
    const app = express()
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
    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
}).catch(error => console.log(error));
