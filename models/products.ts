import * as db from "../helpers/db";

//Get all products from database
export const getAll = async () => {
    let query = "SELECT * FROM products;"
    let data = await db.run_query(query, null);
    return data;
}

//Get specific product by product id
export const getById = async (id: any) => {
    let query = "SELECT * FROM products WHERE product_id = ?"
    let values = [id]
    let data = await db.run_query(query, values);
    return data;
}

//Create a new product in the database
export const add = async (product: any) => {
    let keys = Object.keys(product);
    let values = Object.values(product);
    let key = keys.join(',');
    let param = '';
    for(let i: number=0; i<values.length; i++){ param +='?,'}
    param=param.slice(0,-1);
    let query = `INSERT INTO products (${key}) VALUES (${param})`;
    try{
    await db.run_insert(query, values);
        return {status: 201};
    } catch(err: any) {
        return err;
    }
}

//Update existing product by product id  
export const update = async (product_id: any, product: any) => {
    let keys = Object.keys(product);
    let values = Object.values(product);
    let set = '';
    for (let i: number = 0; i < keys.length; i++) { set += `${keys[i]} = ? ,` }
    set = set.slice(0, -1);
    let query = `UPDATE products SET ${set} WHERE product_id = ?`;
    try {
      await db.run_query(query, [...values, product_id]);
      return { status: 200 };
    } catch (err: any) {
      return err;
    }
}

//Delete existing product by product id
export const remove = async (product_id: any) => {
    let query = `DELETE FROM products WHERE product_id = ?`;
    try {
      await db.run_query(query, [product_id]);
      return { status: 200 };
    } catch (err: any) {
      return err;
    }
}