import * as usersModel from '../models/users';

async function testUsers() {
  try {
    // // Test getAll function
    // const allUsers = await usersModel.getAll();
    // console.log('All Users:', allUsers);
    // console.log("---------");

    // // Test getById function
    // const userId = 8; // Provide an existing user ID
    // const userById = await usersModel.getById(userId);
    // console.log('User by ID:', userById);
    // console.log("---------");

    // // Test findByUsername function
    // const username = 'Jane Smith';
    // const userByUsername = await usersModel.findByUsername(username);
    // console.log('User by Username:', userByUsername);
    // console.log("---------");

    // Test add function
    const newUser = {
        name: 'testerNew',
        email: 'testNew@gmail.com',
        password: 'passwordNew',
    };
    const addUserResult = await usersModel.add(newUser);
    console.log('Add User Result:', addUserResult);
    console.log("---------");

    // Test update function
    // const updateUser = {
    //     name: 'tester777',
    //     password: 'password777',
    //     email: 'tester777@gmail.com'
    // };
    // const updateUserId = 7;
    // const updateUserResult = await usersModel.update(updateUserId, updateUser);
    // console.log('Update User Result:', updateUserResult);
    // console.log("---------");

    // Test remove function
    // const removeUserId = 7; 
    // const removeUserResult = await usersModel.remove(removeUserId);
    // console.log('Remove User Result:', removeUserResult);

  } catch (error) {
    console.error('Error:', error);
  }
}

testUsers();