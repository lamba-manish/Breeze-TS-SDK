// src/utils/errors.ts

export class BreezeError extends Error {
    constructor(message: string, public originalError?: any) {
      super(message);
      this.name = 'BreezeError';
      
      // This line is necessary for proper prototype chain inheritance
      Object.setPrototypeOf(this, BreezeError.prototype);
    }
  }
