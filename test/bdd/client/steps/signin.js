const { Given, When, Then } =require( '@cucumber/cucumber');
const{chromium, expect }= require("@playwright/test");
const { after, before } = require('node:test');

let browser;
let page;

Given(`I'm in sign in page`, async () => {
    browser= await chromium.launch({headless: false});
   page = await browser.newPage();
    page.goto("http://localhost:5173/auth/login");
   console.log("Sign In page");
});

Given(`I enter the email {string}`, async(email) => {
    await page.getByPlaceholder("Enter your email")
    .fill(email);
    console.log("Email: "+email);
});

Given(`I enter the password {string}`, async (password) => {
    await page.getByPlaceholder("Enter your password")
    .fill(password)
    console.log("Password: "+password);
});

When(`I click the Sign In button`, async() => {
    await page.getByRole("button", {
    name: "Sign In",
    exact: true,
}).click();
});

Then(`I'm redirected to the home page`, async () => {
    await expect(page).toHaveURL("http://localhost:5173/shop/home");
    await browser.close();
});

Then(`I'm staying on the sign in page`, async() => {
    await expect(page).toHaveURL("http://localhost:5173/auth/login");
});

Then(`I have the error message {string}`, async (errorMessage) => {
    await expect(page.getByText(errorMessage, { exact: true })).toBeVisible();
    console.log("Error Message: "+errorMessage);
    await browser.close();
});

after(async function (){
    await browser.close();
})