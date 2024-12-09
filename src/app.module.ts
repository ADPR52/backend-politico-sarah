import { Caracterizacion } from './caracterizacion/entities/caracterizacion.entity';
import { Campania } from 'src/campanias/entities/campania.entity';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CampaniasModule } from "./campanias/campanias.module";
import { CaracterizacionModule } from './caracterizacion/caracterizacion.module';
import { BeneficiosModule } from './beneficios/beneficios.module';
import { Beneficio } from "./beneficios/entities/beneficio.entity";
import { SmsModule } from './sms/sms.module';
import { GastosModule } from './gastos/gastos.module';
import { Gasto } from './gastos/entities/gasto.entity';
import { Tipo_gasto } from './tipo_gasto/entities/tipo_gasto.entity';
import { TipoGastosModule } from './tipo_gasto/tipo_gasto.module';
import { EmailModule } from './email/email.module';
import { EventsModule } from './events/events.module';
import { Event } from './events/entities/event.entity';
import { WhatsAppModule } from './WhatsApp/whatsapp.module';
import { SurveyModule } from './survey/survey.module';
import { Survey } from './survey/entities/survey.entity';
import { TwilioModule } from './twilio/twilio.module';
import { UltramsgModule } from './ultramsg/ultramsg.module';
import { Twilio } from './twilio/entities/twilio.entity';
import { Ultramsg } from './ultramsg/entities/ultramsg.entity';
import { SurveyResponseModule } from './survey-response/survey-response.module';
import { SurveyResponse } from './survey-response/entities/survey-response.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'autorack.proxy.rlwy.net',
      port: 33623,
      username: 'postgres',
      password: 'DCYVhFgTmbkdirarpNokhLVqhmKCXHjc',
      database: 'railway',
      entities: [Campania, Beneficio, Caracterizacion, Gasto, Tipo_gasto, Event, Survey, Twilio, Ultramsg, SurveyResponse],
      synchronize: true,
    }),
    
    CampaniasModule,
    CaracterizacionModule,
    BeneficiosModule,
    SmsModule,
    GastosModule,
    TipoGastosModule,
    EmailModule,
    EventsModule,
    WhatsAppModule,
    SurveyModule,
    TwilioModule,
    UltramsgModule,
    SurveyResponseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
