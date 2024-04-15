import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";

import * as model from "../models/categories"
import { basicAuth } from "../controllers/auth";

const router = new Router({prefix: '/api/categories'});

//Get all categories
const getAll = async (ctx: RouterContext, next: any)=> {
    let categories = await model.getAll();
    if (categories.length) {
        ctx.body = categories;
    } else {
        ctx.body = {}
    }
    await next();
}

//Get specific category by category id
const getByCategoryId = async (ctx: RouterContext, next: any) => {
    let category_id = +ctx.params.id;
    let categories = await model.getById(category_id);
    if (categories.length) {
        ctx.body = categories[0];
      } else {
        ctx.status = 404;
      }
    await next();
}

//Create a new category
const createCategory = async (ctx: RouterContext, next: any) => {
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

//Update existing category by category id
const updateCategory = async (ctx: RouterContext, next: any) => {
    const category_id = ctx.params.id;
    const body = ctx.request.body;
    let result = await model.update(category_id, body);
    if (result.status == 200) {
        ctx.status = 200;
        ctx.body = body;
    } else {
        ctx.status = 500;
        ctx.body = { err: "update data failed" };
    }
    await next();
}
  
//Delete existing category by category id
const deleteCategory = async (ctx: RouterContext, next: any) => {
    const { id } = ctx.params;
    const category = await model.getById(id);
    if (category.length) {
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
        ctx.body = { err: "category not found" };
    }
    await next();
} 



router.get('/', getAll);
router.post('/', bodyParser(), basicAuth, createCategory);
router.get('/:id([0-9]{1,})', getByCategoryId);
router.put('/:id([0-9]{1,})', bodyParser(), basicAuth, updateCategory);
router.del('/:id([0-9]{1,})', basicAuth, deleteCategory);

export { router };