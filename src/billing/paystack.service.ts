import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaystackService {
  private base = 'https://api.paystack.co';
  private auth = { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` };

  initTransaction(amountNaira: number, email: string, metadata?: any) {
    return axios.post(`${this.base}/transaction/initialize`, {
      email,
      amount: Math.round(amountNaira * 100),
      metadata,
    }, { headers: this.auth }).then(r => r.data);
  }

  verify(reference: string) {
    return axios.get(`${this.base}/transaction/verify/${reference}`, { headers: this.auth }).then(r => r.data);
  }
}
