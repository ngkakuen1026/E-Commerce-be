import Koa from "koa";
import Router, {RouterContext} from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
const app: Koa = new Koa();

import {router as products} from "./routes/products";
import {router as users} from "./routes/users";
import {router as carts} from "./routes/carts";
import {router as reviews } from "./routes/reviews";
import {router as categories} from "./routes/categories";
import {router as pins } from "./routes/pins";


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
app.use(users.routes());
app.use(carts.routes());
app.use(reviews.routes());
app.use(categories.routes());
app.use(pins.routes())
app.use(router.routes());
app.listen(10888);
