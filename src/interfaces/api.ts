// src/interfaces/api.ts

export interface ExchangeInfo {
    NSE: string;
    BSE: string;
    FNO: string;
    NDX: string;
  }
  
  export interface SegmentsAllowed {
    Trading: string;
    Equity: string;
    Derivatives: string;
    Currency: string;
  }


  export interface CustomerDetailsResponse {
    Success: {
      exg_trade_date: ExchangeInfo;
      exg_status: ExchangeInfo;
      segments_allowed: SegmentsAllowed;
      idirect_userid: string;
      session_token: string;
      idirect_user_name: string;
      idirect_ORD_TYP: string;
      idirect_lastlogin_time: string;
      mf_holding_mode_popup_flg: string;
      commodity_exchange_status: string;
      commodity_trade_date: string;
      commodity_allowed: string;
    };
    Status: number;
    Error: string | null;
  }
  
  export interface CustomerDetailsParams {
    SessionToken: string;
    AppKey: string;
  }

  export interface DematHolding {
    stock_code: string;
    stock_ISIN: string;
    quantity: string;
    demat_total_bulk_quantity: string;
    demat_avail_quantity: string;
    blocked_quantity: string;
    demat_allocated_quantity: string;
  }
  
  export interface DematHoldingsResponse {
    Success: DematHolding[];
    Status: number;
    Error: string | null;
  }

  export interface FundsResponse {
    Success: {
      bank_account: string;
      total_bank_balance: number;
      allocated_equity: number;
      allocated_fno: number;
      block_by_trade_equity: number;
      block_by_trade_fno: number;
      block_by_trade_balance: number;
      unallocated_balance: string;
    };
    Status: number;
    Error: null | string;
  }

  export interface SetFundsRequest {
    transactionType: string;
    amount: string;
    segment: string;
  }
  
  export interface SetFundsResponse {
    Success: {
      status: string;
    };
    Status: number;
    Error: null | string;
  }

  export interface HistoricalDataRequest {
    interval: string;
    fromDate: string;
    toDate: string;
    stockCode: string;
    exchangeCode: string;
    productType?: string;
    expiryDate?: string;
    right?: string;
    strikePrice?: string;
  }
  
  export interface HistoricalDataPoint {
    datetime: string;
    stock_code: string;
    exchange_code: string;
    product_type: string | null;
    expiry_date: string | null;
    right: string | null;
    strike_price: string | null;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    open_interest: string | null;
    count: number;
  }
  
  export interface HistoricalDataResponse {
    Success: HistoricalDataPoint[];
    Status: number;
    Error: null | string;
  }

  export interface HistoricalDataV2Request {
    interval: string;
    fromDate: string;
    toDate: string;
    stockCode: string;
    exchangeCode: string;
    productType?: string;
    expiryDate?: string;
    right?: string;
    strikePrice?: string;
  }
  
  export interface HistoricalDataPointV2 {
    datetime: string;
    stock_code: string;
    exchange_code: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }
  
  export interface HistoricalDataV2Response {
    Success: HistoricalDataPointV2[];
    Status: number;
    Error: null | string;
  }

  export interface AddMarginRequest {
    productType?: string;
    stockCode?: string;
    exchangeCode: string;
    settlementId?: string;
    addAmount?: string;
    marginAmount?: string;
    openQuantity?: string;
    coverQuantity?: string;
    categoryIndexPerStock?: string;
    expiryDate?: string;
    right?: string;
    contractTag?: string;
    strikePrice?: string;
    segmentCode?: string;
  }
  
  export interface AddMarginResponse {
    Success: any;
    Status: number;
    Error: string | null;
  }

  export interface MarginLimit {
    trade_date: string;
    amount: number;
    exchange_code: string;
    payin_date: string;
    payout_date: string;
  }
  
  export interface MarginResponse {
    Success: {
      limit_list: MarginLimit[];
      cash_limit: number;
      amount_allocated: number;
      block_by_trade: number;
      isec_margin: number;
    };
    Status: number;
    Error: string | null;
  }

  export interface PlaceOrderRequest {
    stockCode: string;
    exchangeCode: string;
    product: string;
    action: string;
    orderType: string;
    stoploss?: string;
    quantity: string;
    price: string;
    validity: string;
    validityDate?: string;
    disclosedQuantity?: string;
    expiryDate?: string;
    right?: string;
    strikePrice?: string;
    userRemark?: string;
    orderTypeFresh?: string;
    orderRateFresh?: string;
    settlementId?: string;
    orderSegmentCode?: string;
  }
  
  export interface PlaceOrderResponse {
    Success: {
      order_id?: string;
      message?: string | null;
      [key: string]: any;  // This allows for any additional properties
    };
    Status: number;
    Error: string | null;
  }

export interface GetOrderDetailRequest {
  exchangeCode: string;
  orderId: string;
}

