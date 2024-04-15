import * as db from "../helpers/db";

//Get all users from database
export const getAll = async () => {
    let query = "SELECT * FROM users;"
    let data = await db.run_query(query, null);
    return data;
}

//Get specific user by user id
export const getById = async (id: any) => {
    let query = "SELECT * FROM users WHERE user_id = ?"
    let values = [id]
    let data = await db.run_query(query, values);
    return data;
}

//Get specific user by user name
export const findByUsername = async (username: any) => {
  const query = 'SELECT * from users where name = ?';
  const user = await db.run_query(query, [username]);
  return user;
}

//Create a new user in the database
export const add = async (user: any) => {
    let keys = Object.keys(user);
    let values = Object.values(user);
    let key = keys.join(',');
    let param = '';
    for(let i: number=0; i<values.length; i++){ param +='?,'}
    param=param.slice(0,-1);
    let query = `INSERT INTO users (${key}) VALUES (${param})`;
    try{
    await db.run_insert(query, values);
        return {status: 201};
    } catch(err: any) {
        return err;
    }
}

//Update existing user by user id  
export const update = async (user_id: any, user: any) => {
    let keys = Object.keys(user);
    let values = Object.values(user);
    let set = '';
    for (let i: number = 0; i < keys.length; i++) { set += `${keys[i]} = ? ,` }
    set = set.slice(0, -1);
    let query = `UPDATE users SET ${set} WHERE user_id = ?`;
    try {
      await db.run_query(query, [...values, user_id]);
      return { status: 200 };
    } catch (err: any) {
      return err;
    }
}

//Delete existing user by user id
export const remove = async (user_id: any) => {
    let query = `DELETE FROM users WHERE user_id = ?`;
    try {
      await db.run_query(query, [user_id]);
      return { status: 200 };
    } catch (err: any) {
      return err;
    }
}