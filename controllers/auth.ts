import passport from "koa-passport";
import { BasicStrategy } from "passport-http";
import { RouterContext } from "koa-router";
import bcrypt from "bcrypt";

import * as users from "../models/users";

const verifyPassword = async (user: any, password: string) => {
  try {
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    console.error(`Error occurred while verifying password: ${error}`);
    return false;
  }
};

const verifyPasswordPlain = (user: any, password: string) => {
    try {
      return user.password === password;
    } catch (error) {
      console.error(`Error occurred while verifying password: ${error}`);
      return false;
    }
};

passport.use(
  new BasicStrategy(async (username, password, done) => {
    let result: any[] = [];

    try {
      result = await users.findByUsername(username);
    } catch (error) {
      console.error(`Error during authentication for user ${username}: ${error}`);
      done(null, false);
    }

    if (result.length) {
      const user = result[0];
      if (await verifyPasswordPlain(user, password)) {
        done(null, { user: user });
      } else {
        console.log(`Password incorrect for ${username}`);
        done(null, false);
      }
    } else {
      console.log(`No user found with username ${username}`);
      done(null, false);
    }
  })
);

export const basicAuth = async (ctx: RouterContext, next: any) => {
  await passport.authenticate("basic", { session: false })(ctx, next);
  if (ctx.status == 401) {
    ctx.body = {
      message: "You are not authorized",
  };

  /* Comment out since need to get the data instead of the message after auth success */
  // } else {
  //   ctx.body = {
  //     message: "You are authenticated",
  //   };
  }
};