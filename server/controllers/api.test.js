const api = require("./auth.controller")
const request = require("supertest")
const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGZjMjAzMTFhMzQzNDNjODdlOWM0MSIsImlhdCI6MTY4Mjk0ODY2MywiZXhwIjoxNjgzMDM1MDYzfQ.Tlaz6xnx1XAanSvgvFFpZ0_k_1Bf2iP2wYedk1nnq_w"
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDdlM2YxYWY2ODJmMjc3MGYyMjA2MiIsImlhdCI6MTY4Mjg4NzQ0MCwiZXhwIjoxNjgyOTczODQwfQ.jP2-JnoI6Ic_Evcm1FquXjl2FRqmSvgM-uBsQMJgbt8'
const authHeaders = {'x-access-token': token}

describe ("DELETE API", () => {
    const calendarApi = request(`http://localhost:8080/api/auth`)
    const id='644f84225b40c103b4f0e3d1';
    
    it("GET: should return all users", async () => {
        await calendarApi
        .get("/users").set(authHeaders)
        .expect(200)
        });
        //fail test
        it ("DELETE: token test: should throw erorr without a token", async () => {
            const response = await calendarApi
            .delete("/removeuser/"+id).expect(403);
            console.log(response.body.message);
            expect(response.body).toEqual({
                message: "No token provided"
            })
        });
        it ("DELETE: token test: should throw erorr without a valid token", async () => {
            const response = await calendarApi
            .delete("/removeuser/"+id).set("x-access-token", "asd").expect(401);
            expect(response.body).toEqual({
                message: "Unauthorized"
            })
        });
        it ("DELETE: role test: should throw erorr without an admin role", async () => {
            const response = await calendarApi
            .delete("/removeuser/"+id).set("x-access-token", userToken).expect(403);
            expect(response.body).toEqual({
                message: "Require Admin Role!"
            })
        });
        it ("should succesfully delete user by id=644f84225b40c103b4f0e3d1",async () => {
            await calendarApi
            .delete("/removeuser/644f84225b40c103b4f0e3d1")
            .set(authHeaders)
            .expect(200)
            
        });
    it("should not find user by id after delete test", async () => {
        await calendarApi
        .get("/user/"+id).set(authHeaders).expect(404)
    });
    
});