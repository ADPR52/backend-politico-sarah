import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUltramsgDto } from "./dto/create-ultramsg.dto";
import { UpdateUltramsgDto } from "./dto/update-ultramsg.dto";
import { Ultramsg } from "./entities/ultramsg.entity";
import { Campania } from "src/campanias/entities/campania.entity";

@Injectable()
export class UltramsgService {
  constructor(
    @InjectRepository(Ultramsg)
    private readonly ultramsgRepository: Repository<Ultramsg>,
    @InjectRepository(Campania)
    private readonly campaniaRepository: Repository<Campania>
  ) {}

  async create(createUltramsgDto: CreateUltramsgDto): Promise<Ultramsg> {
    const campania = await this.campaniaRepository.findOne({
      where: { id: createUltramsgDto.campania },
    });

    if (!campania) {
      throw new NotFoundException(
        `Campania with ID ${createUltramsgDto.campania} not found`
      );
    }

    const ultramsg = this.ultramsgRepository.create({
      ...createUltramsgDto,
      campania,
    });

    return await this.ultramsgRepository.save(ultramsg);
  }

  async findAll(): Promise<Ultramsg[]> {
    return await this.ultramsgRepository.find({ relations: ["campania"] });
  }

  async findOne(id: number): Promise<Ultramsg> {
    const ultramsg = await this.ultramsgRepository.findOne({
      where: { id },
      relations: ["campania"],
    });
    if (!ultramsg) {
      throw new NotFoundException(`Ultramsg with ID ${id} not found`);
    }
    return ultramsg;
  }

  async update(
    id: number,
    updateUltramsgDto: UpdateUltramsgDto
  ): Promise<Ultramsg> {
    const ultramsg = await this.findOne(id);
    Object.assign(ultramsg, updateUltramsgDto);
    return await this.ultramsgRepository.save(ultramsg);
  }

  async remove(id: number): Promise<void> {
    const ultramsg = await this.findOne(id);
    await this.ultramsgRepository.remove(ultramsg);
  }

  async findByCampania(campaniaId: number): Promise<Ultramsg[]> {
    const ultramsgList = await this.ultramsgRepository.find({
      where: { campania: { id: campaniaId } },
      relations: ['campania'],
    });
  
    if (ultramsgList.length === 0) {
      throw new NotFoundException(`No Ultramsg found for Campania ID ${campaniaId}`);
    }
  
    return ultramsgList;
  }
  
}
