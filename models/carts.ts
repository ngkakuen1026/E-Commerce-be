import * as db from "../helpers/db";

//Get all carts from database
export const getAll = async () => {
    let query = "SELECT * FROM carts;"
    let data = await db.run_query(query, null);
    return data;
}

//Get specific cart by cart id
export const getById = async (id: any) => {
    let query = "SELECT * FROM carts WHERE cart_id = ?"
    let values = [id]
    let data = await db.run_query(query, values);
    return data;
}

//Create a new cart in the database
export const add = async (cart: any) => {
    let keys = Object.keys(cart);
    let values = Object.values(cart);
    let key = keys.join(',');
    let param = '';
    for(let i: number=0; i<values.length; i++){ param +='?,'}
    param=param.slice(0,-1);
    let query = `INSERT INTO carts (${key}) VALUES (${param})`;
    try{
    await db.run_insert(query, values);
        return {status: 201};
    } catch(err: any) {
        return err;
    }
}

//Update existing cart by cart id  
export const update = async (cart_id: any, cart: any) => {
    let keys = Object.keys(cart);
    let values = Object.values(cart);
    let set = '';
    for (let i: number = 0; i < keys.length; i++) { set += `${keys[i]} = ? ,` }
    set = set.slice(0, -1);
    let query = `UPDATE carts SET ${set} WHERE cart_id = ?`;
    try {
      await db.run_query(query, [...values, cart_id]);
      return { status: 200 };
    } catch (err: any) {
      return err;
    }
}

//Delete existing cart by cart id
export const remove = async (cart_id: any) => {
    let query = `DELETE FROM carts WHERE cart_id = ?`;
    try {
      await db.run_query(query, [cart_id]);
      return { status: 200 };
    } catch (err: any) {
      return err;
    }
}