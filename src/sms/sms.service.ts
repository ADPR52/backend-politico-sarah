import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient!: Twilio;

  /**
   * Configurar cliente Twilio
   */
  configureTwilio(accountSid: string, authToken: string): void {
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  /**
   * Función para enviar un SMS simple
   */
  async sendSms(to: string, from: string, message: string): Promise<void> {
    if (!this.twilioClient) {
      throw new Error('Twilio client not configured');
    }

    await this.twilioClient.messages.create({
      body: message,
      from,
      to,
    });

    console.log(`Mensaje enviado correctamente a: ${to}`);
  }

  /**
   * Función para enviar SMS en masa
   */
  async sendBulkSms(
    usuarios: Array<{ nombre: string; telefono: string }>,
    from: string,
    link: string,
  ): Promise<void> {
    console.log('Enviando SMS en lote...');
    for (const usuario of usuarios) {
      const formattedNumber = this.formatPhoneNumber(usuario.telefono);
      console.log(`Enviando SMS a: ${formattedNumber}`);
      try {
        await this.sendSms(formattedNumber, from, link);
        console.log(`Mensaje enviado a ${usuario.nombre} exitosamente`);
      } catch (error) {
        console.error(
          `Error al enviar mensaje a ${usuario.nombre} (${formattedNumber}):`,
          error,
        );
      }
    }
  }

  /**
   * Enviar mensajes personalizados a un grupo
   */
  async sendPersonalizedBulkSms(
    usuarios: Array<{ nombre: string; telefono: string }>,
    from: string,
    baseMessage: string,
  ): Promise<void> {
    for (const usuario of usuarios) {
      const formattedNumber = this.formatPhoneNumber(usuario.telefono);
      const personalizedMessage = `Hola ${usuario.nombre}, ${baseMessage}`;
      try {
        await this.sendSms(formattedNumber, from, personalizedMessage);
        console.log(`Mensaje enviado a ${formattedNumber}`);
      } catch (error) {
        console.error(`Error al enviar mensaje personalizado a ${formattedNumber}:`, error);
      }
    }
  }

  /**
   * Formatear números de teléfono agregando +57 si es necesario
   */
  formatPhoneNumber(phoneNumber: string): string {
    const countryCode = '+57';
    if (!phoneNumber.startsWith('+')) {
      const formattedNumber = `${countryCode}${phoneNumber}`;
      return formattedNumber;
    }
    return phoneNumber;
  }
}
