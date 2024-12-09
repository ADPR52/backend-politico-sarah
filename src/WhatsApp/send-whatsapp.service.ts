import { Injectable, UseGuards } from "@nestjs/common";
import axios from "axios";
import { AuthGuard } from "src/auth/auth.service";

@Injectable()
export class SendWhatsAppService {
  @UseGuards(AuthGuard)
  async sendWhatsAppMessage(
    instancia: string,
    token: string,
    to: string,
    body: string
  ): Promise<any> {
    try {
      const baseURL = `https://api.ultramsg.com/${instancia}/`;
      const response = await axios.post(`${baseURL}messages/chat`, {
        token: token,
        to: to,
        body: body,
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error al enviar el mensaje a ${to}:`, error.message);
      } else {
        console.error(`Error desconocido al enviar el mensaje a ${to}:`, error);
      }
      throw new Error(`No se pudo enviar el mensaje a ${to}`);
    }
  }
}
