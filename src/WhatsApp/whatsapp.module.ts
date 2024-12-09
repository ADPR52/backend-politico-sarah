import { Module } from '@nestjs/common';
import { SendWhatsAppService } from './send-whatsapp.service';
import { WhatsAppController } from './whatsap.controller';

@Module({
  providers: [SendWhatsAppService],
  controllers: [WhatsAppController],
})
export class WhatsAppModule {}
