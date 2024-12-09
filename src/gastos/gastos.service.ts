import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { Gasto } from './entities/gasto.entity';
import { Caracterizacion } from 'src/caracterizacion/entities/caracterizacion.entity';
import { Campania } from 'src/campanias/entities/campania.entity';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto)
    private gastoRepository: Repository<Gasto>,
  ) {}

  async create(CreateGastoDto: CreateGastoDto): Promise<Gasto> {
      const responsable = await this.gastoRepository.manager.findOne(
        Caracterizacion,
        {
          where: { numero_documento: CreateGastoDto.responsable },
        }
      );
  
      if (!responsable) {
        throw new NotFoundException(
          `Responsable con documento ${CreateGastoDto.responsable} no encontrado`
        );
      }
  
      const campania = await this.gastoRepository.manager.findOne(Campania, {
        where: { id: CreateGastoDto.campania },
      });
  
      if (!campania) {
        throw new NotFoundException(
          `Campania con ID ${CreateGastoDto.campania} no encontrada`
        );
      }
  
      const newgastos = this.gastoRepository.create({
        ...CreateGastoDto,
        responsable,
        campania,
      });
  
      return this.gastoRepository.save(newgastos);
    }
  
    async findAll(): Promise<Gasto[]> {
      return this.gastoRepository.find();
    }
  
    async findOne(id: number): Promise<Gasto> {
      const gastos = await this.gastoRepository.findOne({
        where: { id },
        relations: ["responsable", "campania",],
      });
  
      if (!gastos) {
        throw new NotFoundException(`gastos con ID ${id} no encontrado`);
      }
  
      return gastos;
    }
  
    async update(
      id: number,
      updategastosDto: UpdateGastoDto
    ): Promise<Gasto> {
      const gastos = await this.findOne(id);
      Object.assign(gastos, updategastosDto);
      return this.gastoRepository.save(gastos);
    }

    async findByCampania(campaniaId: number): Promise<Gasto[]> {
      const gastos = await this.gastoRepository.find({
        where: { campania: { id: campaniaId } }
      });
    
      if (!gastos.length) {
        throw new NotFoundException(
          `No se encontraron gastos para la campaña con ID ${campaniaId}`
        );
      }
    
      return gastos;
    }
    
  
    // async remove(id: number): Promise<void> {
    //   const result = await this.gastoRepository.delete(id);
    //   if (result.affected === 0) {
    //     throw new NotFoundException(`gastos con ID ${id} no encontrado`);
    //   }
    // }
}
