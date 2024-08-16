// src/BreezeConnect.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { Constants, APIRequestType, ScriptMasterFile } from './config/constants';
import crypto from 'crypto';
import { APIEndpoints } from './config/endpoints';
import { BreezeError } from './utils/errors';
import { ResponseMessages } from './config/messages';
// import { ScriptMasterFile } from './config/scriptMasterFile';
import { INTERVAL_TYPES, ACTION_TYPES, ORDER_TYPES, VALIDITY_TYPES, PRODUCT_TYPES, RIGHT_TYPES, FNO_EXCHANGE_TYPES, INTERVAL_TYPES_HIST_V2, EXCHANGE_CODES_HIST_V2, PRODUCT_TYPES_HIST } from './config/types';
import {GetNamesRequest, GetNamesResponse, GetNamesErrorResponse, MarginCalculatorRequest, MarginCalculatorResponse, LimitCalculatorRequest, LimitCalculatorResponse, PreviewOrderRequest, PreviewOrderResponse, GetTradeDetailRequest, GetTradeDetailResponse, GetTradeListRequest, GetTradeListResponse, SquareOffRequest, SquareOffResponse, GetOptionChainQuotesRequest, GetOptionChainQuotesResponse, GetQuotesRequest, GetQuotesResponse, GetPortfolioPositionsResponse, GetPortfolioHoldingsRequest, GetPortfolioHoldingsResponse, ModifyOrderRequest, ModifyOrderResponse, CancelOrderRequest, CancelOrderResponse, GetOrderListRequest, GetOrderListResponse, GetOrderDetailRequest, GetOrderDetailResponse, PlaceOrderRequest, PlaceOrderResponse, MarginLimit, MarginResponse,AddMarginRequest, AddMarginResponse, HistoricalDataRequest, HistoricalDataPointV2, HistoricalDataV2Request, HistoricalDataV2Response, HistoricalDataPoint, HistoricalDataResponse, SetFundsRequest, SetFundsResponse, CustomerDetailsResponse, CustomerDetailsParams, DematHoldingsResponse, FundsResponse } from './interfaces/api';


export class BreezeConnect {
    private apiKey: string;
    private apiSecret: string | null = null;
    private apiSession: string | null = null;
    private userId: string | null = null;
    private generatedSessionToken: string | null = null;
    private axiosInstance: AxiosInstance;
  
