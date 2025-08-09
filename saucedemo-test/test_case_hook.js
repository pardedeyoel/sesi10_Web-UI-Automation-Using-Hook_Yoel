const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

describe('Automation test login saucedemo menggunakan chrome', function () {
    let driver;
    this.timeout(60000); //bikin timeout mocha global (per test)
    let options;

    before(async function () {
        options = new chrome.Options();
        options.addArguments('--incognito'); //option ke chrome supaya gak ada popup passwordnya
        options.addArguments('--headless');  // headless
        // headless
        //driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build(); 

        //headed
        driver = await new Builder().forBrowser('chrome').build();
    });


        beforeEach(async function () {
        // Berhasil login dengan kredensial yang valid
        await driver.get('https://www.saucedemo.com');

        //isi kredential login
        let inputUsername = await driver.findElement(By.xpath('//*[@data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.xpath('//*[@data-test="login-button"]'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()

        // // assert: text dalam element benar
        let textAppLogo = await driver.wait(
            until.elementLocated(By.className('app_logo')), 5000
        );
        
        let logotext = await textAppLogo.getText()
        assert.strictEqual(logotext, 'Swag Labs')

        // //assert untuk cek apakah sudah berhasil login menggunakan url
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'https://www.saucedemo.com/inventory.html');
    });
    
    after(async function () {
        await driver.quit();
    });

    it('Sorting product name A - Z ', async function () {
        // //assert dropdown sort A-Z
        let sortDropdown = await driver.findElement(By.className('product_sort_container'));
        await sortDropdown.click();
        await driver.sleep(1700);


        //cek apakah sudah sort A-Z
        let option = await driver.findElement(By.xpath('//option[text()="Name (A to Z)"]'));
        await option.click();
    });

    it('Sorting price (low to high) ', async function () {
        // //assert dropdown sort price (low to high)
        let sortDropdown = await driver.findElement(By.className('product_sort_container'));
        await sortDropdown.click();
        await driver.sleep(1700);


        //cek apakah harga sudah low to high
        let option = await driver.findElement(By.xpath('//option[text()="Price (low to high)"]'));
        await option.click();
    });

        //jika pakai firefox
    // it('Berhasil login dengan kredensial yang valid', async function () {
    //     Options = new firefox.Options();
    //     Options.addArguments('--incognito'); //option ke chrome supaya gak ada popup passwordnya
    //     Options.addArguments('--headless');  // headless
    //     // headless
    //     //driver = await new Builder().forBrowser('firefox').setFirefoxOptions(Options).build(); 

    //     //headed
    //    driver = await new Builder().forBrowser('firefox').build(); 

    //     await driver.get('https://www.saucedemo.com');

    //     //isi kredential login
    //     let inputUsername = await driver.findElement(By.xpath('//*[@data-test="username"]'))
    //     let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
    //     let buttonLogin = await driver.findElement(By.xpath('//*[@data-test="login-button"]'))
    //     await inputUsername.sendKeys('standard_user')
    //     await inputPassword.sendKeys('secret_sauce')
    //     await buttonLogin.click()

    //     // assert: text dalam element benar
    //     let textAppLogo = await driver.findElement(By.className('app_logo'))
    //     let logotext = await textAppLogo.getText()
    //     assert.strictEqual(logotext, 'Swag Labs')


    //     //assert untuk cek apakah sudah berhasil login menggunakan url
    //     let currentUrl = await driver.getCurrentUrl();
    //     assert.strictEqual(currentUrl, 'https://www.saucedemo.com/inventory.html');

    //    // await driver.sleep(1700);
    //     await driver.quit();
        
    // });
});