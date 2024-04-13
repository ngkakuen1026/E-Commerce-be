import * as db from "../helpers/db";

//Get all reviews from database
export const getAll = async () => {
    let query = "SELECT * FROM reviews;"
    let data = await db.run_query(query, null);
    return data;
}

//Get specific review by review id
export const getById = async (id: any) => {
    let query = "SELECT * FROM reviews WHERE review_id = ?"
    let values = [id]
    let data = await db.run_query(query, values);
    return data;
}

//Create a new review in the database
export const add = async (review: any) => {
    let keys = Object.keys(review);
    let values = Object.values(review);
    let key = keys.join(',');
    let param = '';
    for(let i: number=0; i<values.length; i++){ param +='?,'}
    param=param.slice(0,-1);
    let query = `INSERT INTO reviews (${key}) VALUES (${param})`;
    try{
    await db.run_insert(query, values);
        return {status: 201};
    } catch(err: any) {
        return err;
    }
}

//Update existing review by review id  
export const update = async (review_id: any, review: any) => {
    let keys = Object.keys(review);
    let values = Object.values(review);
    let set = '';
    for (let i: number = 0; i < keys.length; i++) { set += `${keys[i]} = ? ,` }
    set = set.slice(0, -1);
    let query = `UPDATE reviews SET ${set} WHERE review_id = ?`;
    try {
      await db.run_query(query, [...values, review_id]);
      return { status: 200 };
    } catch (err: any) {
      return err;
    }
}

//Delete existing review by review id
export const remove = async (review_id: any) => {
    let query = `DELETE FROM reviews WHERE review_id = ?`;
    try {
      await db.run_query(query, [review_id]);
      return { status: 200 };
    } catch (err: any) {
      return err;
    }
}