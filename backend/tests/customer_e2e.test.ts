import puppeteer from "puppeteer";

jest.setTimeout(90 * 1000);

describe("Placing an order", () => {
    let browser;
    let page;

    beforeAll(async () => {
      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto("http://localhost:3000/customer");
    });
  
    it("contains the donut card", async () => {
      await page.waitForSelector("#JellyCard");
      const text = await page.$eval("#JellyCard", (e) => e.textContent);
      expect(text).toContain("Jelly");
    });

    it("can add donut to cart", async() => {
        await page.click('#JellyAddBtn');
        await page.waitForSelector('#addedAlert');
        const text = await page.$eval("#addedAlert", (e) => e.textContent);
        expect(text).toContain("Added Jelly donut to cart!");  
    });
    
    it("can continue to cart", async() => {
        const [response] = await Promise.all([
            page.click('#continueToCart'),
            page.waitForNavigation()
        ]);
    });

    it("can show correct cart order headings", async () => {
        const data = await page.$$eval('#order-items-table thead tr th', tds => tds.map((td) => {
            return td.innerText;
          }));
        expect(data).toEqual(['Donut', 'Price']);
      });

    // it("can show correct cart items", async () => {
    //     const data = await page.$$eval('#order-items-table tbody tr td', tds => tds.map((td) => {
    //         return td.innerText;
    //     }));
    //     expect(data).toEqual(['Jelly', '2.5']);
    // });

    it("can show correct payment details", async () => {
        const rawData = await page.$$eval('#payment-details-table tbody tr', tds => tds.map((td) => {
            return td.innerText;
        }));
        const data = rawData.map(el => el.split("\t"));
        expect(data).toEqual([
            [ 'Subtotal', '2.50' ],
            [ 'Fees & Estimated Tax', '0.18' ],
            [ 'Total', '2.67' ]
          ]);
    });

    it("can continue to track order", async() => {
      const [response] = await Promise.all([
          page.click('#continueToTrackOrder'),
          page.waitForNavigation()
      ]);
    });

    afterAll(async() => {
        browser.close();
    });
    
  });
