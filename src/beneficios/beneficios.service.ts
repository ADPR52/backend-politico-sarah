import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBeneficioDto } from "./dto/create-beneficio.dto";
import { UpdateBeneficioDto } from "./dto/update-beneficio.dto";
import { Beneficio } from "./entities/beneficio.entity";
import { Caracterizacion } from "src/caracterizacion/entities/caracterizacion.entity";
import { Campania } from "src/campanias/entities/campania.entity";

@Injectable()
export class BeneficiosService {
  constructor(
    @InjectRepository(Beneficio)
    private beneficiosRepository: Repository<Beneficio>
  ) {}

  async create(createBeneficioDto: CreateBeneficioDto): Promise<Beneficio> {
    const responsable = await this.beneficiosRepository.manager.findOne(
      Caracterizacion,
      {
        where: { numero_documento: createBeneficioDto.responsable },
      }
    );

    if (!responsable) {
      throw new NotFoundException(
        `Responsable con documento ${createBeneficioDto.responsable} no encontrado`
      );
    }

    const campania = await this.beneficiosRepository.manager.findOne(Campania, {
      where: { id: createBeneficioDto.campania },
    });

    if (!campania) {
      throw new NotFoundException(
        `Campania con ID ${createBeneficioDto.campania} no encontrada`
      );
    }

    const newBeneficio = this.beneficiosRepository.create({
      ...createBeneficioDto,
      responsable,
      campania,
    });

    return this.beneficiosRepository.save(newBeneficio);
  }

  async findAll(): Promise<Beneficio[]> {
    return this.beneficiosRepository.find();
  }

  async findOne(id: number): Promise<Beneficio> {
    const beneficio = await this.beneficiosRepository.findOne({
      where: { id },
      relations: ["responsable", "campania",],
    });

    if (!beneficio) {
      throw new NotFoundException(`Beneficio con ID ${id} no encontrado`);
    }

    return beneficio;
  }

  async update(
    id: number,
    updateBeneficioDto: UpdateBeneficioDto
  ): Promise<Beneficio> {
    const beneficio = await this.findOne(id);
    Object.assign(beneficio, updateBeneficioDto);
    return this.beneficiosRepository.save(beneficio);
  }

  async findByCampania(campaniaId: number): Promise<Beneficio[]> {
    const beneficios = await this.beneficiosRepository.find({
      where: { campania: { id: campaniaId } }
    });
  
    if (beneficios.length === 0) {
      throw new NotFoundException(`No se encontraron beneficios para la campaña con ID ${campaniaId}`);
    }
  
    return beneficios;
  }
  

  // async remove(id: number): Promise<void> {
  //   const result = await this.beneficiosRepository.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Beneficio con ID ${id} no encontrado`);
  //   }
  // }
}
