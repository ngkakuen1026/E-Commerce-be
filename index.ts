import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import KoaStatic from "koa-static";
import cors from '@koa/cors';

const app: Koa = new Koa();
const router: Router = new Router();

import { router as products } from "./routes/products";
import { router as users } from "./routes/users";
import { router as carts } from "./routes/carts";
import { router as reviews } from "./routes/reviews";
import { router as categories } from "./routes/categories";
import { router as pins } from "./routes/pins";
import { router as special } from "./routes/special";

app.use(cors());
app.use(logger());
app.use(json());
app.use(products.routes());
app.use(users.routes());
app.use(carts.routes());
app.use(reviews.routes());
app.use(categories.routes());
app.use(pins.routes());
app.use(special.routes());
app.use(router.routes());

app.use(KoaStatic('./docs'));

app.listen(10888);