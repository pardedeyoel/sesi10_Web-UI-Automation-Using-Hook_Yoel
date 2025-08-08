const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

describe('Automation test login saucedemo menggunakan chrome', function () {
    let driver;
    this.timeout(30000);

    it('Berhasil login dengan kredensial yang valid', async function () {
        Options = new chrome.Options();
        Options.addArguments('--incognito'); //option ke chrome supaya gak ada popup passwordnya
        Options.addArguments('--headless');  // headless
        // headless
        //driver = await new Builder().forBrowser('chrome').setChromeOptions(Options).build(); 

        //headed
       driver = await new Builder().forBrowser('chrome').build(); 

        await driver.get('https://www.saucedemo.com');

        //isi kredential login
        let inputUsername = await driver.findElement(By.xpath('//*[@data-test="username"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.xpath('//*[@data-test="login-button"]'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click()

        // assert: text dalam element benar
        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.strictEqual(logotext, 'Swag Labs')


        //assert untuk cek apakah sudah berhasil login menggunakan url
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'https://www.saucedemo.com/inventory.html');

       // await driver.sleep(1700);
        await driver.quit();
        
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
})