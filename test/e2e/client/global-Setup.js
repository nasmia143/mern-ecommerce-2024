
import {  chromium, expect} from '@playwright/test';

async function globalSetup(){
const browser = await chromium.launch({headed:true});
const context = await browser.newContext();
const page= await context.newPage();
await page.goto('http://localhost:5173/auth/login');
await page.getByPlaceholder("Enter your email").fill("anne.test@gmail.com");
await page.getByPlaceholder("Enter your password").fill("@@anne@@");
await page.getByRole('button',{name: 'Sign In'}).click();

await expect(page).toHaveURL("http://localhost:5173/shop/home");

await page.context().storageState({path:"./test/e2e/client/.auth/user.json"})

await browser.close();
}

export default globalSetup;