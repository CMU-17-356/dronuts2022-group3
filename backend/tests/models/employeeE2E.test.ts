import { CustomerModel, CustomerInterface} from '../../src/models/customer';

const puppeteer = require('puppeteer');


jest.useFakeTimers()
jest.setTimeout(90 * 1000)
describe('Employee E2E test', function() {

    it('Ensure we read Recent Orders in employee/orders', async () => {
      const browser = await puppeteer.launch();
	  const page = await browser.newPage();
	  await page.goto('http://localhost:3000/employee');
	  await page.click('#root > div > div > div > nav > a:nth-child(2)');
	  const element = await page.waitForSelector('#root > div > main > div.MuiContainer-root.MuiContainer-maxWidthMd.css-jcfe1v-MuiContainer-root > div');
	  const value = await element.evaluate(el => el.textContent);
	  // await page.click('#root > main > div > a');
	  // await page.screenshot({ path: 'dronuts.png' });
	  await browser.close();

	  expect(value).toEqual('Recent Orders');
    });

    it('Ensure we can navigate to Dashboard page', async () => {
      const browser = await puppeteer.launch();
	  const page = await browser.newPage();
	  await page.goto('http://localhost:3000/employee');
	  await page.click('#root > div > div > div > nav > a:nth-child(1)');
	  expect(page.url()).toEqual('http://localhost:3000/employee/dashboard')
	  await browser.close();
    });

    it('Ensure we can navigate to Dashboard page after multiple navigations elsewhere', async () => {
      const browser = await puppeteer.launch();
	  const page = await browser.newPage();
	  await page.goto('http://localhost:3000/employee');
	  for (let i = 1; i < 4; i++) {
		  await page.click('#root > div > div > div > nav > a:nth-child('+i+')');
	  }
	  await page.click('#root > div > div > div > nav > a:nth-child(1)');
	  expect(page.url()).toEqual('http://localhost:3000/employee/dashboard')
	  await browser.close();
    });

    // Dummy test
    it('should be invalid if a field is empty', () => {
        const c = new CustomerModel();
        
        c.validate(function(err) {
            expect(err).toBeDefined();
        });
    });
});