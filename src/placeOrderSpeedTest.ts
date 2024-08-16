// // src/placeOrderSpeedTest.ts


import { BreezeConnect } from './BreezeConnect';

import readline from 'readline';



const apiKey = "";
const apiSession = "";
const apiSecret = "";

// if (!apiKey || !apiSecret || !apiSession) {
//   console.error('Please set API_KEY, API_SECRET, and API_SESSION in your .env file');
//   process.exit(1);
// }

if (!apiKey || !apiSecret || !apiSession) {
  console.error('Please set API_KEY, API_SECRET, and API_SESSION in placeOrderSpeedTest.ts module on line number 10-12');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function placeOrderSpeedTest() {
  try {
    const breeze = new BreezeConnect(apiKey);

    console.log('Generating session...');
    await breeze.generateSession(apiSecret, apiSession);
    console.log('Session generated successfully');

    rl.question('How many orders do you want to place? ', async (numOrders) => {
      const orderCount = parseInt(numOrders);

      if (isNaN(orderCount) || orderCount <= 0) {
        console.error('Please enter a valid positive number.');
        rl.close();
        return;
      }

      console.log(`Placing ${orderCount} orders...`);

      const startTime = Date.now();

      const orderPromises = [];
      for (let i = 0, rateLimitHit = false; i < orderCount && !rateLimitHit; i++) {
        const orderPromise = breeze.placeOrder({
          stockCode: "RELIND",
          exchangeCode: "NSE",
          product: "cash",
          action: "buy",
          orderType: "limit",
          quantity: "1",
          price: "2800",
          validity: "day"
        }).then(result => {
          if (result.Status === 5) {
            rateLimitHit = true;
            console.log(`Rate limit hit after ${i + 1} orders: ${result.Error}`);
          }
          return result;
        });
        orderPromises.push(orderPromise);
      }
      const results = await Promise.all(orderPromises);

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      const successfulOrders = results.filter(r => r.Success).length;


      console.log(`Attempted to place ${orderCount} orders in ${totalTime} ms`);
      console.log(`Successfully placed ${successfulOrders} orders`);
      console.log(`Average time per order: ${totalTime / orderCount} ms`);

      console.log('Order Results:');
      results.forEach((result, index) => {
        if (result.Success) {
          console.log(`Order ${index + 1}: Success - Order ID: ${result.Success.order_id}`);
        } else {
          console.log(`Order ${index + 1}: Failed - ${result.Error}`);
        }
      });

      rl.close();
    });
  } catch (error) {
    console.error('Error:', error);
    rl.close();
  }
}

placeOrderSpeedTest();


const breeze = new BreezeConnect(apiKey);
breeze.generateSession(apiSecret, apiSession);






// main().catch(console.error);