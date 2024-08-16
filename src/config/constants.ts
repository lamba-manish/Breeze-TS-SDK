export const Constants = {
    API_URL: 'https://api.icicidirect.com/breezeapi/api/v1/',
    BREEZE_NEW_URL: 'https://breezeapi.icicidirect.com/api/v2/',
    LIVE_FEEDS_URL: 'https://livefeeds.icicidirect.com',
    LIVE_STREAM_URL: 'https://livestream.icicidirect.com',
    LIVE_OHLC_STREAM_URL: 'https://breezeapi.icicidirect.com',
    SECURITY_MASTER_URL: 'https://directlink.icicidirect.com/NewSecurityMaster/SecurityMaster.zip',
    STOCK_SCRIPT_CSV_URL: 'https://traderweb.icicidirect.com/Content/File/txtFile/ScripFile/StockScriptNew.csv',
  };

  export const ScriptMasterFile = {
    NSE_URL:'https://traderweb.icicidirect.com/Content/File/txtFile/ScripFile/NSEScripMaster.txt',
    BSE_URL:'https://traderweb.icicidirect.com/Content/File/txtFile/ScripFile/BSEScripMaster.txt',
    CDNSE_URL:'https://traderweb.icicidirect.com/Content/File/txtFile/ScripFile/CDNSEScripMaster.txt',
    FONSE_URL:'https://traderweb.icicidirect.com/Content/File/txtFile/ScripFile/FONSEScripMaster.txt'

  };
  
  export enum APIRequestType {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
  }

  export interface TuxToUserMapType {
    orderFlow: { [key: string]: string };
    limitMarketFlag: { [key: string]: string };
    orderType: { [key: string]: string };
    productType: { [key: string]: string };
    orderStatus: { [key: string]: string };
    optionType: { [key: string]: string };
  }
  
  export const TUX_TO_USER_MAP: TuxToUserMapType = {
    orderFlow: {
      B: 'Buy',
      S: 'Sell',
      N: 'NA',
    },
    limitMarketFlag: {
      L: 'Limit',
      M: 'Market',
      S: 'StopLoss',
    },
    orderType: {
      T: 'Day',
      I: 'IoC',
      V: 'VTC',
    },
    productType: {
      F: 'Futures',
      O: 'Options',
      P: 'FuturePlus',
      U: 'FuturePlus_sltp',
      I: 'OptionPlus',
      C: 'Cash',
      Y: 'eATM',
      B: 'BTST',
      M: 'Margin',
      T: 'MarginPlus',
    },
    orderStatus: {
      A: 'All',
      R: 'Requested',
      Q: 'Queued',
      O: 'Ordered',
      P: 'Partially Executed',
      E: 'Executed',
      J: 'Rejected',
      X: 'Expired',
      B: 'Partially Executed And Expired',
      D: 'Partially Executed And Cancelled',
      F: 'Freezed',
      C: 'Cancelled',
    },
    optionType: {
      C: 'Call',
      P: 'Put',
      '*': 'Others',
    },
  };



  // export with below
// import { Constants, APIRequestType } from '../config/constants';
// import { APIEndpoints } from '../config/endpoints';
// import { ResponseMessages, ExceptionMessages } from '../config/messages';
// import { INTERVAL_TYPES, FEED_INTERVAL_MAP, ISEC_NSE_CODE_MAP_FILE } from '../config/types';
