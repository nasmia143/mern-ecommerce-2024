const {test,expect} = require ('@playwright/test');
const homePage ='http://localhost:5173/shop/home';

test ("Profil ", async ({page}) =>{
    await page.goto(homePage);
    
    const profilButton = page.getByText('A', { exact: true} );
    await profilButton.click({profilButton:"left"});
    expect(page.getByText("Account")).toBeVisible;

})

test ("Account page ", async ({page}) =>{
    await page.goto(homePage);
    
    const profilButton = page.getByText('A', { exact: true} );
    await profilButton.click({profilButton:"left"});
    await page.getByRole('menuitem', {name:'Account'}).click();

    await expect(page).toHaveURL('http://localhost:5173/shop/account');
    expect(page.getByText("Orders")).toBeVisible;

})

test('Display Orders', async ({page}) =>{
    await page.goto(homePage);
    
    const profilButton = page.getByText('A', { exact: true} );
    await profilButton.click({profilButton:"left"});
    await page.getByRole('menuitem', {name:'Account'}).click();
    //await expect (page.getByRole('tab', { name: 'Orders' })).toBeVisible();
 
    //const Orders= await page.$$("(@div[id='radix-:r7o:-content-orders'])//div//div//div//table//tbody/tr");
    const Orders = await page.$$("(//div[@dir='ltr'])//div//div/div//table//tbody/tr")
    for(const order of Orders) {
        const OrderId = await order.textContent();
        console.log(OrderId)
    }

})