    constructor(apiKey: string) {
      this.apiKey = apiKey;
      this.axiosInstance = axios.create({
        baseURL: Constants.API_URL,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  
    private checkSession() {
      if (!this.generatedSessionToken) {
        throw new BreezeError('Session not initialized. Please call generateSession first.');
      }
    }
  
    async generateSession(apiSecret: string, apiSession: string): Promise<void> {
      try {
        this.apiSecret = apiSecret;
        this.apiSession = apiSession;
  
        const response = await this.axiosInstance.get(APIEndpoints.CUSTOMER_DETAILS, {
          data: JSON.stringify({
            SessionToken: this.apiSession,
            AppKey: this.apiKey,
          }),
        });

        if (response.data.Status !== 200) {
          throw new BreezeError(response.data.Error || 'Authentication failed');
        }

        if (response.data.Success && response.data.Success.idirect_userid) {
            this.userId = response.data.Success.idirect_userid;
        }
        // console.log('response inside seesion is: ', response.data)
  
        this.generatedSessionToken = response.data.Success.session_token;
  
        // Update axios instance with authenticated headers
        this.axiosInstance.defaults.headers['X-SessionToken'] = this.generatedSessionToken;
        this.axiosInstance.defaults.headers['X-AppKey'] = this.apiKey;
  
      } catch (error) {
        throw new BreezeError('Failed to generate session', error);
      }
    }
  
    private generateHeaders(body: any): Record<string, string> {
      try {
        const currentDate = new Date().toISOString().split('.')[0] + '.000Z';
        const checksum = crypto
          .createHash('sha256')
          .update(currentDate + JSON.stringify(body) + this.apiSecret!)
          .digest('hex');
  
        return {
          'Content-Type': 'application/json',
          'X-Checksum': 'token ' + checksum,
          'X-Timestamp': currentDate,
          'X-AppKey': this.apiKey,
          'X-SessionToken': this.generatedSessionToken!
        };
      } catch (error) {
        throw new BreezeError('Failed to generate headers', error);
      }
    }
  
    private async makeRequest(
      method: APIRequestType,
      endpoint: string,
      body: any,
      headers: Record<string, string>
    ): Promise<any> {
      try {
        const config: AxiosRequestConfig = {
          method,
          url: endpoint,
          headers,
          data: body
        };
  
        const response = await this.axiosInstance(config);
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
              // Return the error response instead of throwing
              return axiosError.response;
            }
        }
      }
    }

  
    async getCustomerDetails(): Promise<CustomerDetailsResponse> {
      this.checkSession();
      try {
        const body = {};
        const headers = this.generateHeaders(body);
        const response = await this.makeRequest(
          APIRequestType.GET,
          APIEndpoints.CUSTOMER_DETAILS,
          body,
          headers
        );

        return response.data;
      } catch (error) {
        throw new BreezeError('Failed to get customer details', error);
      }
    }
  
    async getDematHoldings(): Promise<DematHoldingsResponse> {
      this.checkSession();
      try {
        const body = {};
        const headers = this.generateHeaders(body);
        const response = await this.makeRequest(
          APIRequestType.GET,
          APIEndpoints.DEMAT_HOLDING,
          body,
          headers
        );
        return response.data;
      } catch (error) {
        throw new BreezeError('Failed to get demat holdings', error);
      }
    }

    async getFunds(): Promise<FundsResponse> {
        this.checkSession();
        try {
          const body = {};
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.GET,
            APIEndpoints.FUNDS,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to get funds', error);
        }
      }

    async setFunds({ transactionType, amount, segment }: SetFundsRequest): Promise<SetFundsResponse> {
        this.checkSession();
        try {
          if (!transactionType || !amount || !segment) {
            if (!transactionType) {
              throw new BreezeError(ResponseMessages.BLANK_TRANSACTION_TYPE);
            } else if (!amount) {
              throw new BreezeError(ResponseMessages.BLANK_AMOUNT);
            } else if (!segment) {
              throw new BreezeError(ResponseMessages.BLANK_SEGMENT);
            }
          }
    
          if (transactionType.toLowerCase() !== "debit" && transactionType.toLowerCase() !== "credit") {
            throw new BreezeError(ResponseMessages.TRANSACTION_TYPE_ERROR);
          }
    
          const amountNum = parseFloat(amount);
          if (isNaN(amountNum) || amountNum <= 0) {
            throw new BreezeError(ResponseMessages.ZERO_AMOUNT_ERROR);
          }
    
          const body = {
            transaction_type: transactionType,
            amount,
            segment
          };
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.POST,
            APIEndpoints.FUNDS,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to set funds', error);
        }
      }

    async getHistoricalData({
        interval,
        fromDate,
        toDate,
        stockCode,
        exchangeCode,
        productType,
        expiryDate,
        right,
        strikePrice
      }: HistoricalDataRequest): Promise<HistoricalDataResponse> {
        this.checkSession();
        try {
          if (!interval) {
            throw new BreezeError(ResponseMessages.BLANK_INTERVAL);
          }
          if (!INTERVAL_TYPES.includes(interval.toLowerCase())) {
            throw new BreezeError(ResponseMessages.INTERVAL_TYPE_ERROR);
          }
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (!['nse', 'nfo', 'bse'].includes(exchangeCode.toLowerCase())) {
            throw new BreezeError(ResponseMessages.EXCHANGE_CODE_ERROR);
          }
          if (!fromDate) {
            throw new BreezeError(ResponseMessages.BLANK_FROM_DATE);
          }
          if (!toDate) {
            throw new BreezeError(ResponseMessages.BLANK_TO_DATE);
          }
          if (!stockCode) {
            throw new BreezeError(ResponseMessages.BLANK_STOCK_CODE);
          }
          if (exchangeCode.toLowerCase() === 'nfo') {
            if (!productType) {
              throw new BreezeError(ResponseMessages.BLANK_PRODUCT_TYPE_NFO);
            }
            if (!PRODUCT_TYPES_HIST.includes(productType.toLowerCase())) {
              throw new BreezeError(ResponseMessages.PRODUCT_TYPE_ERROR);
            }
            if (productType.toLowerCase() === 'options' && !strikePrice) {
              throw new BreezeError(ResponseMessages.BLANK_STRIKE_PRICE);
            }
            if (!expiryDate) {
              throw new BreezeError(ResponseMessages.BLANK_EXPIRY_DATE);
            }
          }
    
          if (interval === '1minute') {
            interval = 'minute';
          } else if (interval === '1day') {
            interval = 'day';
          }
    
          const body: any = {
            interval,
            from_date: fromDate,
            to_date: toDate,
            stock_code: stockCode,
            exchange_code: exchangeCode
          };
    
          if (productType) body.product_type = productType;
          if (expiryDate) body.expiry_date = expiryDate;
          if (strikePrice) body.strike_price = strikePrice;
          if (right) body.right = right;
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.GET,
            APIEndpoints.HISTORICAL_CHARTS,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to get historical data', error);
        }
      }

    async getHistoricalDatav2({
        interval,
        fromDate,
        toDate,
        stockCode,
        exchangeCode,
        productType,
        expiryDate,
        right,
        strikePrice
      }: HistoricalDataV2Request): Promise<HistoricalDataV2Response> {
        this.checkSession();
        try {
          if (!interval) {
            throw new BreezeError(ResponseMessages.BLANK_INTERVAL);
          }
          if (!INTERVAL_TYPES_HIST_V2.includes(interval.toLowerCase())) {
            throw new BreezeError(ResponseMessages.INTERVAL_TYPE_ERROR_HIST_V2);
          }
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (!EXCHANGE_CODES_HIST_V2.includes(exchangeCode.toLowerCase())) {
            throw new BreezeError(ResponseMessages.EXCHANGE_CODE_HIST_V2_ERROR);
          }
          if (!fromDate) {
            throw new BreezeError(ResponseMessages.BLANK_FROM_DATE);
          }
          if (!toDate) {
            throw new BreezeError(ResponseMessages.BLANK_TO_DATE);
          }
          if (!stockCode) {
            throw new BreezeError(ResponseMessages.BLANK_STOCK_CODE);
          }
        //   if (DERI_EXCH_CODES.includes(exchangeCode.toLowerCase())) {
            if (FNO_EXCHANGE_TYPES.includes(exchangeCode.toLowerCase())) {
            if (!productType) {
              throw new BreezeError(ResponseMessages.BLANK_PRODUCT_TYPE_HIST_V2);
            }
            if (!PRODUCT_TYPES_HIST.includes(productType.toLowerCase())) {
              throw new BreezeError(ResponseMessages.PRODUCT_TYPE_ERROR_HIST_V2);
            }
            if (productType.toLowerCase() === 'options' && !strikePrice) {
              throw new BreezeError(ResponseMessages.BLANK_STRIKE_PRICE);
            }
            if (!expiryDate) {
              throw new BreezeError(ResponseMessages.BLANK_EXPIRY_DATE);
            }
          }
    
          const urlParams: any = {
            interval,
            from_date: fromDate,
            to_date: toDate,
            stock_code: stockCode,
            exch_code: exchangeCode
          };
    
          if (productType) urlParams.product_type = productType;
          if (expiryDate) urlParams.expiry_date = expiryDate;
          if (strikePrice) urlParams.strike_price = strikePrice;
          if (right) urlParams.right = right;
    
          const headers = {
            "Content-Type": "application/json",
            'X-SessionToken': this.generatedSessionToken,
            'apikey': this.apiKey
          };
    
          const response = await axios.get(`${Constants.BREEZE_NEW_URL}${APIEndpoints.HISTORICAL_CHARTS}`, {
            params: urlParams,
            headers: headers
          });
    
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to get historical data v2', error);
        }
      }

    async addMargin({
        productType = "",
        stockCode = "",
        exchangeCode = "",
        settlementId = "",
        addAmount = "",
        marginAmount = "",
        openQuantity = "",
        coverQuantity = "",
        categoryIndexPerStock = "",
        expiryDate = "",
        right = "",
        contractTag = "",
        strikePrice = "",
        segmentCode = ""
      }: AddMarginRequest): Promise<AddMarginResponse> {
        this.checkSession();
        try {
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (productType && !PRODUCT_TYPES.includes(productType.toLowerCase())) {
            throw new BreezeError(ResponseMessages.PRODUCT_TYPE_ERROR);
          }
          if (right && !RIGHT_TYPES.includes(right.toLowerCase())) {
            throw new BreezeError(ResponseMessages.RIGHT_TYPE_ERROR);
          }
    
          const body: any = {
            exchange_code: exchangeCode
          };
    
          if (productType) body.product_type = productType;
          if (stockCode) body.stock_code = stockCode;
          if (coverQuantity) body.cover_quantity = coverQuantity;
          if (categoryIndexPerStock) body.category_index_per_stock = categoryIndexPerStock;
          if (contractTag) body.contract_tag = contractTag;
          if (marginAmount) body.margin_amount = marginAmount;
          if (expiryDate) body.expiry_date = expiryDate;
          if (right) body.right = right;
          if (strikePrice) body.strike_price = strikePrice;
          if (segmentCode) body.segment_code = segmentCode;
          if (settlementId) body.settlement_id = settlementId;
          if (addAmount) body.add_amount = addAmount;
          if (openQuantity) body.open_quantity = openQuantity;
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.POST,
            APIEndpoints.MARGIN,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to add margin', error);
        }
      }

    async getMargin(exchangeCode: string): Promise<MarginResponse> {
        this.checkSession();
        try {
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
    
          const body = {
            exchange_code: exchangeCode
          };
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.GET,
            APIEndpoints.MARGIN,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to get margin', error);
        }
      }

    async placeOrder({
        stockCode,
        exchangeCode,
        product,
        action,
        orderType,
        stoploss = "",
        quantity,
        price,
        validity,
        validityDate = "",
        disclosedQuantity = "",
        expiryDate = "",
        right = "",
        strikePrice = "",
        userRemark = "",
        orderTypeFresh = "",
        orderRateFresh = "",
        settlementId = "",
        orderSegmentCode = ""
      }: PlaceOrderRequest): Promise<PlaceOrderResponse> {
        this.checkSession();
        try {
          if (!stockCode) throw new BreezeError(ResponseMessages.BLANK_STOCK_CODE);
          if (!exchangeCode) throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          if (!product) throw new BreezeError(ResponseMessages.BLANK_PRODUCT_TYPE);
          if (!action) throw new BreezeError(ResponseMessages.BLANK_ACTION);
          if (!orderType) throw new BreezeError(ResponseMessages.BLANK_ORDER_TYPE);
          if (!quantity) throw new BreezeError(ResponseMessages.BLANK_QUANTITY);
          if (!validity) throw new BreezeError(ResponseMessages.BLANK_VALIDITY);
          if (!PRODUCT_TYPES.includes(product.toLowerCase())) throw new BreezeError(ResponseMessages.PRODUCT_TYPE_ERROR);
          if (!ACTION_TYPES.includes(action.toLowerCase())) throw new BreezeError(ResponseMessages.ACTION_TYPE_ERROR);
          if (!ORDER_TYPES.includes(orderType.toLowerCase())) throw new BreezeError(ResponseMessages.ORDER_TYPE_ERROR);
          if (!VALIDITY_TYPES.includes(validity.toLowerCase())) throw new BreezeError(ResponseMessages.VALIDITY_TYPE_ERROR);
          if (right && !RIGHT_TYPES.includes(right.toLowerCase())) throw new BreezeError(ResponseMessages.RIGHT_TYPE_ERROR);
    
          const body: any = {
            stock_code: stockCode,
            exchange_code: exchangeCode,
            product: product,
            action: action,
            order_type: orderType,
            quantity: quantity,
            price: price,
            validity: validity,
            order_segment_code: orderSegmentCode,
            settlement_id: settlementId
          };
    
          if (stoploss) body.stoploss = stoploss;
          if (validityDate) body.validity_date = validityDate;
          if (disclosedQuantity) body.disclosed_quantity = disclosedQuantity;
          if (expiryDate) body.expiry_date = expiryDate;
          if (right) body.right = right;
          if (strikePrice) body.strike_price = strikePrice;
          if (userRemark) body.user_remark = userRemark;
          if (orderRateFresh) body.order_rate_fresh = orderRateFresh;
          if (orderTypeFresh) body.order_type_fresh = orderTypeFresh;
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.POST,
            APIEndpoints.ORDER,
            body,
            headers
          );

          // Check if the response is an error
        //  if (response.status !== 200) {
        //     return {
        //     Success: {'order_id': 'occured', 'message': 'error'},
        //     Status: response.status,
        //     Error: response.data?.Error || 'An error occurred while placing the order'
        //     };
        // }

          return response.data;
        } catch (error) {
        //   throw new BreezeError('Failed to place order', error);
        throw new BreezeError('Failed to place order', error);
        }
      }

