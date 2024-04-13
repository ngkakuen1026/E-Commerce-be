import * as db from "../helpers/db";

//Get all categories from database
export const getAll = async () => {
    let query = "SELECT * FROM categories;"
    let data = await db.run_query(query, null);
    return data;
}

//Get specific category by category id
export const getById = async (id: any) => {
    let query = "SELECT * FROM categories WHERE category_id = ?"
    let values = [id]
    let data = await db.run_query(query, values);
    return data;
}

//Create a new category in the database
export const add = async (category: any) => {
    let keys = Object.keys(category);
    let values = Object.values(category);
    let key = keys.join(',');
    let param = '';
    for(let i: number=0; i<values.length; i++){ param +='?,'}
    param=param.slice(0,-1);
    let query = `INSERT INTO categories (${key}) VALUES (${param})`;
    try{
    await db.run_insert(query, values);
        return {status: 201};
    } catch(err: any) {
        return err;
    }
}

//Update existing category by category id  
export const update = async (category_id: any, category: any) => {
    let keys = Object.keys(category);
    let values = Object.values(category);
    let set = '';
    for (let i: number = 0; i < keys.length; i++) { set += `${keys[i]} = ? ,` }
    set = set.slice(0, -1);
    let query = `UPDATE categories SET ${set} WHERE category_id = ?`;
    try {
      await db.run_query(query, [...values, category_id]);
      return { status: 200 };
    } catch (err: any) {
      return err;
    }
}

//Delete existing category by category id
export const remove = async (category_id: any) => {
    let query = `DELETE FROM categories WHERE category_id = ?`;
    try {
      await db.run_query(query, [category_id]);
      return { status: 200 };
    } catch (err: any) {
      return err;
    }
}