import * as db from "../helpers/db";

//Get all pins from database
export const getAll = async () => {
    let query = "SELECT * FROM pins;"
    let data = await db.run_query(query, null);
    return data;
}

//Get specific pin by pin id
export const getById = async (id: any) => {
    let query = "SELECT * FROM pins WHERE pin_id = ?"
    let values = [id]
    let data = await db.run_query(query, values);
    return data;
}

//Create a new pin in the database
export const add = async (pin: any) => {
    let keys = Object.keys(pin);
    let values = Object.values(pin);
    let key = keys.join(',');
    let param = '';
    for(let i: number=0; i<values.length; i++){ param +='?,'}
    param=param.slice(0,-1);
    let query = `INSERT INTO pins (${key}) VALUES (${param})`;
    try{
    await db.run_insert(query, values);
        return {status: 201};
    } catch(err: any) {
        return err;
    }
}

//Update existing pin by pin id  
export const update = async (pin_id: any, pin: any) => {
    let keys = Object.keys(pin);
    let values = Object.values(pin);
    let set = '';
    for (let i: number = 0; i < keys.length; i++) { set += `${keys[i]} = ? ,` }
    set = set.slice(0, -1);
    let query = `UPDATE pins SET ${set} WHERE pin_id = ?`;
    try {
      await db.run_query(query, [...values, pin_id]);
      return { status: 200 };
    } catch (err: any) {
      return err;
    }
}

//Delete existing pin by pin id
export const remove = async (pin_id: any) => {
    let query = `DELETE FROM pins WHERE pin_id = ?`;
    try {
      await db.run_query(query, [pin_id]);
      return { status: 200 };
    } catch (err: any) {
      return err;
    }
}