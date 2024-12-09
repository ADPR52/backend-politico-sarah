import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  iniciar() {
    const mensaje = 'Conectado exitosamente';
    return mensaje ;
  }
}
