import { Module } from '@nestjs/common';
import { CampaniasService } from './campanias.service';
import { CampaniasController } from './campanias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campania } from './entities/campania.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campania])],
  controllers: [CampaniasController],
  providers: [CampaniasService],
  exports: [TypeOrmModule],
})
export class CampaniasModule {}
