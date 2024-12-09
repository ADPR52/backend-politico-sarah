import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCampaniaDto } from "./dto/create-campania.dto";
import { UpdateCampaniaDto } from "./dto/update-campania.dto";
import { Campania } from "./entities/campania.entity";
import { Caracterizacion } from "src/caracterizacion/entities/caracterizacion.entity";

@Injectable()
export class CampaniasService {
  constructor(
    @InjectRepository(Campania)
    private campaniasRepository: Repository<Campania>
  ) {}

  async create(CreateCampaniaDto: CreateCampaniaDto): Promise<Campania> {
    const { responsable: responsableId } = CreateCampaniaDto;

    const responsable = await this.campaniasRepository.manager.findOne(
      Caracterizacion,
      {
        where: { numero_documento: responsableId },
      }
    );

    if (!responsable) {
      throw new NotFoundException(
        `Responsable con documento ${responsableId} no encontrado`
      );
    }

    const fechaActual = new Date();
    const campaniaActiva = await this.campaniasRepository
      .createQueryBuilder("campania")
      .where("campania.responsable = :responsableId", { responsableId })
      .andWhere("campania.fecha_adicional >= :fechaActual", { fechaActual })
      .getOne();

    if (campaniaActiva) {
      throw new ConflictException(
        "El responsable seleccionado está en una campaña activa, por favor seleccione otro"
      );
    }

    const newCampania = this.campaniasRepository.create({
      ...CreateCampaniaDto,
      responsable,
    });

    return this.campaniasRepository.save(newCampania);
  }

  async findAll(): Promise<Partial<Campania>[]> {
    return this.campaniasRepository.find({});
  }

  async findOne(id: number): Promise<Campania> {
    const campania = await this.campaniasRepository.findOne({
      where: { id },
      relations: ['responsable'],
    });
  
    if (!campania) {
      throw new NotFoundException(`Campaña con ID ${id} no encontrada`);
    }
    
    return campania;
  }
  

  async update(
    id: number,
    updateCampaniaDto: UpdateCampaniaDto
  ): Promise<Campania> {
    const campania = await this.findOne(id);
    Object.assign(campania, updateCampaniaDto);
    return this.campaniasRepository.save(campania);
  }

  async remove(id: number): Promise<void> {
    const result = await this.campaniasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Campaña con ID ${id} no encontrada`);
    }
  }

  async getCalendar(): Promise<Partial<Campania>[]> {
    return this.campaniasRepository.find({
      select: ["nombre", "fecha_inicio", "fecha_fin", "fecha_adicional"],
    });
  }
}
