const {test, expect} = require ('@playwright/test');


test('Chop by category', async ({page}) =>{
    await page.goto('http://localhost:5173/shop/home');
    expect(page.getByText('Shop by category')).toBeVisible;

    expect(page.getByRole('button', { name: 'Men' })).toBeVisible;
    expect(page.getByRole('button', { name: 'Women' })).toBeVisible;
    expect(page.getByRole('button', { name: 'Kids' })).toBeVisible;
    expect(page.getByRole('button', { name: 'Accessories' })).toBeVisible;
    expect(page.getByRole('button', { name: 'Footwear' })).toBeVisible;
    
})

test('Display product details', async ({page})  =>{
    await page.goto("http://localhost:5173/shop/home");
    const button = page.locator("(//div[@class='relative'])[2]");

    await button.click({button:"left"});
    
    expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible;
})

test('Add to cart from details window', async ({page})  =>{
    await page.goto("http://localhost:5173/shop/home");
    const addButton = page.getByRole("button", {
        name: "Add to Cart",
        exact: true
    })
    const button =  page.locator("(//div[@class='relative'])[2]");
    await button.click({button:"left"});
    await addButton.click();
    
    expect(page.getByText("Product is added to cart")).toBeVisible;
})

test('Add to cart directly from home page', async ({page})  =>{
    await page.goto("http://localhost:5173/shop/home");
    const addButton = page.locator("(//div[@class='flex items-center p-6 pt-0'])[2]");
     
     page.locator("(//div)[50]");
   
    await addButton.click();
    
    expect(page.getByText("Product is added to cart")).toBeVisible;
})

test("Display cart", async ({page}) => {
    await page.goto("http://localhost:5173/shop/home");
    const btnCart = page.getByRole('button', { name: 'User cart'});
    await btnCart.click();

    expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible;
})

test ("Profil button", async ({page}) =>{
    await page.goto("http://localhost:5173/shop/home");
    //const profilButton = page.locator("//span[@id='radix-:r6:']");
    const profilButton = page.getByText('A', { exact: true} );
    await profilButton.click({profilButton:"left"});
    expect(page.getByText("Account")).toBeVisible;

})