    async getOrderDetail({ exchangeCode, orderId }: GetOrderDetailRequest): Promise<GetOrderDetailResponse> {
        this.checkSession();
        try {
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (!orderId) {
            throw new BreezeError(ResponseMessages.BLANK_ORDER_ID);
          }
    
          const body = {
            exchange_code: exchangeCode,
            order_id: orderId
          };
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.GET,
            APIEndpoints.ORDER,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to get order detail', error);
        }
      }
    
    async getOrderList({ exchangeCode, fromDate, toDate }: GetOrderListRequest): Promise<GetOrderListResponse> {
        this.checkSession();
        try {
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (!fromDate) {
            throw new BreezeError(ResponseMessages.BLANK_FROM_DATE);
          }
          if (!toDate) {
            throw new BreezeError(ResponseMessages.BLANK_TO_DATE);
          }
    
          const body = {
            exchange_code: exchangeCode,
            from_date: fromDate,
            to_date: toDate
          };
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.GET,
            APIEndpoints.ORDER,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to get order list', error);
        }
      }

    async cancelOrder({ exchangeCode, orderId }: CancelOrderRequest): Promise<CancelOrderResponse> {
        this.checkSession();
        try {
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (!orderId) {
            throw new BreezeError(ResponseMessages.BLANK_ORDER_ID);
          }
    
          const body = {
            exchange_code: exchangeCode,
            order_id: orderId
          };
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.DELETE,
            APIEndpoints.ORDER,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to cancel order', error);
        }
      }