export interface OrderDetail {
  order_id: string;
  exchange_order_id: string | null;
  exchange_code: string;
  stock_code: string;
  product_type: string;
  action: string;
  order_type: string;
  stoploss: string;
  quantity: string;
  price: string;
  validity: string;
  disclosed_quantity: string;
  expiry_date: string | null;
  right: string | null;
  strike_price: number;
  average_price: string;
  cancelled_quantity: string;
  pending_quantity: string;
  status: string;
  user_remark: string;
  order_datetime: string;
  parent_order_id: string | null;
  modification_number: string | null;
  exchange_acknowledgement_date: string | null;
  SLTP_price: string | null;
  exchange_acknowledge_number: string | null;
  initial_limit: string | null;
  intial_sltp: string | null;
  LTP: string | null;
  limit_offset: string | null;
  mbc_flag: string | null;
  cutoff_price: string | null;
}

export interface GetOrderDetailResponse {
  Success: OrderDetail[];
  Status: number;
  Error: string | null;
}

export interface GetOrderListRequest {
    exchangeCode: string;
    fromDate: string;
    toDate: string;
  }
  
  export interface OrderDetails {
    order_id: string;
    exchange_order_id: string | null;
    exchange_code: string;
    stock_code: string;
    product_type: string;
    action: string;
    order_type: string;
    stoploss: string;
    quantity: string;
    price: string;
    validity: string;
    disclosed_quantity: string;
    expiry_date: string | null;
    right: string | null;
    strike_price: number;
    average_price: string;
    cancelled_quantity: string;
    pending_quantity: string;
    status: string;
    user_remark: string;
    order_datetime: string;
    parent_order_id: string | null;
    modification_number: string | null;
    exchange_acknowledgement_date: string | null;
    SLTP_price: string | null;
    exchange_acknowledge_number: string | null;
    initial_limit: string | null;
    intial_sltp: string | null;
    LTP: string | null;
    limit_offset: string | null;
    mbc_flag: string | null;
    cutoff_price: string | null;
  }
  
  export interface GetOrderListResponse {
    Success: OrderDetails[];
    Status: number;
    Error: string | null;
  }

  export interface CancelOrderRequest {
    exchangeCode: string;
    orderId: string;
  }
  
  export interface CancelOrderResponse {
    Success: {
      order_id: string;
      message: string;
    };
    Status: number;
    Error: string | null;
  }

  export interface ModifyOrderRequest {
    orderId: string;
    exchangeCode: string;
    orderType?: string;
    stoploss?: string;
    quantity?: string;
    price?: string;
    validity?: string;
    disclosedQuantity?: string;
    validityDate?: string;
  }
  
  export interface ModifyOrderResponse {
    Success: {
      message: string;
      order_id: string;
    };
    Status: number;
    Error: string | null;
  }

  export interface GetPortfolioHoldingsRequest {
    exchangeCode: string;
    fromDate?: string;
    toDate?: string;
    stockCode?: string;
    portfolioType?: string;
  }
  
  export interface PortfolioHolding {
    stock_code: string;
    exchange_code: string;
    quantity: string;
    average_price: string;
    booked_profit_loss: string;
    current_market_price: string;
    change_percentage: string;
    answer_flag: string;
    product_type: string | null;
    expiry_date: string | null;
    strike_price: string | null;
    right: string | null;
    category_index_per_stock: string | null;
    action: string | null;
    realized_profit: string | null;
    unrealized_profit: string | null;
    open_position_value: string | null;
    portfolio_charges: string | null;
  }
  
  export interface GetPortfolioHoldingsResponse {
    Success: PortfolioHolding[];
    Status: number;
    Error: string | null;
  }

  export interface PortfolioPosition {
    segment: string;
    product_type: string;
    trade_date: string | null;
    exchange_code: string;
    stock_code: string | null;
    expiry_date: string;
    right: string;
    stock_index_indicator: string;
    action: string;
    quantity: string;
    price: string;
    cover_quantity: string;
    stoploss_trigger: string;
    stoploss: string | null;
    take_profit: string | null;
    ltp: string;
    available_margin: string | null;
    squareoff_mode: string | null;
    mtf_sell_quantity: string | null;
    mtf_net_amount_payable: string | null;
    mtf_expiry_date: string | null;
    order_id: string;
    cover_order_flow: string | null;
    cover_order_executed_quantity: string | null;
    pledge_status: string | null;
    strike_price: string;
    underlying: string;
  }
  
  export interface GetPortfolioPositionsResponse {
    Success: PortfolioPosition[];
    Status: number;
    Error: string | null;
  }

  export interface GetQuotesRequest {
    stockCode: string;
    exchangeCode: string;
    expiryDate?: string;
    productType?: string;
    right?: string;
    strikePrice?: string;
  }
  
  export interface Quote {
    exchange_code: string;
    product_type: string;
    stock_code: string;
    expiry_date: string;
    right: string;
    strike_price: number;
    ltp: number;
    ltt: string;
    best_bid_price: number;
    best_bid_quantity: string;
    best_offer_price: number;
    best_offer_quantity: string;
    open: number;
    high: number;
    low: number;
    previous_close: number;
    ltp_percent_change: number;
    upper_circuit: number;
    lower_circuit: number;
    total_quantity_traded: string;
    spot_price: string;
  }
  
  export interface GetQuotesResponse {
    Success: Quote[];
    Status: number;
    Error: string | null;
  }

  export interface GetOptionChainQuotesRequest {
    stockCode: string;
    exchangeCode: string;
    expiryDate?: string;
    productType: string;
    right?: string;
    strikePrice?: string;
  }
  
  export interface OptionChainQuote {
    exchange_code: string;
    product_type: string;
    stock_code: string;
    expiry_date: string;
    right: string;
    strike_price: number;
    ltp: number;
    ltt: string;
    best_bid_price: number;
    best_bid_quantity: string;
    best_offer_price: number;
    best_offer_quantity: string;
    open: number;
    high: number;
    low: number;
    previous_close: number;
    ltp_percent_change: number;
    upper_circuit: number;
    lower_circuit: number;
    total_quantity_traded: string;
    spot_price: string;
    ltq: string;
    open_interest: number;
    chnge_oi: number;
    total_buy_qty: string;
    total_sell_qty: string;
  }
  
  export interface GetOptionChainQuotesResponse {
    Success: OptionChainQuote[];
    Status: number;
    Error: string | null;
  }

  export interface SquareOffRequest {
    sourceFlag?: string;
    stockCode: string;
    exchangeCode: string;
    quantity?: string;
    price?: string;
    action?: string;
    orderType?: string;
    validity?: string;
    stoploss?: string;
    disclosedQuantity?: string;
    protectionPercentage?: string;
    settlementId?: string;
    marginAmount?: string;
    openQuantity?: string;
    coverQuantity?: string;
    productType?: string;
    expiryDate?: string;
    right?: string;
    strikePrice?: string;
    validityDate?: string;
    tradePassword?: string;
    aliasName?: string;
  }
  
  export interface SquareOffResponse {
    Success: {
      order_id: string;
      message: string;
      indicator: string;
    };
    Status: number;
    Error: string | null;
  }

  export interface GetTradeListRequest {
    fromDate?: string;
    toDate?: string;
    exchangeCode: string;
    productType?: string;
    action?: string;
    stockCode?: string;
  }
  
  export interface Trade {
    match_account: string;
    order_trade_date: string;
    order_stock_code: string;
    order_flow: string;
    order_quantity: string;
    order_average_executed_rate: string;
    order_trans_value: string;
    order_brokerage: string;
    order_product: string;
    order_exchange_code: string;
    order_reference: string;
    order_segment_code: string;
    order_settlement: string;
    dp_id: string;
    client_id: string;
    LTP: string;
    order_eATM_withheld: string;
    order_csh_withheld: string;
    order_total_taxes: string;
    order_type: string;
  }
  
  export interface GetTradeListResponse {
    Success: {
      trade_book: Trade[];
    };
    Status: number;
    Error: string | null;
  }

  export interface GetTradeDetailRequest {
    exchangeCode: string;
    orderId: string;
  }
  
  export interface TradeDetail {
    order_settlement: string;
    order_exchange_trade_number: string;
    order_executed_quantity: string;
    order_flow: string;
    order_brokerage: string;
    order_pure_brokerage: string;
    order_taxes: string;
    order_eATM_withheld: string;
    order_cash_withheld: string;
    order_executed_rate: string;
    order_stock_code: string;
    order_exchange_code: string;
    match_account: string;
    order_trade_reference: string;
    order_exchange_trade_tm: string;
    order_segment_dis: string;
    order_segment_code: string;
  }
  
  export interface GetTradeDetailResponse {
    Success: TradeDetail[];
    Status: number;
    Error: string | null;
  }
  
  export interface PreviewOrderRequest {
    stockCode: string;
    exchangeCode: string;
    productType: string;
    orderType: string;
    price: string;
    action: string;
    quantity: string;
    expiryDate?: string;
    right?: string;
    strikePrice?: string;
    specialFlag?: string;
    stoploss?: string;
    orderRateFresh?: string;
  }
  
  export interface PreviewOrderResponse {
    Success: {
      brokerage: number;
      exchange_turnover_charges: number;
      stamp_duty: number;
      stt: number;
      sebi_charges: number;
      gst: number;
      total_turnover_and_sebi_charges: number;
      total_other_charges: number;
      total_brokerage: number;
    };
    Status: number;
    Error: string | null;
  }

  export interface LimitCalculatorRequest {
    strikePrice: string;
    productType: string;
    expiryDate: string;
    underlying: string;
    exchangeCode: string;
    orderFlow: string;
    stopLossTrigger: string;
    optionType: string;
    sourceFlag: string;
    limitRate: string;
    orderReference: string;
    availableQuantity: string;
    marketType: string;
    freshOrderLimit: string;
  }
  
  export interface LimitCalculatorResponse {
    Success: {
      available_quantity: string;
      action_id: string;
      order_margin: string;
      limit_rate: string;
    };
    Status: number;
    Error: string | null;
  }

