import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Twilio } from './entities/twilio.entity';
import { TwilioService } from './twilio.service';
import { TwilioController } from './twilio.controller';
import { CampaniasModule } from 'src/campanias/campanias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Twilio]), CampaniasModule],
  controllers: [TwilioController],
  providers: [TwilioService],
  exports: [TwilioService],
})
export class TwilioModule {}
