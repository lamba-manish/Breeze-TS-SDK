export enum ResponseMessages {
  CURRENCY_NOT_ALLOWED = "NDX as Exchange-Code not allowed",
  // Empty Details Error
    BLANK_EXCHANGE_CODE = "Exchange-Code cannot be empty",
    BLANK_STOCK_CODE = "Stock-Code cannot be empty",
    BLANK_PRODUCT_TYPE = "Product cannot be empty",
    BLANK_PRODUCT_TYPE_NFO = "Product-type cannot be empty for Exchange-Code 'nfo'",
    BLANK_PRODUCT_TYPE_HIST_V2 = "Product-type cannot be empty for Exchange-Code 'nfo','ndx' or 'mcx'",
    BLANK_ACTION = "Action cannot be empty",
    BLANK_ORDER_TYPE = "Order-type cannot be empty",
    BLANK_QUANTITY = "Quantity cannot be empty",
    BLANK_LOTS = "Lots cannot be empty",
    BLANK_VALIDITY = "Validity cannot be empty",
    BLANK_ORDER_ID = "Order-Id cannot be empty",
    BLANK_FROM_DATE = "From-Date cannot be empty",
    BLANK_TO_DATE = "To-Date cannot be empty",
    BLANK_TRANSACTION_TYPE = "Transaction-Type cannot be empty",
    BLANK_AMOUNT = "Amount cannot be empty",
    BLANK_SEGMENT = "Segment cannot be empty",
    BLANK_INTERVAL = "Interval cannot be empty",
    BLANK_STRIKE_PRICE = "Strike-Price cannot be empty for Product-Type 'options'",
    BLANK_EXPIRY_DATE = "Expiry-Date cannot be empty for exchange-code 'nfo'",
    BLANK_RIGHT_STRIKE_PRICE = "Either Right or Strike-Price cannot be empty.",
    BLANK_RIGHT_EXPIRY_DATE = "Either Expiry-Date or Right cannot be empty.",
    BLANK_EXPIRY_DATE_STRIKE_PRICE = "Either Expiry-Date or Strike-Price cannot be empty.",
    // BLANK_OPTION_TYPE = "Exchange-Code cannot be empty",
    BLANK_SOURCE_FLAG = "SOURCE_FLAG cannot be empty",
    BLANK_OPTION_TYPE = "option-type cannot be empty",
    BLANK_ORDER_FLOW = "order-flow cannot be empty",
    BLANK_UNDERLYING = "underlying cannot be empty",
    BLANK_STOP_LOSS_TRIGGER = "stop loss trigger cannot be empty",

    // Validation Error
    EXCHANGE_CODE_ERROR = "Exchange-Code should be either 'nse', or 'nfo' or 'ndx' or 'mcx'",
    EXCHANGE_CODE_HIST_V2_ERROR = "Exchange-Code should be either 'nse', 'bse' ,'nfo', 'ndx' or 'mcx'",
    PRODUCT_TYPE_ERROR = "Product should be either 'futures', 'options', 'futureplus', 'optionplus', 'cash', 'eatm','btst','mtf' or 'margin'",
    PRODUCT_TYPE_ERROR_NFO = "Product-type should be either 'futures', 'options', 'futureplus', or 'optionplus' for Exchange-Code 'NFO'",
    PRODUCT_TYPE_ERROR_HIST_V2 = "Product-type should be either 'futures', 'options' for Exchange-Code 'NFO','NDX' or 'MCX'",
    ACTION_TYPE_ERROR = "Action should be either 'buy', or 'sell'",
    ORDER_TYPE_ERROR = "Order-type should be either 'limit', 'market', or 'stoploss'",
    VALIDITY_TYPE_ERROR = "Validity should be either 'day', 'ioc', or 'vtc'",
    RIGHT_TYPE_ERROR = "Right should be either 'call', 'put', or 'others'",
    TRANSACTION_TYPE_ERROR = "Transaction-Type should be either 'debit' or 'credit'",
    ZERO_AMOUNT_ERROR = "Amount should be more than 0",
    AMOUNT_DIGIT_ERROR = "Amount should only contain digits",
    INTERVAL_TYPE_ERROR = "Interval should be either '1minute', '5minute', '30minute', or '1day'",
    INTERVAL_TYPE_ERROR_HIST_V2 = "Interval should be either '1second','1minute', '5minute', '30minute', or '1day'",
    API_SESSION_ERROR = "API Session cannot be empty",
    OPT_CHAIN_EXCH_CODE_ERROR = "Exchange code should be nfo",
    NFO_FIELDS_MISSING_ERROR = "Atleast two inputs are required out of Expiry-Date, Right & Strike-Price. All three cannot be empty'.",

    UNDER_LYING_ERROR = "underlying cant be empty",
    ORDER_FLOW = "order_flow cant be empty",
    STOP_LOSS_TRIGGER = "stop_loss_trigger cant be empty",
    OPTION_TYPE = "option_type cant be empty,its either CALL or PUT",
    SOURCE_FLAG = "source_flag cant be empty, it should be either P or M",
    MARKET_TYPE = "market_type cant be empty",
    FRESH_ORDER_LIMIT = "fresh_order_limit cant be empty",

    //Socket Connectivity Response
    RATE_REFRESH_NOT_CONNECTED = "socket server is not connected to rate refresh.",
    RATE_REFRESH_DISCONNECTED = "socket server for rate refresh  has been disconnected.",
    ORDER_REFRESH_NOT_CONNECTED = "socket server is not connected to order refresh.",
    ORDER_REFRESH_DISCONNECTED = "socket server for order streaming has been disconnected.",
    ORDER_NOTIFICATION_SUBSCRIBED = "Order Notification subscribed successfully",
    OHLCV_STREAM_NOT_CONNECTED = "socket server is not connected to OHLCV Stream.",
    OHLCV_STREAM_DISCONNECTED = "socket server for OHLCV Streaming has been disconnected.",
    ONE_CLICK_STRATEGY_SUBSCRIBED = "Oneclick Strategy Subscribed Successfully",
    ONE_CLICK_STRATEGY_UNSUBSCRIBED = "Oneclick Strategy Unsubscribed Successfully",


    STRATEGY_STREAM_SUBSCRIBED = "{0} streaming subscribed successfully.",
    STRATEGY_STREAM_DISCONNECTED = "strategy stream disconnected.",
    STRATEGY_STREAM_NOT_CONNECTED = "socket server is not connected to strategy streaming.",
    STRATEGY_STREAM_UNSUBSCRIBED = "{0} streaming unsubscribed successfully.",
    STOCK_SUBSCRIBE_MESSAGE = "Stock {0} subscribed successfully",
    STOCK_UNSUBSCRIBE_MESSAGE = "Stock {0} unsubscribed successfully"
}

