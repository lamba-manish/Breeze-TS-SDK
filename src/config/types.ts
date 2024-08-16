export const INTERVAL_TYPES = ['1minute', '5minute', '30minute', '1day'];
export const INTERVAL_TYPES_HIST_V2 = ['1second', '1minute', '5minute', '30minute', '1day'];
export const INTERVAL_TYPES_STREAM_OHLC = ['1second', '1minute', '5minute', '30minute'];
export const PRODUCT_TYPES = ['futures', 'options', 'futureplus', 'optionplus', 'cash', 'eatm', 'margin', 'mtf', 'btst'];
export const PRODUCT_TYPES_HIST = ['futures', 'options', 'futureplus', 'optionplus'];
export const PRODUCT_TYPES_HIST_V2 = ['futures', 'options', 'cash'];
export const RIGHT_TYPES = ['call', 'put', 'others'];
export const ACTION_TYPES = ['buy', 'sell'];
export const ORDER_TYPES = ['limit', 'market', 'stoploss'];
export const VALIDITY_TYPES = ['day', 'ioc', 'vtc'];
export const TRANSACTION_TYPES = ['debit', 'credit'];
export const EXCHANGE_CODES_HIST = ['nse', 'nfo', 'ndx', 'mcx'];
export const EXCHANGE_CODES_HIST_V2 = ['nse', 'bse', 'nfo', 'ndx', 'mcx'];
export const FNO_EXCHANGE_TYPES = ['nfo', 'mcx', 'ndx'];
// export const DERI_EXCH_CODES : ["nfo","ndx","mcx"];
export const STRATEGY_SUBSCRIPTION = ['one_click_fno', 'i_click_2_gain'];

export const ISEC_NSE_CODE_MAP_FILE = {
  nse: 'NSEScripMaster.txt',
  bse: 'BSEScripMaster.txt',
  cdnse: 'CDNSEScripMaster.txt',
  fonse: 'FONSEScripMaster.txt',
};

export const FEED_INTERVAL_MAP = {
  '1MIN': '1minute',
  '5MIN': '5minute',
  '30MIN': '30minute',
  '1SEC': '1second',
};

export const CHANNEL_INTERVAL_MAP = {
  '1minute': '1MIN',
  '5minute': '5MIN',
  '30minute': '30MIN',
  '1second': '1SEC',
};




// export with below
// import { Constants, APIRequestType } from '../config/constants';
// import { APIEndpoints } from '../config/endpoints';
// import { ResponseMessages, ExceptionMessages } from '../config/messages';
// import { INTERVAL_TYPES, FEED_INTERVAL_MAP, ISEC_NSE_CODE_MAP_FILE } from '../config/types';