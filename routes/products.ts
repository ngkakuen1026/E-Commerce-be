import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";

import * as model from "../models/products"
import { basicAuth } from "../controllers/auth";

const router = new Router({prefix: '/api/products'});

//Get all products
const getAll = async (ctx: RouterContext, next: any)=> {
    let products = await model.getAll();
    if (products.length) {
        ctx.body = products;
    } else {
        ctx.body = {}
    }
    await next();
}

//Get specific product by product id
const getByProductId = async (ctx: RouterContext, next: any) => {
    let product_id = +ctx.params.id;
    let products = await model.getById(product_id);
    if (products.length) {
        ctx.body = products[0];
      } else {
        ctx.status = 404;
      }
    await next();
}

//Create a new product
const createProduct = async (ctx: RouterContext, next: any) => {
    const body = ctx.request.body;
    let result = await model.add(body);
    if (result.status == 201) {
      ctx.status = 201;
      ctx.body = body;
      } else {
      ctx.status = 500;
      ctx.body = {err: "insert data failed"};
      }
    await next();
}

//Update existing product by product id
const updateProduct = async (ctx: RouterContext, next: any) => {
    const product_id = ctx.params.id;
    const body = ctx.request.body;
    let result = await model.update(product_id, body);
    if (result.status == 200) {
        ctx.status = 200;
        ctx.body = body;
    } else {
        ctx.status = 500;
        ctx.body = { err: "update data failed" };
    }
    await next();
}
  
//Delete existing product by product id
const deleteProduct = async (ctx: RouterContext, next: any) => {
    const { id } = ctx.params;
    const product = await model.getById(id);
    if (product.length) {
        const result = await model.remove(id);
        if (result.status == 200) {
            ctx.status = 204;
            ctx.body = { err: "delete data success" };
        } else {
            ctx.status = 500;
            ctx.body = { err: "delete data failed" };
        }
    } else {
        ctx.status = 404;
        ctx.body = { err: "product not found" };
    }
    await next();
} 

router.get('/', getAll);
router.post('/', bodyParser(), basicAuth, createProduct);
router.get('/:id([0-9]{1,})', getByProductId);
router.put('/:id([0-9]{1,})', bodyParser(), basicAuth, updateProduct);
router.del("/:id([0-9]{1,})", basicAuth, deleteProduct);

export { router };