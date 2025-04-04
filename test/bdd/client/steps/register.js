var { Given, When, Then, DataTable } = require('@cucumber/cucumber');
const{chromium, expect }= require("@playwright/test");

let browser;
let page;
let addressEmail
let pwd
const time = new Date();
Given(`I'm on the registering page`,async () => {
     browser= await chromium.launch({headless: true});
       page = await browser.newPage();
        await page.goto("http://localhost:5173/auth/register");
});

Given(`I enter the username {string}`,async(userName) => {
  if(userName!=='')
    userName=userName+time.getTime();

 await   page.getByPlaceholder('Enter your user name').fill(userName);
});

Given(`I enter the email register {string}`, async(email) => {
  if(email.includes("Badri")){
   addressEmail=email.replace("@", `+${time.getTime()}@`)
  }else{
    addressEmail=email;
  }
  
  await  page.getByPlaceholder('Enter your email').fill(addressEmail);
});

Given(`I enter the password register {string}`, async(password) => {
  pwd=password;
  await  page.getByPlaceholder('Enter your password').fill(password);
});

When(`I click on the Sign Up button`, async() => {
  await  page.getByRole("button", {name: "Sign Up"}).click();
});

Then(`I will be redirected to the sign in page`,  async() => {
 await  expect(page).toHaveURL("http://localhost:5173/auth/login");
});

Then(`The user is created`,async () => {
    // [Then] Describes the expected outcome or result of the scenario.
    const response = await page.request.post("http://localhost:5000/api/auth/login",{data:{email:addressEmail,password:pwd}});
    expect(response.status()).toEqual(200);
});


Then(`I remind in the Register page`, async() => {
    await expect(page).toHaveURL("http://localhost:5173/auth/register");
});


Then(`I have the error message register {string}`, async (errorMessage) => {
   await expect(page.getByText(errorMessage, { exact: true })).toBeVisible();
});