import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";

import * as model from "../models/carts"
import { basicAuth } from "../controllers/auth";
import { validateCart } from "../controllers/validation";

const router = new Router({prefix: '/api/carts'});

//Get all carts
const getAll = async (ctx: RouterContext, next: any)=> {
    let carts = await model.getAll();
    if (carts.length) {
        ctx.body = carts;
    } else {
        ctx.body = {}
    }
    await next();
}

//Get specific cart by cart id
const getByCartId = async (ctx: RouterContext, next: any) => {
    let cart_id = +ctx.params.id;
    let carts = await model.getById(cart_id);
    if (carts.length) {
        ctx.body = carts[0];
      } else {
        ctx.status = 404;
      }
    await next();
}

//Create a new cart
const createCart = async (ctx: RouterContext, next: any) => {
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

//Update existing cart by cart id
const updateCart = async (ctx: RouterContext, next: any) => {
    const cart_id = ctx.params.id;
    const body = ctx.request.body;
    let result = await model.update(cart_id, body);
    if (result.status == 200) {
        ctx.status = 200;
        ctx.body = body;
    } else {
        ctx.status = 500;
        ctx.body = { err: "update data failed" };
    }
    await next();
}
  
//Delete existing cart by cart id
const deleteCart = async (ctx: RouterContext, next: any) => {
    const { id } = ctx.params;
    const cart = await model.getById(id);
    if (cart.length) {
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
        ctx.body = { err: "cart not found" };
    }
    await next();
} 

router.get('/', basicAuth, getAll);
router.post('/', basicAuth, bodyParser(), validateCart, createCart);
router.get('/:id([0-9]{1,})', basicAuth, getByCartId);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), validateCart, updateCart);
router.del('/:id([0-9]{1,})', basicAuth, deleteCart);

export { router };