    async modifyOrder({
        orderId,
        exchangeCode,
        orderType,
        stoploss,
        quantity,
        price,
        validity,
        disclosedQuantity,
        validityDate
      }: ModifyOrderRequest): Promise<ModifyOrderResponse> {
        this.checkSession();
        try {
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (!orderId) {
            throw new BreezeError(ResponseMessages.BLANK_ORDER_ID);
          }
          if (orderType && !ORDER_TYPES.includes(orderType.toLowerCase())) {
            throw new BreezeError(ResponseMessages.ORDER_TYPE_ERROR);
          }
          if (validity && !VALIDITY_TYPES.includes(validity.toLowerCase())) {
            throw new BreezeError(ResponseMessages.VALIDITY_TYPE_ERROR);
          }
    
          const body: any = {
            order_id: orderId,
            exchange_code: exchangeCode,
          };
    
          if (orderType) body.order_type = orderType;
          if (stoploss) body.stoploss = stoploss;
          if (quantity) body.quantity = quantity;
          if (price) body.price = price;
          if (validity) body.validity = validity;
          if (disclosedQuantity) body.disclosed_quantity = disclosedQuantity;
          if (validityDate) body.validity_date = validityDate;
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.PUT,
            APIEndpoints.ORDER,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to modify order', error);
        }
      }

