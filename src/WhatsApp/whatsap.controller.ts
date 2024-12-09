import { Controller, Post, Body } from '@nestjs/common';
import { SendWhatsAppService } from './send-whatsapp.service';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly sendWhatsAppService: SendWhatsAppService) {}

  /**
   * Endpoint anterior para enviar mensajes con una encuesta
   */
  @Post('send')
  async sendMessages(@Body() body: { usuarios: any[]; linkMessages: string; instancia: string; token: string }) {
    if (!body.usuarios || body.usuarios.length === 0) {
      throw new Error('Debe proporcionar al menos un usuario para enviar mensajes');
    }

    if (!body.linkMessages) {
      throw new Error('Debe proporcionar un enlace para la encuesta');
    }

    if (!body.instancia || !body.token) {
      throw new Error('Debe proporcionar la instancia y el token para enviar mensajes');
    }

    const resultados: { telefono: string, status: any }[] = [];

    for (const usuario of body.usuarios) {
      const { nombre, apellidos, telefono } = usuario;
      const mensaje = `Buenos días ${nombre} ${apellidos}, tiene una encuesta pendiente de Portal Sarah. Por favor, diligénciela aquí: ${body.linkMessages}`;
      const resultado = await this.sendWhatsAppService.sendWhatsAppMessage(
        body.instancia, body.token, telefono, mensaje
      );
      resultados.push({ telefono, status: resultado });
    }

    return {
      message: 'Mensajes enviados',
      detalles: resultados,
    };
  }

  /**
   * Nuevo endpoint para enviar mensajes personalizados
   */
  @Post('send/whatsapp/personalize')
  async sendPersonalizedMessages(@Body() body: { mensaje: string; usuarios: any[]; instancia: string; token: string }) {
    if (!body.usuarios || body.usuarios.length === 0) {
      throw new Error('Debe proporcionar al menos un usuario para enviar mensajes');
    }

    if (!body.mensaje) {
      throw new Error('Debe proporcionar un mensaje para enviar');
    }

    if (!body.instancia || !body.token) {
      throw new Error('Debe proporcionar la instancia y el token para enviar mensajes');
    }

    const resultados: { telefono: string; status: any }[] = [];

    for (const usuario of body.usuarios) {
      const { nombre, apellidos, telefono } = usuario;
      const mensajePersonalizado = `Hola ${nombre} ${apellidos}, ${body.mensaje}`;
      const resultado = await this.sendWhatsAppService.sendWhatsAppMessage(
        body.instancia,
        body.token,
        telefono,
        mensajePersonalizado,
      );

      resultados.push({ telefono, status: resultado });
    }

    return {
      message: 'Mensajes personalizados enviados con éxito',
      detalles: resultados,
    };
  }
}
