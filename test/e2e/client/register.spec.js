const {test,expect} = require('@playwright/test');
const registerURL = "http://localhost:5173/auth/register";

test("Register success", async({page}) =>{
    await page.goto(registerURL);
    const usernameField = page.getByPlaceholder("Enter your user name");
    const emailField = page.getByPlaceholder("Enter your email");
    const pwdField = page.getByPlaceholder("Enter your password");
    const signUpButton = page.getByRole("button", {
        name:"Sign Up",
        exact:true
    });
    const time = new Date();
    await usernameField.fill("Clara."+time.getTime());
    await emailField.fill("flq0963kv4."+time.getTime()+"@somelora.com");
    await pwdField.fill("@@clara@@");
    await signUpButton.click();
    await expect(page.getByText("Sign in to your account")).toBeVisible();
})

test("Register with empty credentials", async({page}) =>{
    await page.goto(registerURL);
    const usernameField = page.getByPlaceholder("Enter your user name");
    const emailField = page.getByPlaceholder("Enter your email");
    const pwdField = page.getByPlaceholder("Enter your password");
    const signUpButton = page.getByRole("button", {
        name:"Sign Up",
        exact:true
    })
    const time = new Date();
    await usernameField.fill("");
    await emailField.fill("flq0963kv"+time.getTime()+"@somelora.com");
    await pwdField.fill("@@clara@@");
    await signUpButton.click();
    await expect (page.getByText("Create new account")).toBeVisible();
})

