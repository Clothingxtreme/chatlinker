import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsappService {
  async sendText(phoneE164: string, text: string) {
    const url = `https://graph.facebook.com/v21.0/${process.env.WA_PHONE_NUMBER_ID}/messages`;
    try {
      await axios.post(
        url,
        {
          messaging_product: 'whatsapp',
          to: phoneE164,
          type: 'text',
          text: { body: text },
        },
        { headers: { Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}` } },
      );
      return { ok: true };
    } catch (e: any) {
      throw new InternalServerErrorException(e.response?.data || e.message);
    }
  }
}
