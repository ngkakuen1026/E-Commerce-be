import Koa from "koa";
import Router, {RouterContext} from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
const app: Koa = new Koa();

import {router as products} from "./routes/products";

const router: Router = new Router();

const welcomeAPI = async (ctx: RouterContext, next: any) => {
    ctx.body = {
        message: "E-commerce API!"
    };
    await next();
}

router.get('/api/welcomeAPI', welcomeAPI);
app.use(logger());
app.use(json());
app.use(products.routes());
app.use(router.routes());
app.listen(10888);