    async getPortfolioHoldings({
        exchangeCode,
        fromDate,
        toDate,
        stockCode,
        portfolioType
      }: GetPortfolioHoldingsRequest): Promise<GetPortfolioHoldingsResponse> {
        this.checkSession();
        try {
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
    
          const body: any = {
            exchange_code: exchangeCode,
          };
    
          if (fromDate) body.from_date = fromDate;
          if (toDate) body.to_date = toDate;
          if (stockCode) body.stock_code = stockCode;
          if (portfolioType) body.portfolio_type = portfolioType;
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.GET,
            APIEndpoints.PORTFOLIO_HOLDINGS,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to get portfolio holdings', error);
        }
      }

    async getPortfolioPositions(): Promise<GetPortfolioPositionsResponse> {
        this.checkSession();
        try {
          const body = {};
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.GET,
            APIEndpoints.PORTFOLIO_POSITIONS,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to get portfolio positions', error);
        }
      }

    async getQuotes({
        stockCode,
        exchangeCode,
        expiryDate,
        productType,
        right,
        strikePrice
      }: GetQuotesRequest): Promise<GetQuotesResponse> {
        this.checkSession();
        try {
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (!stockCode) {
            throw new BreezeError(ResponseMessages.BLANK_STOCK_CODE);
          }
          if (productType && !PRODUCT_TYPES.includes(productType.toLowerCase())) {
            throw new BreezeError(ResponseMessages.PRODUCT_TYPE_ERROR);
          }
          if (right && !RIGHT_TYPES.includes(right.toLowerCase())) {
            throw new BreezeError(ResponseMessages.RIGHT_TYPE_ERROR);
          }
    
          const body: any = {
            stock_code: stockCode,
            exchange_code: exchangeCode
          };
    
          if (expiryDate) body.expiry_date = expiryDate;
          if (productType) body.product_type = productType;
          if (right) body.right = right;
          if (strikePrice) body.strike_price = strikePrice;
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.GET,
            APIEndpoints.QUOTES,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to get quotes', error);
        }
      }