export interface Position {
  strike_price: string;
  quantity: string;
  right: string;
  product: string;
  action: string;
  price: string;
  expiry_date: string;
  stock_code: string;
  cover_order_flow: string;
  fresh_order_type: string;
  cover_limit_rate: string;
  cover_sltp_price: string;
  fresh_limit_rate: string;
  open_quantity: string;
}

export interface MarginCalculatorRequest {
  payloadList: Position[];
  exchangeCode: string;
}

export interface MarginCalculation {
  strike_price: string;
  quantity: string;
  right: string;
  product: string;
  action: string;
  price: string;
  expiry_date: string;
  stock_code: string;
}

export interface MarginCalculatorResponse {
  Success: {
    margin_calulation: MarginCalculation[];
    non_span_margin_required: string;
    order_value: string;
    order_margin: string;
    trade_margin: string | null;
    block_trade_margin: string;
    span_margin_required: string;
  };
  Status: number;
  Error: string | null;
}

export interface GetNamesRequest {
  exchange: string;
  stockCode: string;
}

export interface GetNamesResponse {
  status: string;
  isec_stock_code: string;
  isec_token: string;
  company_name: string;
  isec_token_level1: string;
  isec_token_level2: string;
  exchange_stockCode: string;
  exchange: string;
}

export interface GetNamesErrorResponse {
  Status: string;
  Response: string;
}

