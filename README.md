# Project Title

Unofficial BreezeConnect TypeScript SDK

# BreezeConnect TypeScript

BreezeConnect TypeScript is a TypeScript implementation of the BreezeConnect API, allowing users to interact with the ICICI Direct trading platform programmatically.


## Authors

- [MANISH LAMBA]((https://github.com/lamba-manish/)


## Installation
```bash
npm install breezeconnect-ts
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/lamba-manish/Breeze-TS-SDK/
```

Go to the project directory

```bash
  cd Breeze-TS-SDK
```

Install dependencies

```bash
  npm install
```

Start the test script

```bash
  npm run test:breeze
```



# Usage


```javascript
import { BreezeConnect } from 'breezeconnect-ts';

const breeze = new BreezeConnect(apiKey);

async function main() {
  await breeze.generateSession(apiSecret, apiSession);
  
  // Use other methods...
  const customerDetails = await breeze.getCustomerDetails();
  console.log(customerDetails);
}

main().catch(console.error);
```


# Available Methods
```
generateSession(apiSecret: string, apiSession: string): Promise<void>
getCustomerDetails(): Promise<CustomerDetailsResponse>
getDematHoldings(): Promise<DematHoldingsResponse>
getFunds(): Promise<FundsResponse>
setFunds(params: SetFundsRequest): Promise<SetFundsResponse>
getHistoricalData(params: HistoricalDataRequest): Promise<HistoricalDataResponse>
getHistoricalDatav2(params: HistoricalDataV2Request): Promise<HistoricalDataV2Response>
addMargin(params: AddMarginRequest): Promise<AddMarginResponse>
getMargin(exchangeCode: string): Promise<MarginResponse>
placeOrder(params: PlaceOrderRequest): Promise<PlaceOrderResponse>
getOrderDetail(params: GetOrderDetailRequest): Promise<GetOrderDetailResponse>
getOrderList(params: GetOrderListRequest): Promise<GetOrderListResponse>
cancelOrder(params: CancelOrderRequest): Promise<CancelOrderResponse>
modifyOrder(params: ModifyOrderRequest): Promise<ModifyOrderResponse>
getPortfolioHoldings(params: GetPortfolioHoldingsRequest): Promise<GetPortfolioHoldingsResponse>
getPortfolioPositions(): Promise<GetPortfolioPositionsResponse>
getQuotes(params: GetQuotesRequest): Promise<GetQuotesResponse>
getOptionChainQuotes(params: GetOptionChainQuotesRequest): Promise<GetOptionChainQuotesResponse>
squareOff(params: SquareOffRequest): Promise<SquareOffResponse>
getTradeList(params: GetTradeListRequest): Promise<GetTradeListResponse>
getTradeDetail(params: GetTradeDetailRequest): Promise<GetTradeDetailResponse>
getNames(params: GetNamesRequest): Promise<GetNamesResponse>
parseOhlcData(data: string): ParsedOhlcData
parseMarketDepth(data: any[][], exchange: string): MarketDepthEntry[]
parseStrategyData(data: string[]): StrategyData | IClickData | undefined
parseData(data: any[]): ParsedData
getStockScriptList(): Promise<void>
subscribeFeeds(params: SubscribeFeedsParams): Promise<SocketConnectionResponse>
unsubscribeFeeds(params: UnsubscribeFeedsParams): Promise<SocketConnectionResponse>
```


# Methods Usage:

### Always generate session before using any method:
```javascript
const breeze = new BreezeConnect(apiKey);
await breeze.generateSession(apiSecret, apiSession);
```

```javascript
1. // Create an instance of BreezeConnect
    const breeze = new BreezeConnect(apiKey);

    // Generate session
    console.log('Generating session...');
    await breeze.generateSession(apiSecret, apiSession);
    console.log('Session generated successfully');

2.  const customerDetails = await breeze.getCustomerDetails();
    console.log('Customer Details:');
    console.log(JSON.stringify(customerDetails, null, 2));


3.  console.log('Fetching demat holdings...');
    const dematHoldings = await breeze.getDematHoldings();
    console.log('Demat Holdings:');
    console.log(JSON.stringify(dematHoldings, null, 2));

    #Response

    Fetching demat holdings...
    Demat Holdings:
    {
    "Success": null,
    "Status": 500,
    "Error": "Currently, We are not able to process your request. 
    Please try  after some time"
    }

4.  console.log('Fetching funds...');
    const funds = await breeze.getFunds();
    console.log('Funds:', JSON.stringify(funds, null, 2));

    #Response

    Fetching funds...
    Funds: {
    "Success": {
    "bank_account": "12345678",
    "total_bank_balance": 342,
    "allocated_equity": 0,
    "allocated_fno": 342,
    "allocated_commodity": 0,
    "allocated_currency": 0,
    "block_by_trade_equity": 0,
    "block_by_trade_fno": 0,
    "block_by_trade_commodity": 0,
    "block_by_trade_currency": 0,
    "block_by_trade_balance": 0,
    "unallocated_balance": "0"
    },
    "Status": 200,
    "Error": null
    }

5.  console.log('Setting funds...');
    const setFundsResult = await breeze.setFunds({
      transactionType: "credit",
      amount: "100",
      segment: "fno"
    });
    console.log('Set Funds Result:', JSON.stringify(setFundsResult, null, 2));

    #Response

    Setting funds...
    Set Funds Result: {
    "Success": null,
    "Status": 500,
    "Error": "Wallet Amount is not sufficient to allocate "

6.  console.log('Fetching historical data...');
    const historicalData = await breeze.getHistoricalData({
      interval: '1day',
      fromDate: '2024-06-01T09:15:00.000Z',
      toDate: '2024-06-04T15:30:00.000Z',
      stockCode: 'NIFTY',
      exchangeCode: 'NFO',
      productType: 'options',
      strikePrice: '24000',
      expiryDate: '25-Jul-2024',
      right:'call',
    });
    console.log('Historical Data:', JSON.stringify(historicalData, null, 2));

    #Response

    Fetching historical data...
    Historical Data: {
    "Success": [
    {
      "datetime": "2024-06-03 15:29:57",
      "stock_code": "NIFTY",
      "exchange_code": "NFO",
      "product_type": "Options",
      "expiry_date": "25-JUL-24",
      "right": "Call",
      "strike_price": "24000",
      "open": "323.55",
      "high": "439",
      "low": "256.85",
      "close": "237.6",
      "volume": "656850",
      "open_interest": null,
      "count": 0
    },
    {
      "datetime": "2024-06-04 15:29:54",
      "stock_code": "NIFTY",
      "exchange_code": "NFO",
      "product_type": "Options",
      "expiry_date": "25-JUL-24",
      "right": "Call",
      "strike_price": "24000",
      "open": "300",
      "high": "450",
      "low": "80",
      "close": "390.55",
      "volume": "1236025",
      "open_interest": null,
      "count": 1
    }
    ],
    "Status": 200,
    "Error": null
    }

7.   console.log('Fetching historical data v2...');
      const historicalDataV2 = await breeze.getHistoricalDatav2({
      interval: '1day',
      fromDate: '2024-06-01T09:15:00.000Z',
      toDate: '2024-06-05T15:30:00.000Z',
      stockCode: 'ITC',
      exchangeCode: 'bse'
      });
      console.log('Historical Data V2:', JSON.stringify(historicalDataV2, null, 2));

8.  console.log('Fetching historical data v2...');
    const historicalDataV2 = await breeze.getHistoricalDatav2({
      interval: '1day',
      fromDate: '2024-06-01T09:15:00.000Z',
      toDate: '2024-06-05T15:30:00.000Z',
      stockCode: 'ITC',
      exchangeCode: 'bse'
    });
    console.log('Historical Data V2:', JSON.stringify(historicalDataV2, null, 2));

    #Response

    Fetching historical data v2...
    Historical Data V2: {
    "Error": null,
    "Status": 200,
    "Success": [
    {
      "close": 430.55,
      "datetime": "2024-06-03 00:00:00",
      "exchange_code": "BSE",
      "high": 435.55,
      "low": 428.7,
      "open": 435.55,
      "stock_code": "ITC",
      "volume": 378195
    },
    {
      "close": 419,
      "datetime": "2024-06-04 00:00:00",
      "exchange_code": "BSE",
      "high": 424.45,
      "low": 403.05,
      "open": 423.5,
      "stock_code": "ITC",
      "volume": 2571371
    },
    {
      "close": 430.4,
      "datetime": "2024-06-05 00:00:00",
      "exchange_code": "BSE",
      "high": 435.9,
      "low": 418.1,
      "open": 423.5,
      "stock_code": "ITC",
      "volume": 1628705
    }
    ]
   }

9.  console.log('Adding margin...');
    const addMarginResult = await breeze.addMargin({
      productType: "margin",
      stockCode: "CNXBAN",
      exchangeCode: "NFO",
      settlementId: "123123",
      addAmount: "100",
      marginAmount: "3817.10",
      openQuantity: "10",
      coverQuantity: "0"
    });
    console.log('Add Margin Result:', JSON.stringify(addMarginResult, null, 2));

10. console.log('Getting margin...');
    const marginResult = await breeze.getMargin('nse');
    console.log('Margin Result:', JSON.stringify(marginResult, null, 2));

    #Response

    Getting margin...
    Margin Result: {
    "Success": {
    "limit_list": [],
    "cash_limit": 0,
    "amount_allocated": 0,
    "block_by_trade": 0,
    "isec_margin": 0
    },
    "Status": 200,
    "Error": null
    }

11.   console.log('Placing order...');
      const placeOrderResult = await breeze.placeOrder({
      stockCode: "CNXBAN",
      exchangeCode: "NFO",
      product: "options",
      action: "buy",
      orderType: "limit",
      quantity: "15",
      price: "1.2",
      validity: "day",
      strikePrice: '49000',
      expiryDate: '21-Aug-2024',
      right: 'call'
      });
      console.log('Place Order Result:', JSON.stringify(placeOrderResult, null, 2));

      #Response

      Placing order...
      Place Order Result: {
      "Success": {
      "order_id": "4567",
      "message": "Successfully Placed the order",
      "user_remark": ""
      },
      "Status": 200,
      "Error": null
      }

12.   console.log('Getting order details...');
      const orderDetail = await breeze.getOrderDetail({
          exchangeCode: "NFO",
          orderId: "1234"
        });
        console.log('Order Detail:', JSON.stringify(orderDetail, null, 2));
      }

      #Response

      Getting order details...
      Order Detail: {
      "Success": [
      {
      "order_id": "1234",
      "exchange_order_id": "12",
      "exchange_code": "NFO",
      "stock_code": "CNXBAN",
      "product_type": "Options",
      "action": "Buy",
      "order_type": "Limit",
      "stoploss": "0",
      "quantity": "15",
      "price": "1.2",
      "validity": "Day",
      "disclosed_quantity": "0",
      "expiry_date": "21-Aug-2024",
      "right": "Call",
      "strike_price": 49000,
      "average_price": "0",
      "cancelled_quantity": "0",
      "pending_quantity": "15",
      "status": "Ordered",
      "user_remark": "",
      "order_datetime": "16-Aug-2024 13:07:26",
      "parent_order_id": "",
      "modification_number": null,
      "exchange_acknowledgement_date": null,
      "SLTP_price": null,
      "exchange_acknowledge_number": null,
      "initial_limit": null,
      "intial_sltp": null,
      "LTP": null,
      "limit_offset": null,
      "mbc_flag": null,
      "cutoff_price": null,
      "validity_date": null
      }
      ],
    "Status": 200,
    "Error": null
    }

13.   console.log('Getting order list...');
      const orderList = await breeze.getOrderList({
      exchangeCode: "NFO",
      fromDate: "2024-08-16T00:00:00.000Z",
      toDate: "2024-08-16T23:59:59.999Z"
      });
      console.log('Order List:', JSON.stringify(orderList, null, 2));

      #Response

      Getting order list...
    Order List: {
    "Success": [
    {
      "order_id": "1234",
      "exchange_order_id": "1234",
      "exchange_code": "NFO",
      "stock_code": "CNXBAN",
      "product_type": "Options",
      "action": "Buy",
      "order_type": "Limit",
      "stoploss": "0",
      "quantity": "15",
      "price": "1.2",
      "validity": "Day",
      "disclosed_quantity": "0",
      "expiry_date": "21-Aug-2024",
      "right": "Call",
      "strike_price": 49000,
      "average_price": "0",
      "cancelled_quantity": "0",
      "pending_quantity": "15",
      "status": "Ordered",
      "user_remark": "",
      "order_datetime": "16-Aug-2024 13:07:26",
      "parent_order_id": "",
      "modification_number": null,
      "exchange_acknowledgement_date": null,
      "SLTP_price": null,
      "exchange_acknowledge_number": null,
      "initial_limit": null,
      "intial_sltp": null,
      "LTP": null,
      "limit_offset": null,
      "mbc_flag": null,
      "cutoff_price": null,
      "validity_date": null
    },
    {
      "order_id": "234",
      "exchange_order_id": "2345",
      "exchange_code": "NFO",
      "stock_code": "CNXBAN",
      "product_type": "Options",
      "action": "Buy",
      "order_type": "Limit",
      "stoploss": "0",
      "quantity": "15",
      "price": "1.2",
      "validity": "Day",
      "disclosed_quantity": "0",
      "expiry_date": "21-Aug-2024",
      "right": "Call",
      "strike_price": 49000,
      "average_price": "0",
      "cancelled_quantity": "15",
      "pending_quantity": "15",
      "status": "Cancelled",
      "user_remark": "",
      "order_datetime": "16-Aug-2024 11:54:32",
      "parent_order_id": "",
      "modification_number": null,
      "exchange_acknowledgement_date": null,
      "SLTP_price": null,
      "exchange_acknowledge_number": null,
      "initial_limit": null,
      "intial_sltp": null,
      "LTP": null,
      "limit_offset": null,
      "mbc_flag": null,
      "cutoff_price": null,
      "validity_date": null
      },
    ],
    "Status": 200,
    "Error": null
    }

14.   console.log('Cancelling the order...');
      const cancelOrderResult = await breeze.cancelOrder({
        exchangeCode: "NFO",
        orderId: "1111"
      });
      console.log('Cancel Order Result:', JSON.stringify(cancelOrderResult, null, 2));

      #Response

      Cancelling the order...
      Cancel Order Result: {
      "Success": {
      "order_id": "202408161300040188",
      "message": "Your Order Canceled Successfully"
      },
      "Status": 200,
      "Error": null
      }

15.   console.log('Modifying the order...');
        const modifyOrderResult = await breeze.modifyOrder({
          orderId: "202408161300040870",
          exchangeCode: "NFO",
          orderType: "limit",
          quantity: "30",
          price: "70",
          validity: "day",
        });
        console.log('Modify Order Result:', JSON.stringify(modifyOrderResult, null, 2));

      #Response

      Modifying the order...
      Modify Order Result: {
      "Success": {
      "message": "Successfully Modified the order",
      "order_id": "202408161300040870"
      },
      "Status": 200,
      "Error": null
      }

16.     console.log('Getting portfolio holdings...');
        const portfolioHoldings = await breeze.getPortfolioHoldings({
        exchangeCode: "BFO",
        fromDate: "2024-08-16T00:00:00.000Z",
        toDate: "2024-08-16T23:59:59.999Z"
        });
        console.log('Portfolio Holdings:', JSON.stringify(portfolioHoldings, null, 2));

      #Response

      Getting portfolio holdings...
      Portfolio Holdings: {
      "Success": [
      {
      "stock_code": "BSESEN",
      "exchange_code": "BFO",
      "quantity": "0",
      "average_price": "0",
      "booked_profit_loss": null,
      "current_market_price": "23280",
      "change_percentage": null,
      "answer_flag": null,
      "product_type": "Options",
      "expiry_date": "16-Aug-2024",
      "strike_price": "80000",
      "right": "Call",
      "category_index_per_stock": "I",
      "action": "NA",
      "realized_profit": "17224.5",
      "unrealized_profit": "0",
      "open_position_value": "0",
      "portfolio_charges": "0"
    },
    {
      "stock_code": "BSESEN",
      "exchange_code": "BFO",
      "quantity": "0",
      "average_price": "0",
      "booked_profit_loss": null,
      "current_market_price": "16495",
      "change_percentage": null,
      "answer_flag": null,
      "product_type": "Options",
      "expiry_date": "16-Aug-2024",
      "strike_price": "80100",
      "right": "Call",
      "category_index_per_stock": "I",
      "action": "NA",
      "realized_profit": "-13435.5",
      "unrealized_profit": "0",
      "open_position_value": "0",
      "portfolio_charges": "0"
    },
    {
      "stock_code": "BSESEN",
      "exchange_code": "BFO",
      "quantity": "-40",
      "average_price": "31.85",
      "booked_profit_loss": null,
      "current_market_price": "2915",
      "change_percentage": null,
      "answer_flag": null,
      "product_type": "Options",
      "expiry_date": "16-Aug-2024",
      "strike_price": "80500",
      "right": "Call",
      "category_index_per_stock": "I",
      "action": "Sell",
      "realized_profit": "2241.5",
      "unrealized_profit": "-1166",
      "open_position_value": "-1274",
      "portfolio_charges": "0"
        }
      ],
      "Status": 200,
      "Error": null
      }

17. console.log('Getting portfolio positions...');
    const portfolioPositions = await breeze.getPortfolioPositions();
    console.log('Portfolio Positions:', JSON.stringify(portfolioPositions, null, 2));

    #Response

    Getting portfolio positions...
    Portfolio Positions: {
    "Success": [
    {
      "segment": "fno",
      "product_type": "Options",
      "exchange_code": "BFO",
      "stock_code": "BSESEN",
      "expiry_date": "16-Aug-2024",
      "strike_price": "80500",
      "right": "Call",
      "action": "Sell",
      "quantity": "40",
      "average_price": "31.85",
      "settlement_id": null,
      "margin_amount": null,
      "ltp": "27.8",
      "price": "0.01",
      "stock_index_indicator": "Index",
      "cover_quantity": "0",
      "stoploss_trigger": "254.5",
      "stoploss": null,
      "take_profit": null,
      "available_margin": null,
      "squareoff_mode": null,
      "mtf_sell_quantity": null,
      "mtf_net_amount_payable": null,
      "mtf_expiry_date": null,
      "order_id": "",
      "cover_order_flow": null,
      "cover_order_executed_quantity": null,
      "pledge_status": null,
      "pnl": null,
      "underlying": "BSESEN",
      "order_segment_code": null
      }
    ],
      "Status": 200,
      "Error": null
      }

18. console.log('Getting quotes...');
    const quotes = await breeze.getQuotes({
      stockCode: "CNXBAN",
      exchangeCode: "NFO",
      productType: "futures",
      right: 'others',
      expiryDate: "2024-08-28T06:00:00.000Z"
    });
    console.log('Quotes:', JSON.stringify(quotes, null, 2));

    #Response 

    Getting quotes...
    Quotes: {
    "Success": [
    {
      "exchange_code": "NFO",
      "product_type": "Future",
      "stock_code": "CNXBAN",
      "expiry_date": "28-Aug-2024",
      "right": "*",
      "strike_price": 0,
      "ltp": 50525.75,
      "ltt": "16-Aug-2024 13:19:03",
      "best_bid_price": 50524.9,
      "best_bid_quantity": "30",
      "best_offer_price": 50531.4,
      "best_offer_quantity": "75",
      "open": 50250.25,
      "high": 50977,
      "low": 49960.05,
      "previous_close": 49955.3,
      "ltp_percent_change": 1.14,
      "upper_circuit": 54950.85,
      "lower_circuit": 44959.8,
      "total_quantity_traded": "2108370",
      "spot_price": "50410.5"
    }
    ],
    "Status": 200,
    "Error": null
    }

19. console.log('Getting option chain quotes...');
    const optionChainQuotes = await breeze.getOptionChainQuotes({
      stockCode: "CNXBAN",
      exchangeCode: "NFO",
      productType: "options",
      expiryDate: "2024-08-21T06:00:00.000Z",
      right: "put",
      strikePrice: "50000"
    });
    console.log('Option Chain Quotes:', JSON.stringify(optionChainQuotes, null, 2));

    #Response

    Getting option chain quotes...
    Option Chain Quotes: {
    "Success": [
    {
      "exchange_code": "NFO",
      "product_type": "Options",
      "stock_code": "CNXBAN",
      "expiry_date": "21-Aug-2024",
      "right": "Put",
      "strike_price": 50000,
      "ltp": 174.5,
      "ltt": "16-Aug-2024 13:20:11",
      "best_bid_price": 174.65,
      "best_bid_quantity": "300",
      "best_offer_price": 175,
      "best_offer_quantity": "840",
      "open": 296.5,
      "high": 444.05,
      "low": 164,
      "previous_close": 476.5,
      "ltp_percent_change": -63.38,
      "upper_circuit": 1406.55,
      "lower_circuit": 0.05,
      "total_quantity_traded": "40912995",
      "spot_price": "50406.55",
      "ltq": "15",
      "open_interest": 2489070,
      "chnge_oi": 1618605,
      "total_buy_qty": "181305",
      "total_sell_qty": "469410"
    }
    ],
    "Status": 200,
    "Error": null
    }

20. console.log('Squaring off a position...');
    const squareOffResult = await breeze.squareOff({
      stockCode: "CNXBAN",
      exchangeCode: "NFO",
      productType: "options",
      quantity: "15",
      price: "2",
      action: "sell",
      orderType: "limit",
      validity: "day",
      strikePrice: '49000',
      expiryDate: '07-Aug-2024',
      right: 'put',
    });
    console.log('Square Off Result:', JSON.stringify(squareOffResult, null, 2));

    #Response

    Squaring off a position...
    Square Off Result: {
    "Success": null,
    "Status": 500,
    "Error": "Resource not available"
    }

21. console.log('Getting trade list...');
    const tradeList = await breeze.getTradeList({
      exchangeCode: "BFO",
      fromDate: "2024-08-16T00:00:00.000Z",
      toDate: "2024-08-17T23:59:59.999Z"
    });
    console.log('Trade List:', JSON.stringify(tradeList, null, 2));

    #Response

    Getting trade list...
    Trade List: {
    "Success": [
    {
      "book_type": "Trade-Book",
      "trade_date": "16-Aug-2024",
      "stock_code": "BSESEN",
      "action": "Sell",
      "quantity": "20",
      "average_cost": "26.55",
      "brokerage_amount": "0",
      "product_type": "Options",
      "exchange_code": "BFO",
      "order_id": "2345",
      "segment": null,
      "settlement_code": null,
      "dp_id": null,
      "client_id": null,
      "ltp": "21.15",
      "eatm_withheld_amount": null,
      "cash_withheld_amount": null,
      "total_taxes": "0",
      "order_type": null,
      "expiry_date": "16-Aug-2024",
      "right": "Call",
      "strike_price": "80500"
    },
    {
      "book_type": "Trade-Book",
      "trade_date": "16-Aug-2024",
      "stock_code": "BSESEN",
      "action": "Sell",
      "quantity": "20",
      "average_cost": "37.15",
      "brokerage_amount": "0",
      "product_type": "Options",
      "exchange_code": "BFO",
      "order_id": "202408161234A300013247",
      "segment": null,
      "settlement_code": null,
      "dp_id": null,
      "client_id": null,
      "ltp": "21.15",
      "eatm_withheld_amount": null,
      "cash_withheld_amount": null,
      "total_taxes": "0",
      "order_type": null,
      "expiry_date": "16-Aug-2024",
      "right": "Call",
      "strike_price": "80500"
    },
    ],
    "Status": 200,
    "Error": null
    }

22. console.log('Getting trade detail...');
    const tradeDetail = await breeze.getTradeDetail({
          exchangeCode: 'NFO',
          orderId: '202408071300030694'
        });
        console.log('Trade Detail:', JSON.stringify(tradeDetail, null, 2));

    #Response
    Trade Detail: {
    "Success": [
    {
      "settlement_id": null,
      "exchange_trade_id": "1122",
      "executed_quantity": "15",
      "action": "B",
      "total_transaction_cost": "1",
      "brokerage_amount": "0",
      "taxes": null,
      "eatm_withheld_amount": null,
      "cash_withheld_amount": null,
      "execution_price": "1.15",
      "stock_code": "CNXBAN",
      "exchange_code": "NFO",
      "trade_id": "2211",
      "exchange_trade_time": "17-Aug-2024 13:51:08"
    }
  ],
    "Status": 200,
    "Error": null
    }

23. console.log('Previewing order...');
    const previewOrderResult = await breeze.previewOrder({
      stockCode: "NIFTY",
      exchangeCode: "NFO",
      productType: "options",
      orderType: "market",
      price: "0",
      action: "buy",
      quantity: "25",
      expiryDate: '22-Aug-2024',
      right: 'call',
      strikePrice: '24500',
      specialFlag:'N',
      stoploss: '',
      orderRateFresh: ''
    });
    console.log('Preview Order Result:', JSON.stringify(previewOrderResult, null, 2));

    #Response

    Previewing order...
    Preview Order Result: {
    "Success": {
    "brokerage": 7,
    "exchange_turnover_charges": 1.5,
    "stamp_duty": 0.09,
    "stt": 0,
    "sebi_charges": 0,
    "gst": 1.53,
    "total_turnover_and_sebi_charges": 1.5,
    "total_other_charges": 3.12,
    "total_brokerage": 10.12
  },
    "Status": 200,
    "Error": null
    }

24. console.log('Calculating limit...');
    const limitCalculatorResult = await breeze.limitCalculator({
      strikePrice: "49900",
      productType: "optionplus",
      expiryDate: "28-Aug-2024",
      underlying: "CNXBAN",
      exchangeCode: "NFO",
      orderFlow: "sell",
      stopLossTrigger: "10",
      optionType: "put",
      sourceFlag: "P",
      limitRate: "",
      orderReference: "",
      availableQuantity: "",
      marketType: "limit",
      freshOrderLimit: "177.70"
    });
    console.log('Limit Calculator Result:', JSON.stringify(limitCalculatorResult, null, 2));

    #Response

    Calculating limit...
    Limit Calculator Result: {
    "Success": {
    "available_quantity": "0",
    "action_id": "0",
    "order_margin": "0",
    "limit_rate": "0.05"
    },
    "Status": 200,
    "Error": null
    }

25. console.log('Calculating margin...');

    const positions = [
      {
        strike_price: "0",
        quantity: "15",
        right: "others",
        product: "futures",
        action: "buy",
        price: "50000",
        expiry_date: "28-Aug-2024",
        stock_code: "CNXBAN",
        cover_order_flow: "N",
        fresh_order_type: "N",
        cover_limit_rate: "0",
        cover_sltp_price: "0",
        fresh_limit_rate: "0",
        open_quantity: "0"
      },
      {
        strike_price: "50000",
        quantity: "15",
        right: "put",
        product: "options",
        action: "buy",
        price: "700",
        expiry_date: "28-Aug-2024",
        stock_code: "CNXBAN",
        cover_order_flow: "N",
        fresh_order_type: "N",
        cover_limit_rate: "0",
        cover_sltp_price: "0",
        fresh_limit_rate: "0",
        open_quantity: "0"
      }
    ];

    const marginCalculatorResult = await breeze.marginCalculator({
      payloadList: positions,
      exchangeCode: "NFO"
    });
    console.log('Margin Calculator Result:', JSON.stringify(marginCalculatorResult, null, 2));

    #Response

    Calculating margin...
    Margin Calculator Result: {
    "Success": {
    "margin_calulation": [
      {
        "strike_price": "0",
        "quantity": "15",
        "right": "Others",
        "product": "Futures",
        "action": "Buy",
        "price": "50000",
        "expiry_date": "28-Aug-2024",
        "stock_code": "CNXBAN"
      },
      {
        "strike_price": "50000",
        "quantity": "15",
        "right": "Put",
        "product": "Options",
        "action": "Buy",
        "price": "700",
        "expiry_date": "28-Aug-2024",
        "stock_code": "CNXBAN"
      }
    ],
    "non_span_margin_required": "0",
    "order_value": "113263.1",
    "order_margin": "0",
    "trade_margin": null,
    "block_trade_margin": "0",
    "span_margin_required": "27826.14"
    },
    "Status": 200,
    "Error": null
    }

26. console.log('Getting names...');
    const getNamesResult = await breeze.getNames({
      exchange: "nse",
      stockCode: "RELIANCE"
    });
    console.log('Get Names Result:', JSON.stringify(getNamesResult, null, 2));

    #Response

    Getting names...
    Get Names Result: {
    "status": "SUCCESS",
    "isec_stock_code": "RELIND",
    "isec_token": "2885",
    "company_name": "\"RELIANCE INDUSTRIES\"",
    "isec_token_level1": "4.1!2885",
    "isec_token_level2": "4.2!2885",
    "exchange_stockCode": "RELIANCE",
    "exchange": "nse"
    }

```