    async getOptionChainQuotes({
        stockCode,
        exchangeCode,
        expiryDate,
        productType,
        right,
        strikePrice
      }: GetOptionChainQuotesRequest): Promise<GetOptionChainQuotesResponse> {
        this.checkSession();
        try {
          if (exchangeCode.toLowerCase() !== "nfo") {
            throw new BreezeError(ResponseMessages.OPT_CHAIN_EXCH_CODE_ERROR);
          }
          if (!productType) {
            throw new BreezeError(ResponseMessages.BLANK_PRODUCT_TYPE_NFO);
          }
          if (productType.toLowerCase() !== "futures" && productType.toLowerCase() !== "options") {
            throw new BreezeError(ResponseMessages.PRODUCT_TYPE_ERROR_NFO);
          }
          if (!stockCode) {
            throw new BreezeError(ResponseMessages.BLANK_STOCK_CODE);
          }
          if (productType.toLowerCase() === "options") {
            if (!expiryDate && !strikePrice && !right) {
              throw new BreezeError(ResponseMessages.NFO_FIELDS_MISSING_ERROR);
            }
            if (expiryDate && !strikePrice && !right) {
              throw new BreezeError(ResponseMessages.BLANK_RIGHT_STRIKE_PRICE);
            }
            if (!expiryDate && strikePrice && !right) {
              throw new BreezeError(ResponseMessages.BLANK_RIGHT_EXPIRY_DATE);
            }
            if (!expiryDate && !strikePrice && right) {
              throw new BreezeError(ResponseMessages.BLANK_EXPIRY_DATE_STRIKE_PRICE);
            }
            if (right && !["call", "put", "options"].includes(right.toLowerCase())) {
              throw new BreezeError(ResponseMessages.RIGHT_TYPE_ERROR);
            }
          }
    
          const body: any = {
            stock_code: stockCode,
            exchange_code: exchangeCode,
            product_type: productType
          };
    
          if (expiryDate) body.expiry_date = expiryDate;
          if (right) body.right = right;
          if (strikePrice) body.strike_price = strikePrice;
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.GET,
            APIEndpoints.OPTION_CHAIN,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to get option chain quotes', error);
        }
      }

    async squareOff({
        sourceFlag = "",
        stockCode,
        exchangeCode,
        quantity = "",
        price = "",
        action = "",
        orderType = "",
        validity = "",
        stoploss = "",
        disclosedQuantity = "",
        protectionPercentage = "",
        settlementId = "",
        marginAmount = "",
        openQuantity = "",
        coverQuantity = "",
        productType = "",
        expiryDate = "",
        right = "",
        strikePrice = "",
        validityDate = "",
        tradePassword = "",
        aliasName = ""
      }: SquareOffRequest): Promise<SquareOffResponse> {
        this.checkSession();
        try {
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (!stockCode) {
            throw new BreezeError(ResponseMessages.BLANK_STOCK_CODE);
          }
          if (productType && !PRODUCT_TYPES.includes(productType.toLowerCase())) {
            throw new BreezeError(ResponseMessages.PRODUCT_TYPE_ERROR);
          }
          if (right && !RIGHT_TYPES.includes(right.toLowerCase())) {
            throw new BreezeError(ResponseMessages.RIGHT_TYPE_ERROR);
          }
          if (action && !ACTION_TYPES.includes(action.toLowerCase())) {
            throw new BreezeError(ResponseMessages.ACTION_TYPE_ERROR);
          }
          if (validity && !VALIDITY_TYPES.includes(validity.toLowerCase())) {
            throw new BreezeError(ResponseMessages.VALIDITY_TYPE_ERROR);
          }
          if (orderType && !ORDER_TYPES.includes(orderType.toLowerCase())) {
            throw new BreezeError(ResponseMessages.ORDER_TYPE_ERROR);
          }
    
          const body = {
            source_flag: sourceFlag,
            stock_code: stockCode,
            exchange_code: exchangeCode,
            quantity,
            price,
            action,
            order_type: orderType,
            validity,
            stoploss_price: stoploss,
            disclosed_quantity: disclosedQuantity,
            protection_percentage: protectionPercentage,
            settlement_id: settlementId,
            margin_amount: marginAmount,
            open_quantity: openQuantity,
            cover_quantity: coverQuantity,
            product_type: productType,
            expiry_date: expiryDate,
            right,
            strike_price: strikePrice,
            validity_date: validityDate,
            alias_name: aliasName,
            trade_password: tradePassword
          };
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.POST,
            APIEndpoints.SQUARE_OFF,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to square off', error);
        }
      }

