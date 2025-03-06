const {test, expect} = require ('@playwright/test');
const homePage = "http://localhost:5173/shop/home";

test('Display checkout page', async ({page}) =>{
    await page.goto(homePage);
    const btnCart = page.locator("(//span[normalize-space()='User cart'])[1]");
    const checkoutBtn = page.locator("//button[normalize-space()='Checkout']");
console.log(btnCart)
    await btnCart.click();
    await checkoutBtn.click();

    await expect (page).toHaveURL('http://localhost:5173/shop/checkout');
    await expect(page.locator("//div[@class='rounded-lg border bg-card text-card-foreground shadow-sm']")).toBeVisible();
    await expect(page.locator("//div[@class='flex flex-col gap-4']")).toBeVisible();
    
})

test('check products name', async ({page}) =>{
    await page.goto(homePage);
    const btnCart = page.locator("//span[normalize-space()='User cart']");
    const checkoutBtn = page.locator("//button[normalize-space()='Checkout']");

    await btnCart.click();
    await checkoutBtn.click();

    const products= await page.$$("(//div[@class='mt-8 space-y-4'])//div//div/h3")
    for(const product of products) {
        const productName = await product.textContent();
        console.log(productName)
    }
})

test('increase price', async ({page}) => {
    await page.goto(homePage);
    const btnCart = page.locator("//span[normalize-space()='User cart']");
    const checkoutBtn = page.locator("//button[normalize-space()='Checkout']");

    await btnCart.click();
    await checkoutBtn.click();
    await page.getByRole('button', { name: 'Decrease' }).nth(1).click();

    await expect(page.locator("//div[@class='flex flex-col gap-4']//div//div/p").getByText('136')).toBeVisible();
    
})

test('increase quantity', async ({page}) => {
    await page.goto(homePage);
    const btnCart = page.locator("//span[normalize-space()='User cart']");
    const checkoutBtn = page.locator("//button[normalize-space()='Checkout']");

    await btnCart.click();
    await checkoutBtn.click();
    await page.getByRole('button', { name: 'Decrease' }).nth(1).click();

    await expect(page.locator("//div[@class='flex flex-col gap-4']//div//div/span").getByText('3')).toBeVisible();
    
})

