import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";

import * as model from "../models/reviews"
import { basicAuth } from "../controllers/auth";
import { validateReview } from "../controllers/validation";

const router = new Router({prefix: '/api/reviews'});

//Get all reviews
const getAll = async (ctx: RouterContext, next: any)=> {
    let reviews = await model.getAll();
    if (reviews.length) {
        ctx.body = reviews;
    } else {
        ctx.body = {}
    }
    await next();
}

//Get specific review by review id
const getByReviewId = async (ctx: RouterContext, next: any) => {
    let review_id = +ctx.params.id;
    let reviews = await model.getById(review_id);
    if (reviews.length) {
        ctx.body = reviews[0];
      } else {
        ctx.status = 404;
      }
    await next();
}

//Create a new review
const createReview = async (ctx: RouterContext, next: any) => {
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

//Update existing review by review id
const updateReview = async (ctx: RouterContext, next: any) => {
    const review_id = ctx.params.id;
    const body = ctx.request.body;
    let result = await model.update(review_id, body);
    if (result.status == 200) {
        ctx.status = 200;
        ctx.body = body;
    } else {
        ctx.status = 500;
        ctx.body = { err: "update data failed" };
    }
    await next();
}
  
//Delete existing review by review id
const deleteReview = async (ctx: RouterContext, next: any) => {
    const { id } = ctx.params;
    const review = await model.getById(id);
    if (review.length) {
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
        ctx.body = { err: "review not found" };
    }
    await next();
} 

router.get('/', getAll);
router.post('/', basicAuth, bodyParser(), validateReview, createReview);
router.get('/:id([0-9]{1,})', getByReviewId);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), validateReview, updateReview);
router.del('/:id([0-9]{1,})', basicAuth, deleteReview);

export { router };