export enum ExceptionMessages {
    AUTHENTICATION_EXCEPTION = "Could not authenticate credentials. Please check token and keys",
    QUOTE_DEPTH_EXCEPTION = "Either getExchangeQuotes must be true or getMarketDepth must be true",
    EXCHANGE_CODE_EXCEPTION = "Exchange Code allowed are 'BSE', 'NSE', 'NDX', 'MCX', 'NFO', 'BFO'.",
    EMPTY_STOCK_CODE_EXCEPTION = "Stock-Code cannot be empty.",
    EXPIRY_DATE_EXCEPTION = "Expiry-Date cannot be empty for given Exchange-Code.",
    PRODUCT_TYPE_EXCEPTION = "Product-Type should either be Futures or Options for given Exchange-Code.",
    STRIKE_PRICE_EXCEPTION = "Strike Price cannot be empty for Product-Type 'Options'.",
    RIGHT_EXCEPTION = "Rights should either be Put or Call for Product-Type 'Options'.",
    STOCK_INVALID_EXCEPTION = "Stock-Code not found.",
    WRONG_EXCHANGE_CODE_EXCEPTION = "Stock-Token cannot be found due to wrong exchange-code.",
    STOCK_NOT_EXIST_EXCEPTION = "Stock-Data does not exist in exchange-code {0} for Stock-Token {1}.",
    ISEC_NSE_STOCK_MAP_EXCEPTION = "Result Not Found",
    STREAM_OHLC_INTERVAL_ERROR = "Interval should be either '1second','1minute', '5minute', '30minute'",
    SESSIONKEY_INCORRECT = "Could not authenticate credentials. Please check session key.",
    APPKEY_INCORRECT = "Could not authenticate credentials. Please check api key.",
    SESSIONKEY_EXPIRED = "Session key is expired.",
    CUSTOMERDETAILS_API_EXCEPTION = "Unable to retrieve customer details at the moment. Please try again later.",
    OHLC_SOCKET_CONNECTION_DISCONNECTED = "Failed to connect to OHLC stream",
    LIVESTREAM_SOCKET_CONNECTION_DISCONNECTED = "Failed to connect to live stream",
    ORDERNOTIFY_SOCKET_CONNECTION_DISCONNECTED = "Failed to connect to order stream",
    STREAMING_SOCKET_CONNECTION_DISCONNECTED = "Connection Disconnected",
    API_REQUEST_EXCEPTION = "Error while trying to make request {0} {1}"
}





  // export with below
// import { Constants, APIRequestType } from '../config/constants';
// import { APIEndpoints } from '../config/endpoints';
// import { ResponseMessages, ExceptionMessages } from '../config/messages';
// import { INTERVAL_TYPES, FEED_INTERVAL_MAP, ISEC_NSE_CODE_MAP_FILE } from '../config/types';