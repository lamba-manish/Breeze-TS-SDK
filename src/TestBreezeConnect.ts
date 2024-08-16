// src/test-breeze-connect.ts

import { BreezeConnect } from './BreezeConnect';
import * as dotenv from 'dotenv';
dotenv.config();

// Load environment variables
// dotenv.config();

// const apiKey = process.env.API_KEY;
// const apiSecret = process.env.API_SECRET;
// const apiSession = process.env.API_SESSION;

// Enter your api key below, e.g. const apiKey = "hibreezeTS";
const apiKey = ""; 
// Enter your api session below
const apiSession = ""; 
// Enter your api secret below
const apiSecret = "";


// if (!apiKey || !apiSecret || !apiSession) {
//   console.error('Please set API_KEY, API_SECRET, and API_SESSION in your .env file');
//   process.exit(1);
// }

if (!apiKey || !apiSecret || !apiSession) {
  console.error('Please set API_KEY, API_SECRET, and API_SESSION in placeOrderSpeedTest.ts module on line number 14-19');
  process.exit(1);
}

async function testBreezeConnect() {
  try {
    // Create an instance of BreezeConnect
    const breeze = new BreezeConnect(apiKey);

    // Generate session
    console.log('Generating session...');
    await breeze.generateSession(apiSecret, apiSession);
    console.log('Session generated successfully');

    // // Get customer details
    // console.log('Fetching customer details...');
    // const customerDetails = await breeze.getCustomerDetails();
    // console.log('Customer Details:');
    // console.log(JSON.stringify(customerDetails, null, 2));

    // console.log('Fetching demat holdings...');
    // const dematHoldings = await breeze.getDematHoldings();
    // console.log('Demat Holdings:');
    // console.log(JSON.stringify(dematHoldings, null, 2));

    // console.log('Fetching funds...');
    // const funds = await breeze.getFunds();
    // console.log('Funds:', JSON.stringify(funds, null, 2));

    // console.log('Setting funds...');
    // const setFundsResult = await breeze.setFunds({
    //   transactionType: "credit",
    //   amount: "100",
    //   segment: "fno"
    // });
    // console.log('Set Funds Result:', JSON.stringify(setFundsResult, null, 2));

    // console.log('Fetching historical data...');
    // const historicalData = await breeze.getHistoricalData({
    //   interval: '1day',
    //   fromDate: '2024-06-01T09:15:00.000Z',
    //   toDate: '2024-06-04T15:30:00.000Z',
    //   stockCode: 'NIFTY',
    //   exchangeCode: 'NFO',
    //   productType: 'options',
    //   strikePrice: '24000',
    //   expiryDate: '25-Jul-2024',
    //   right:'call',
    // });
    // console.log('Historical Data:', JSON.stringify(historicalData, null, 2));

    // console.log('Fetching historical data v2...');
    // const historicalDataV2 = await breeze.getHistoricalDatav2({
    //   interval: '1day',
    //   fromDate: '2024-06-01T09:15:00.000Z',
    //   toDate: '2024-06-05T15:30:00.000Z',
    //   stockCode: 'ITC',
    //   exchangeCode: 'bse'
    // });
    // console.log('Historical Data V2:', JSON.stringify(historicalDataV2, null, 2));

    // console.log('Adding margin...');
    // const addMarginResult = await breeze.addMargin({
    //   productType: "margin",
    //   stockCode: "CNXBAN",
    //   exchangeCode: "NFO",
    //   settlementId: "2021220",
    //   addAmount: "100",
    //   marginAmount: "3817.10",
    //   openQuantity: "10",
    //   coverQuantity: "0"
    // });
    // console.log('Add Margin Result:', JSON.stringify(addMarginResult, null, 2));

    // console.log('Getting margin...');
    // const marginResult = await breeze.getMargin('');
    // console.log('Margin Result:', JSON.stringify(marginResult, null, 2));

    console.log('Placing order...');
    const placeOrderResult = await breeze.placeOrder({
      stockCode: "CNXBAN",
      exchangeCode: "NFO",
      product: "options",
      action: "buy",
      orderType: "limit",
      quantity: "25",
      price: "1.2",
      validity: "day",
      strikePrice: '49000',
      expiryDate: '21-Aug-2024',
      right: 'call'
    });
    console.log('Place Order Result:', JSON.stringify(placeOrderResult, null, 2));

    // if (placeOrderResult.Success && placeOrderResult.Success.order_id) {
    //     console.log('Getting order details...');
    //     const orderDetail = await breeze.getOrderDetail({
    //       exchangeCode: "NFO",
    //       orderId: placeOrderResult.Success.order_id
    //     });
    //     console.log('Order Detail:', JSON.stringify(orderDetail, null, 2));
    //   }

    // console.log('Getting order list...');
    // const orderList = await breeze.getOrderList({
    //   exchangeCode: "NFO",
    //   fromDate: "2024-08-16T00:00:00.000Z",
    //   toDate: "2024-08-16T23:59:59.999Z"
    // });
    // console.log('Order List:', JSON.stringify(orderList, null, 2));

    // if (placeOrderResult.Success && placeOrderResult.Success.order_id) {
    //   // Now cancel the order we just placed
    //   console.log('Cancelling the order...');
    //   const cancelOrderResult = await breeze.cancelOrder({
    //     exchangeCode: "NFO",
    //     orderId: placeOrderResult.Success.order_id
    //   });
    //   console.log('Cancel Order Result:', JSON.stringify(cancelOrderResult, null, 2));
    // }

    // if (placeOrderResult.Success && placeOrderResult.Success.order_id) {
    //     // Now modify the order we just placed
    //     console.log('Modifying the order...');
    //     const modifyOrderResult = await breeze.modifyOrder({
    //       orderId: "202408071300025400",
    //       exchangeCode: "NFO",
    //       orderType: "limit",
    //       quantity: "15",
    //       price: "70",
    //       validity: "day",
    //     });
    //     console.log('Modify Order Result:', JSON.stringify(modifyOrderResult, null, 2));
    //   }

    // console.log('Getting portfolio holdings...');
    // const portfolioHoldings = await breeze.getPortfolioHoldings({
    //   exchangeCode: "NFO",
    //   fromDate: "2024-08-07T00:00:00.000Z",
    //   toDate: "2024-08-07T23:59:59.999Z"
    // });
    // console.log('Portfolio Holdings:', JSON.stringify(portfolioHoldings, null, 2));

    // console.log('Getting portfolio positions...');
    // const portfolioPositions = await breeze.getPortfolioPositions();
    // console.log('Portfolio Positions:', JSON.stringify(portfolioPositions, null, 2));

    // console.log('Getting quotes...');
    // const quotes = await breeze.getQuotes({
    //   stockCode: "CNXBAN",
    //   exchangeCode: "NFO",
    //   productType: "futures",
    //   right: 'others',
    //   expiryDate: "2024-08-28T06:00:00.000Z"
    // });
    // console.log('Quotes:', JSON.stringify(quotes, null, 2));

    // console.log('Getting option chain quotes...');
    // const optionChainQuotes = await breeze.getOptionChainQuotes({
    //   stockCode: "CNXBAN",
    //   exchangeCode: "NFO",
    //   productType: "options",
    //   expiryDate: "2024-08-07T06:00:00.000Z",
    //   right: "put",
    //   strikePrice: "50000"
    // });
    // console.log('Option Chain Quotes:', JSON.stringify(optionChainQuotes, null, 2));

    // console.log('Squaring off a position...');
    // const squareOffResult = await breeze.squareOff({
    //   stockCode: "CNXBAN",
    //   exchangeCode: "NFO",
    //   productType: "options",
    //   quantity: "15",
    //   price: "2",
    //   action: "sell",
    //   orderType: "limit",
    //   validity: "day",
    //   strikePrice: '49000',
    //   expiryDate: '07-Aug-2024',
    //   right: 'put',
    // });
    // console.log('Square Off Result:', JSON.stringify(squareOffResult, null, 2));

    // console.log('Getting trade list...');
    // const tradeList = await breeze.getTradeList({
    //   exchangeCode: "NFO",
    //   fromDate: "2024-08-01T00:00:00.000Z",
    //   toDate: "2024-08-07T23:59:59.999Z"
    // });
    // console.log('Trade List:', JSON.stringify(tradeList, null, 2));


        // console.log('Getting trade detail...');
        // const tradeDetail = await breeze.getTradeDetail({
        //   exchangeCode: 'NFO',
        //   orderId: '202408071300030694'
        // });
        // console.log('Trade Detail:', JSON.stringify(tradeDetail, null, 2));

    // console.log('Previewing order...');
    // const previewOrderResult = await breeze.previewOrder({
    //   stockCode: "NIFTY",
    //   exchangeCode: "NFO",
    //   productType: "options",
    //   orderType: "market",
    //   price: "0",
    //   action: "buy",
    //   quantity: "25",
    //   expiryDate: '08-Aug-2024',
    //   right: 'call',
    //   strikePrice: '24500',
    //   specialFlag:'N',
    //   stoploss: '',
    //   orderRateFresh: ''
    // });
    // console.log('Preview Order Result:', JSON.stringify(previewOrderResult, null, 2));

    // console.log('Calculating limit...');
    // const limitCalculatorResult = await breeze.limitCalculator({
    //   strikePrice: "49900",
    //   productType: "optionplus",
    //   expiryDate: "07-Aug-2024",
    //   underlying: "CNXBAN",
    //   exchangeCode: "NFO",
    //   orderFlow: "sell",
    //   stopLossTrigger: "10",
    //   optionType: "put",
    //   sourceFlag: "P",
    //   limitRate: "",
    //   orderReference: "",
    //   availableQuantity: "",
    //   marketType: "limit",
    //   freshOrderLimit: "177.70"
    // });
    // console.log('Limit Calculator Result:', JSON.stringify(limitCalculatorResult, null, 2));

    // console.log('Calculating margin...');
    // const positions: Position[] = [
    //   {
    //     strike_price: "0",
    //     quantity: "15",
    //     right: "others",
    //     product: "futures",
    //     action: "buy",
    //     price: "50000",
    //     expiry_date: "28-Aug-2024",
    //     stock_code: "CNXBAN",
    //     cover_order_flow: "N",
    //     fresh_order_type: "N",
    //     cover_limit_rate: "0",
    //     cover_sltp_price: "0",
    //     fresh_limit_rate: "0",
    //     open_quantity: "0"
    //   },
    //   {
    //     strike_price: "50000",
    //     quantity: "15",
    //     right: "put",
    //     product: "options",
    //     action: "buy",
    //     price: "700",
    //     expiry_date: "28-Aug-2024",
    //     stock_code: "CNXBAN",
    //     cover_order_flow: "N",
    //     fresh_order_type: "N",
    //     cover_limit_rate: "0",
    //     cover_sltp_price: "0",
    //     fresh_limit_rate: "0",
    //     open_quantity: "0"
    //   }
    // ];

    // const marginCalculatorResult = await breeze.marginCalculator({
    //   payloadList: positions,
    //   exchangeCode: "NFO"
    // });
    // console.log('Margin Calculator Result:', JSON.stringify(marginCalculatorResult, null, 2));

    // console.log('Getting names...');
    // const getNamesResult = await breeze.getNames({
    //   exchange: "nse",
    //   stockCode: "RELIANCE"
    // });
    // console.log('Get Names Result:', JSON.stringify(getNamesResult, null, 2));

     // Test parseOhlcData
    //  console.log('Testing parseOhlcData...');
    //  const ohlcData = 'NSE,RELIANCE,2000,2010,1990,2005,1000000,2023-06-08 15:30:00,1MIN';
    //  const parsedOhlcData = breeze.parseOhlcData(ohlcData);
    //  console.log('Parsed OHLC data:', parsedOhlcData);
 
     // Test parseMarketDepth
    //  console.log('Testing parseMarketDepth...');
    //  const marketDepthData = [
    //    [2000, 100, 5, 1, 2001, 150, 3, 1],
    //    [1999, 200, 3, 1, 2002, 100, 2, 1]
    //  ];
    //  const parsedMarketDepth = breeze.parseMarketDepth(marketDepthData, '4');
    //  console.log('Parsed Market Depth:', parsedMarketDepth);
 
     // Test parseStrategyData
    //  console.log('Testing parseStrategyData...');
    //  const strategyData = ['2023-06-08', '2023-06-08', 'PORT1', 'BUY', 'Strategy 1', 'NSE', 'CASH', 'RELIANCE', '2023-06-30', 'CALL', '2000', 'BUY', '1990', '2010', '100', '2005', '2000', '2010', '50', '2020', '100', '10', '1980', '20', '1000000', '1', 'ACTIVE'];
    //  const parsedStrategyData = breeze.parseStrategyData(strategyData);
    //  console.log('Parsed Strategy Data:', parsedStrategyData);
 
     // Test parseData
    //  console.log('Testing parseData...');
    //  const data = ['4.1!RELIANCE', '2000', '2005', '2010', '1990', '5', '2000', '100', '2010', '150', '50', '2002.5', 'Quotes Data'];
    //  const parsedData = breeze.parseData(data);
    //  console.log('Parsed Data:', parsedData);
 
     // Test getStockScriptList
    //  console.log('Testing getStockScriptList...');
    //  await breeze.getStockScriptList();
    //  console.log('Stock script list fetched successfully');

    

    
  } catch (error) {
    console.error('Error:', error);
    
  }
}

testBreezeConnect();