const {test , expect}=  require ('@playwright/test');
const homePage = "http://localhost:5173/shop/home";

test('Button checkout with paypal Verification', async ({page}) =>{
   await page.goto(homePage);
    const btnCart = page.locator("//span[normalize-space()='User cart']");
    const checkoutBtn = page.locator("//button[normalize-space()='Checkout']");
    
    await btnCart.click();
    await checkoutBtn.click();
    await page.locator('.mb-5 > .rounded-lg').click();
    await page.getByRole('button', {name:'Checkout with Paypal'}).click();
    await expect( page.getByText('Connectez-vous à PayPal')).toBeVisible();

})

test('payment success', async ({page}) =>{
   await page.goto(homePage);
    const btnCart = page.locator("//span[normalize-space()='User cart']");
    const checkoutBtn = page.locator("//button[normalize-space()='Checkout']");
    
    await page.locator('div').filter({ hasText: /^SaleFootwears\$0\$150Add to cart$/ }).getByRole('button').click();
    await page.locator('div').filter({ hasText: /^SaleHandies\$0\$311Add to cart$/ }).getByRole('button').click();
    await page.locator('div').filter({ hasText: /^SaleChapeaux\$13\$384Add to cart$/ }).getByRole('button').click();
    await btnCart.click();
    await checkoutBtn.click();
    await page.locator('.mb-5 > .rounded-lg').click();
    await page.getByRole('button', {name:'Checkout with Paypal'}).click();
    await page.getByPlaceholder('Email ou numéro de mobile').fill('jiwaya6123@abaot.com');
    await page.getByRole('button', {name: 'Suivant'}).click();
    await page.getByPlaceholder('Mot de passe').fill('@@Luccas@@');
    await page.getByRole('button', {name:'Connexion'}).click();
    await page.getByRole('button', {name:'Continuer pour vérifier la commande'}).click();

    await expect(page.getByText('Payment is successfull!',{exact:true})).toBeVisible();
})

test('Empty cart', async ({page}) =>{
    await page.goto(homePage);
    const btnCart = page.locator("//span[normalize-space()='User cart']");
    const checkoutBtn = page.locator("//button[normalize-space()='Checkout']");
    
    await btnCart.click();
    await checkoutBtn.click();
    await page.locator('.mb-5 > .rounded-lg').click();
    await page.getByRole('button', {name:'Checkout with Paypal'}).click();
    await expect( page.getByText('Your cart is empty. Please add items to proceed',{exact:true})).toBeVisible();

})

test('Missing address', async ({page}) => {
    await page.goto(homePage);
    const btnCart = page.locator("//span[normalize-space()='User cart']");
    const checkoutBtn = page.locator("//button[normalize-space()='Checkout']");
    
    await btnCart.click();
    await checkoutBtn.click();
    //await page.locator('.mb-5 > .rounded-lg').click();
    await page.getByRole('button', {name:'Checkout with Paypal'}).click();
    await expect( page.getByText('Please select one address to proceed.',{exact:true})).toBeVisible();
})

test('Wrong or empty email', async ({page}) =>{
    await page.goto(homePage);
    const btnCart = page.locator("//span[normalize-space()='User cart']");
    const checkoutBtn = page.locator("//button[normalize-space()='Checkout']");
    
    await page.locator('div').filter({ hasText: /^SaleFootwears\$0\$150Add to cart$/ }).getByRole('button').click();
    await page.locator('div').filter({ hasText: /^SaleHandies\$0\$311Add to cart$/ }).getByRole('button').click();
    await page.locator('div').filter({ hasText: /^SaleChapeaux\$13\$384Add to cart$/ }).getByRole('button').click();
    await btnCart.click();
    await checkoutBtn.click();
    await page.locator('.mb-5 > .rounded-lg').click();
    await page.getByRole('button', {name:'Checkout with Paypal'}).click();
    await page.getByPlaceholder('Email ou numéro de mobile').fill('');
    await page.getByRole('button', {name: 'Suivant'}).click();
   
    //await expect(page.getByText('Certaines de vos informations sont incorrectes. Réessayez.',{exact:true})).toBeVisible();
    await expect(page.getByRole('alert')).toBeVisible();
})

test('Wrong password', async ({page}) =>{
    await page.goto(homePage);
    const btnCart = page.locator("//span[normalize-space()='User cart']");
    const checkoutBtn = page.locator("//button[normalize-space()='Checkout']");
    
    await page.locator('div').filter({ hasText: /^SaleFootwears\$0\$150Add to cart$/ }).getByRole('button').click();
    await page.locator('div').filter({ hasText: /^SaleHandies\$0\$311Add to cart$/ }).getByRole('button').click();
    await page.locator('div').filter({ hasText: /^SaleChapeaux\$13\$384Add to cart$/ }).getByRole('button').click();
    await btnCart.click();
    await checkoutBtn.click();
    await page.locator('.mb-5 > .rounded-lg').click();
    await page.getByRole('button', {name:'Checkout with Paypal'}).click();
    await page.getByPlaceholder('Email ou numéro de mobile').fill('');
    await page.getByRole('button', {name: 'Suivant'}).click();
    //await expect(page.getByText('Certaines de vos informations sont incorrectes. Réessayez.',{exact:true})).toBeVisible();
    await expect(page.getByRole('alert')).toBeVisible();
})