import { Validator, ValidationError } from 'jsonschema';
import { RouterContext } from 'koa-router';

//Import schemas
import { prodcut } from '../schemas/products.schema';
import { user } from '../schemas/users.schema';
import { category } from '../schemas/categories.schema';
import { review } from '../schemas/reviews.schema';
import { pin } from '../schemas/pins.schema';
import { cart } from '../schemas/carts.schema';

const validator = new Validator();

const validateSchema = (schema: object) => async (ctx: RouterContext, next: any) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false,
  };
  const body = ctx.request.body;
  try {
    validator.validate(body, schema, validationOptions);
    await next();
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.body = error;
      ctx.status = 400;
    } else {
      throw error;
    }
  }
};

export const validateProduct = validateSchema(prodcut);
export const validateUser = validateSchema(user);
export const validateCategory = validateSchema(category);
export const validateReview = validateSchema(review);
export const validatePin = validateSchema(pin);
export const validateCart = validateSchema(cart);
