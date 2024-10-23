const {test,expect} = require('@playwright/test');
const loginUrl = "http://localhost:5173/auth/login";

test ( "Login succes", async ({page}) => {
    await page.goto(loginUrl);
    const emailField = page.getByPlaceholder("Enter your email");
    const pwdField = page.getByPlaceholder("Enter your password");
const  signInButton = page.getByRole("button", {
    name: "Sign In",
    exact: true,
})

await emailField.fill("anne.test@gmail.com");
await pwdField.fill("@@anne@@");
await signInButton.click();
await expect(page).toHaveURL("http://localhost:5173/shop/home");
})

test("Login with invatlid email", async ({page}) =>{
    await page.goto(loginUrl);
    const emailField = page.getByPlaceholder("Enter your email");
    const pwdField = page.getByPlaceholder("Enter your password");
    const signInButton = page.getByRole("button", {
        name:"Sign In",
        exact:true
    })

    await emailField.fill("anne.testgmail.com");
    await pwdField.fill("@@anne@@");
    await signInButton.click();
    
    await expect( page.getByText("Sign in to your account")).toBeVisible();
})

test ("Login with wrong password", async ({page}) =>{
     await page.goto(loginUrl);
    const emailField = page.getByPlaceholder("Enter your email");
    const pwdField = page.getByPlaceholder("Enter your password");
    const signInButton = page.getByRole("button", {
        name: "Sign In",
        exact:true
    })
    await emailField.fill("anne.test@gmail.com");
    await pwdField.fill("@@appwrite@");
    await signInButton.click();
    await expect(page.getByText('Incorrect password! Please try again', { exact: true })).toBeVisible();
})

test("Login with non existing credentials", async ({page}) =>{
     await page.goto(loginUrl);
    const emailField = page.getByPlaceholder("Enter your email");
    const pwdField = page.getByPlaceholder("Enter your password");
    const signInButton = page.getByRole("button", {
        name: "Sign In",
        exact: true
    })
    await emailField.fill("nasmia@gmail.com");
    await pwdField.fill("nasmia");
    await signInButton.click();
    await expect(page.getByText("User doesn't exists! Please register first", { exact: true })).toBeVisible();
})