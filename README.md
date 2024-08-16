# BreezeConnect TypeScript

BreezeConnect TypeScript is a TypeScript implementation of the BreezeConnect API, allowing users to interact with the ICICI Direct trading platform programmatically.

## Installation

```bash
npm install breezeconnect-ts

Usage

import { BreezeConnect } from 'breezeconnect-ts';

const breeze = new BreezeConnect(apiKey);

async function main() {
  await breeze.generateSession(apiSecret, apiSession);
  
  // Use other methods...
  const customerDetails = await breeze.getCustomerDetails();
  console.log(customerDetails);
}

main().catch(console.error);


Available Methods

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

Contributing
Contributions are welcome. Please submit a pull request or create an issue for any features or bug fixes.

License
This project is licensed under the MIT License.



