import {test,expect,request} from '@playwright/test'

test.describe("@api @regression Advanced — Network and API Tests",()=>{
//Get Requests
    test("Get All users Returns 200", async({request})=>{
        const response = await request.get("https://jsonplaceholder.typicode.com/users");
        // Status code assertion
        expect (response.status()).toBe(200);
        expect (response.ok()).toBeTruthy();
         // Parse response body
        const users = await response.json();
        // Data assertions
        expect (users).toHaveLength(10);
        expect (users[0]).toHaveProperty("id");
        expect (users[0]).toHaveProperty("name");
        expect (users[0]).toHaveProperty("email");
        //verify Specific Data
        const firstUser = users[0];
        expect(firstUser.id).toBe(1);
        expect(firstUser.name).toBe("Leanne Graham");
        console.log(`Got ${users.length} users`);
        for (const user of users){
        console.log(user.name);
        }
    });
    test ("@smoke Single User By ID", async ({request})=>{
        const userId = 1;
        const response = await request.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        expect (response.status()).toBe(200);
        const user = await response.json();
        expect (user.id).toBe(userId);
        expect (user.name).toBeTruthy();
        expect (user.email).toContain('@');
    });
    test ("Not Existant user Returns 404", async ({request})=>{
        const allResponse = await request.get("https://jsonplaceholder.typicode.com/users/");
        expect (allResponse.status()).toBe(200);
        const allUsers = await allResponse.json();
        let userIDs = [];
        for (const user of allUsers){
           userIDs.push(user.id)
        }
        const maxID = Math.max(...userIDs)
        const nonExistantUserID = maxID + Math.floor(Math.random()*100)+1;
        const response = await request.get(`https://jsonplaceholder.typicode.com/users/${nonExistantUserID}`);
        console.log(`Response For User Id : ${nonExistantUserID} is : ${response}`)
        console.log(response)
        expect(response.status()).toBe(404);
    })
    //POST Requests — Creating Data
    test ("Post To Create New Request",async({request})=>{
        const newUser = {
            name: "Arya Stark",
            username: "arya.stark",
            email: "arya@testapp.com",
            phone: "9876543210",
            role: "tester"
        };
        const response = await request.post("https://jsonplaceholder.typicode.com/users",{data: newUser});
        expect (response.status()).toBe(201);
        const createdUser = await response.json();
        //verify all sent data is in response
        expect (createdUser.name).toBe(newUser.name);
        expect (createdUser.username).toBe(newUser.username);
        expect (createdUser.email).toBe(newUser.email);
        expect (createdUser.id).toBeTruthy();
        console.log(`Created User with ID : ${createdUser.id}`);
    });
    //PUT and PATCH updating Data
    test ("PUT update entire user record",async({request})=>{
        const updatedUser = {
            id : 1,
            name : "Leanne Graham Updated",
            username : "Bret.updated",
            email : "Sincereupdated@april.biz"
        };
        const response = await request.put('https://jsonplaceholder.typicode.com/users/1',{data:updatedUser});
        console.log(response.status());
        console.log(await response.text());
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect (result.name).toBe(updatedUser.name);
        expect (result.email).toBe(updatedUser.email);
    });
    test("PATCH updates single Field", async({request})=>{
        const response = await request.patch('https://jsonplaceholder.typicode.com/users/1',{data:{email:"new.email@test.com"}});
        console.log(response.status());
        console.log(response.text());
        expect (response.status()).toBe(200);
        const result = await response.json();
        console.log(result.email);
        expect (result.email).toBe("new.email@test.com");
    });
    //DELETE Requests
    test ("DELETE removes user", async({request})=>{
        const response = await request.delete("https://jsonplaceholder.typicode.com/users/1");
        console.log(response.status());
        console.log(response.text());
        expect (response.status()).toBe(200);
        const getResponse = await request.get('https://jsonplaceholder.typicode.com/users/1');
        // Note: JSONPlaceholder is a mock — in a real API this would be 404
    });
})