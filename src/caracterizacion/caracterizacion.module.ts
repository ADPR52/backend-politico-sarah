import { Module } from '@nestjs/common';
import { CaracterizacionService } from './caracterizacion.service';
import { CaracterizacionController } from './caracterizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caracterizacion } from './entities/caracterizacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Caracterizacion])],
  controllers: [CaracterizacionController],
  providers: [CaracterizacionService]
})
export class CaracterizacionModule {}
