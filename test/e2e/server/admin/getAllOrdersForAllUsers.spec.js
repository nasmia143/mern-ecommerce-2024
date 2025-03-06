const {test,expect } = require("@playwright/test");

const getallOrdersForAdmin="admin/orders/get";

test("Get all users orders with success",async ({request})=>{
    const response = await request.get(getallOrdersForAdmin);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toEqual(200);
    expect(await response.json()).not.toBeNull()
    expect(await response.json()).not.toBe([])
});