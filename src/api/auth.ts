// src/api/auth.ts

import axios from 'axios';
import { Constants } from '../config/constants';
import { APIEndpoints } from '../config/endpoints';
import { BreezeError } from '../utils/errors';

export class Auth {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async authenticate(apiSecret: string, sessionToken: string): Promise<void> {
    try {
      const response = await axios.get(`${Constants.API_URL}${APIEndpoints.CUSTOMER_DETAILS}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          SessionToken: sessionToken,
          AppKey: this.apiKey,
        }),
      });

      if (response.data.Status !== 200) {
        throw new BreezeError(response.data.Error || 'Authentication failed');
      }

      // Process and store the authentication result
      // You might want to store the session token or other relevant information here
    } catch (error) {
      throw new BreezeError('Authentication failed', error);
    }
  }
}
