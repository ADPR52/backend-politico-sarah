import { Module } from '@nestjs/common';
import { BeneficiosService } from './beneficios.service';
import { BeneficiosController } from './beneficios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beneficio } from './entities/beneficio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beneficio])],
  controllers: [BeneficiosController],
  providers: [BeneficiosService]
})
export class BeneficiosModule {}