    async getTradeList({
        fromDate = "",
        toDate = "",
        exchangeCode,
        productType = "",
        action = "",
        stockCode = ""
      }: GetTradeListRequest): Promise<GetTradeListResponse> {
        this.checkSession();
        try {
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (productType && !PRODUCT_TYPES.includes(productType.toLowerCase())) {
            throw new BreezeError(ResponseMessages.PRODUCT_TYPE_ERROR);
          }
          if (action && !ACTION_TYPES.includes(action.toLowerCase())) {
            throw new BreezeError(ResponseMessages.ACTION_TYPE_ERROR);
          }
    
          const body: any = {
            exchange_code: exchangeCode,
          };
    
          if (fromDate) body.from_date = fromDate;
          if (toDate) body.to_date = toDate;
          if (productType) body.product_type = productType;
          if (action) body.action = action;
          if (stockCode) body.stock_code = stockCode;
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.GET,
            APIEndpoints.TRADES,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to get trade list', error);
        }
      }

    async getTradeDetail({
        exchangeCode,
        orderId
      }: GetTradeDetailRequest): Promise<GetTradeDetailResponse> {
        this.checkSession();
        try {
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (!orderId) {
            throw new BreezeError(ResponseMessages.BLANK_ORDER_ID);
          }
    
          const body = {
            exchange_code: exchangeCode,
            order_id: orderId
          };
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.GET,
            APIEndpoints.TRADES,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to get trade detail', error);
        }
      }
      
    async previewOrder({
        stockCode,
        exchangeCode,
        productType,
        orderType,
        price,
        action,
        quantity,
        expiryDate = "",
        right = "",
        strikePrice = "",
        specialFlag = "",
        stoploss = "",
        orderRateFresh = ""
      }: PreviewOrderRequest): Promise<PreviewOrderResponse> {
        this.checkSession();
        try {
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (!stockCode) {
            throw new BreezeError(ResponseMessages.BLANK_STOCK_CODE);
          }
          if (!productType) {
            throw new BreezeError(ResponseMessages.BLANK_PRODUCT_TYPE_NFO);
          }
          if (right && !RIGHT_TYPES.includes(right.toLowerCase())) {
            throw new BreezeError(ResponseMessages.RIGHT_TYPE_ERROR);
          }
          if (!action) {
            throw new BreezeError(ResponseMessages.BLANK_ACTION);
          }
          if (!orderType) {
            throw new BreezeError(ResponseMessages.BLANK_ORDER_TYPE);
          }
    
          const body = {
            stock_code: stockCode,
            exchange_code: exchangeCode,
            product: productType,
            order_type: orderType,
            price: price,
            action: action,
            quantity: quantity,
            expiry_date: expiryDate,
            right: right,
            strike_price: strikePrice,
            specialflag: specialFlag,
            stoploss: stoploss,
            order_rate_fresh: orderRateFresh
          };
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.GET,
            APIEndpoints.PREVIEW_ORDER,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to preview order', error);
        }
      }

