import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGastoDto } from "./dto/create-tipo_gasto.dto";
import { UpdateGastoDto } from "./dto/update-tipo_gasto.dto";
import { Tipo_gasto } from "./entities/tipo_gasto.entity";

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Tipo_gasto)
    private gastoRepository: Repository<Tipo_gasto>
  ) {}

  async create(CreateGastoDto: CreateGastoDto): Promise<Tipo_gasto> {
    const newGasto = this.gastoRepository.create(CreateGastoDto);
    return this.gastoRepository.save(newGasto);
  }

  async findAll(): Promise<Tipo_gasto[]> {
    return this.gastoRepository.find();
  }

  async findOne(id: number): Promise<Tipo_gasto> {
    const gastos = await this.gastoRepository.findOne({
      where: { id },
      relations: ["responsable", "campania"],
    });

    if (!gastos) {
      throw new NotFoundException(`gastos con ID ${id} no encontrado`);
    }

    return gastos;
  }

  async update(id: number, updategastosDto: UpdateGastoDto): Promise<Tipo_gasto> {
    const gastos = await this.gastoRepository.findOne({ where: { id } });

    if (!gastos) {
        throw new NotFoundException(`El tipo de gasto con ID ${id} no existe`);
    }

    // Actualizar campos
    Object.assign(gastos, updategastosDto);

    try {
        return await this.gastoRepository.save(gastos);
    } catch (error) {
        throw new Error(`Error al guardar los cambios`);
    }
}


  // async remove(id: number): Promise<void> {
  //   const result = await this.gastoRepository.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`gastos con ID ${id} no encontrado`);
  //   }
  // }
}