export interface StockData {
  [key: string]: string[];
}

export interface GetStockTokenValueParams {
  exchangeCode: string;
  stockCode: string;
  productType?: string;
  expiryDate?: string;
  strikePrice?: string;
  right?: string;
  getExchangeQuotes?: boolean;
  getMarketDepth?: boolean;
}

export interface StockTokenValueResult {
  exch_quote_token: string | null;
  market_depth_token: string | null;
}

export interface ParsedOhlcData {
  interval: string;
  exchange_code: string;
  stock_code: string;
  low: string;
  high: string;
  open: string;
  close: string;
  volume: string;
  datetime: string;
  expiry_date?: string;
  strike_price?: string;
  right_type?: string;
  oi?: string;
}

export interface MarketDepthEntry {
  [key: string]: string | number;
}

export interface StrategyData {
  strategy_date: string;
  modification_date: string;
  portfolio_id: string;
  call_action: string;
  portfolio_name: string;
  exchange_code: string;
  product_type: string;
  underlying: string;
  expiry_date: string;
  option_type: string;
  strike_price: string;
  action: string;
  recommended_price_from: string;
  recommended_price_to: string;
  minimum_lot_quantity: string;
  last_traded_price: string;
  best_bid_price: string;
  best_offer_price: string;
  last_traded_quantity: string;
  target_price: string;
  expected_profit_per_lot: string;
  stop_loss_price: string;
  expected_loss_per_lot: string;
  total_margin: string;
  leg_no: string;
  status: string;
}

export  interface IClickData {
    stock_name: string;
    stock_code: string;
    action_type: string;
    expiry_date: string;
    strike_price: string;
    option_type: string;
    stock_description: string;
    recommended_price_and_date: string;
    recommended_price_from: string;
    recommended_price_to: string;
    recommended_date: string;
    target_price: string;
    sltp_price: string;
    part_profit_percentage: string;
    profit_price: string;
    exit_price: string;
    recommended_update: string;
    iclick_status: string;
    subscription_type: string;
  }

  export interface OrderData {
    [key: string]: string | number;
  }

  export interface QuoteData {
    symbol: string;
    open: string;
    last: string;
    high: string;
    low: string;
    change: string;
    bPrice: string;
    bQty: string;
    sPrice: string;
    sQty: string;
    ltq: string;
    avgPrice: string;
    quotes: string;
    [key: string]: string | number;
  }

  export interface MarketDepthData {
    symbol: string;
    time: string;
    depth: any[]; // This should match the return type of parseMarketDepth
    quotes: string;
    exchange?: string;
  }

  


// export interface PlaceOrderSuccess {
//     order_id: string;
//     message: string | null;
//   }
  
//   export interface PlaceOrderError {
//     Status: number;
//     Error: string;
//   }

//   export interface PlaceOrderResponse {
//     Success?: PlaceOrderSuccess
//     Status: number;
//     Error: string | null;
//   }
