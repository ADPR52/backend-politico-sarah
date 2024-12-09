import { Module } from '@nestjs/common';
import { UltramsgService } from './ultramsg.service';
import { UltramsgController } from './ultramsg.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ultramsg } from './entities/ultramsg.entity';
import { CampaniasModule } from 'src/campanias/campanias.module';
@Module({
  imports: [TypeOrmModule.forFeature([Ultramsg]), CampaniasModule],
  controllers: [UltramsgController],
  providers: [UltramsgService],
  exports: [UltramsgService],
})
export class UltramsgModule {}