    async limitCalculator({
        strikePrice,
        productType,
        expiryDate,
        underlying,
        exchangeCode,
        orderFlow,
        stopLossTrigger,
        optionType,
        sourceFlag,
        limitRate,
        orderReference,
        availableQuantity,
        marketType,
        freshOrderLimit
      }: LimitCalculatorRequest): Promise<LimitCalculatorResponse> {
        this.checkSession();
        try {
          if (!strikePrice) {
            throw new BreezeError(ResponseMessages.BLANK_STRIKE_PRICE);
          }
          if (!productType) {
            throw new BreezeError(ResponseMessages.BLANK_PRODUCT_TYPE);
          }
          if (!sourceFlag) {
            throw new BreezeError(ResponseMessages.BLANK_SOURCE_FLAG);
          }
          if (!underlying) {
            throw new BreezeError(ResponseMessages.BLANK_UNDERLYING);
          }
          if (!exchangeCode) {
            throw new BreezeError(ResponseMessages.BLANK_EXCHANGE_CODE);
          }
          if (!orderFlow) {
            throw new BreezeError(ResponseMessages.BLANK_ORDER_FLOW);
          }
          if (!optionType) {
            throw new BreezeError(ResponseMessages.BLANK_OPTION_TYPE);
          }
          if (!stopLossTrigger) {
            throw new BreezeError(ResponseMessages.BLANK_STOP_LOSS_TRIGGER);
          }
    
          const body = {
            strike_price: strikePrice,
            product_type: productType,
            expiry_date: expiryDate,
            underlying: underlying,
            exchange_code: exchangeCode,
            order_flow: orderFlow,
            stop_loss_trigger: stopLossTrigger,
            option_type: optionType,
            source_flag: sourceFlag,
            limit_rate: limitRate,
            order_reference: orderReference,
            available_quantity: availableQuantity,
            market_type: marketType,
            fresh_order_limit: freshOrderLimit
          };
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.POST,
            APIEndpoints.LIMIT_CALCULATOR,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to calculate limit', error);
        }
      }

    async marginCalculator({
        payloadList,
        exchangeCode
      }: MarginCalculatorRequest): Promise<MarginCalculatorResponse> {
        this.checkSession();
        try {
          const body = {
            list_of_positions: payloadList,
            exchange_code: exchangeCode
          };
    
          const headers = this.generateHeaders(body);
          const response = await this.makeRequest(
            APIRequestType.POST,
            APIEndpoints.MARGIN_CALCULATOR,
            body,
            headers
          );
          return response.data;
        } catch (error) {
          throw new BreezeError('Failed to calculate margin', error);
        }
      }

    async getNames({ exchange, stockCode }: GetNamesRequest): Promise<GetNamesResponse | GetNamesErrorResponse> {
        try {
          exchange = exchange.toLowerCase();
          stockCode = stockCode.toUpperCase();
          let fetchResponse;
    
          switch (exchange) {
            case "nse":
              fetchResponse = await axios.get(ScriptMasterFile.NSE_URL);
              break;
            case "bse":
              fetchResponse = await axios.get(ScriptMasterFile.BSE_URL);
              break;
            case "cdnse":
              fetchResponse = await axios.get(ScriptMasterFile.CDNSE_URL);
              break;
            case "fonse":
              fetchResponse = await axios.get(ScriptMasterFile.FONSE_URL);
              break;
            default:
              fetchResponse = await axios.get(ScriptMasterFile.NSE_URL);
              break;
          }
    
          const arr = fetchResponse.data.split(/\r?\n/);
    
          for (let i = 1; i < arr.length; i++) {
            const elem = arr[i].split(",");
            
            elem[1] = elem[1].toString().match(/(?:"[^"]*"|^[^"]*$)/)?.[0]?.replace(/"/g, "") ?? "";
            elem[60] = elem[60].toString().match(/(?:"[^"]*"|^[^"]*$)/)?.[0]?.replace(/"/g, "") ?? "";
            elem[0] = elem[0].toString().match(/(?:"[^"]*"|^[^"]*$)/)?.[0]?.replace(/"/g, "") ?? "";
    
            if (elem[1] === stockCode || stockCode === elem[60]) {
              return {
                status: "SUCCESS",
                isec_stock_code: elem[1],
                isec_token: elem[0],
                company_name: elem[3],
                isec_token_level1: "4.1!" + elem[0],
                isec_token_level2: "4.2!" + elem[0],
                exchange_stockCode: elem[60],
                exchange: exchange
              };
            }
          }
    
          return { Status: "404", Response: "getNames(): Result Not Found" };
        } catch (error) {
          throw new BreezeError('Failed to get names', error);
        }
      }
    

    


}  