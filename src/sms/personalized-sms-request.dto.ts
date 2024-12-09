export interface PersonalizedSmsRequestDto {
    mensaje: string;
    usuarios: Array<{ nombre: string; telefono: string }>;
    accountSid: string;
    authToken: string;
    fromNumber: string;
  }
  