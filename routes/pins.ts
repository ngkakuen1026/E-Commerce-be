import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";

import * as model from "../models/pins"

const router = new Router({prefix: '/api/pins'});

//Get all pins
const getAll = async (ctx: RouterContext, next: any)=> {
    let pins = await model.getAll();
    if (pins.length) {
        ctx.body = pins;
    } else {
        ctx.body = {}
    }
    await next();
}

//Get specific pin by pin id
const getByPinId = async (ctx: RouterContext, next: any) => {
    let pin_id = +ctx.params.id;
    let pins = await model.getById(pin_id);
    if (pins.length) {
        ctx.body = pins[0];
      } else {
        ctx.status = 404;
      }
    await next();
}

//Create a new pin
const createPin = async (ctx: RouterContext, next: any) => {
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

//Update existing pin by pin id
const updatePin = async (ctx: RouterContext, next: any) => {
    const pin_id = ctx.params.id;
    const body = ctx.request.body;
    let result = await model.update(pin_id, body);
    if (result.status == 200) {
        ctx.status = 200;
        ctx.body = body;
    } else {
        ctx.status = 500;
        ctx.body = { err: "update data failed" };
    }
    await next();
}
  
//Delete existing pin by pin id
const deletePin = async (ctx: RouterContext, next: any) => {
    const { id } = ctx.params;
    const pin = await model.getById(id);
    if (pin.length) {
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
        ctx.body = { err: "pin not found" };
    }
    await next();
} 

router.get('/', getAll);
router.post('/', bodyParser(), createPin);
router.get('/:id([0-9]{1,})', getByPinId);
router.put('/:id([0-9]{1,})', bodyParser(), updatePin);
router.del('/:id([0-9]{1,})', deletePin);

export { router };