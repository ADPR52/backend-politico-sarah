import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GastosController } from './tipo_gasto.controller';
import { GastosService } from './tipo_gasto.service';
import { Tipo_gasto } from './entities/tipo_gasto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tipo_gasto]),
  ],
  controllers: [GastosController],
  providers: [GastosService],
})
export class TipoGastosModule {}
