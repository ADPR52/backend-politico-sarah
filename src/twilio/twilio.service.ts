import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTwilioDto } from './dto/create-twilio.dto';
import { UpdateTwilioDto } from './dto/update-twilio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Twilio } from './entities/twilio.entity';
import { Campania } from 'src/campanias/entities/campania.entity';

@Injectable()
export class TwilioService {
  constructor(
    @InjectRepository(Twilio)
    private readonly twilioRepository: Repository<Twilio>,
    @InjectRepository(Campania)
    private readonly campaniaRepository: Repository<Campania>,
  ) {}

  async create(createTwilioDto: CreateTwilioDto): Promise<Twilio> {
    const campania = await this.campaniaRepository.findOne({
      where: { id: createTwilioDto.campania },
    });

    if (!campania) {
      throw new NotFoundException(`Campania with ID ${createTwilioDto.campania} not found`);
    }

    const twilio = this.twilioRepository.create({
      ...createTwilioDto,
      campania,
    });

    return await this.twilioRepository.save(twilio);
  }

  async findAll(): Promise<Twilio[]> {
    return await this.twilioRepository.find({ relations: ['campania'] });
  }

  async findOne(id: number): Promise<Twilio> {
    const twilio = await this.twilioRepository.findOne({
      where: { id },
      relations: ['campania'],
    });
    if (!twilio) {
      throw new NotFoundException(`Twilio with ID ${id} not found`);
    }
    return twilio;
  }

  async update(id: number, updateTwilioDto: UpdateTwilioDto): Promise<Twilio> {
    const twilio = await this.findOne(id);
    Object.assign(twilio, updateTwilioDto);
    return await this.twilioRepository.save(twilio);
  }

  async remove(id: number): Promise<void> {
    const twilio = await this.findOne(id);
    await this.twilioRepository.remove(twilio);
  }

  async findByCampaniaId(campaniaId: number): Promise<Twilio[]> {
    const twilios = await this.twilioRepository.find({
      where: { campania: { id: campaniaId } },
      relations: ['campania'],
    });

    if (!twilios || twilios.length === 0) {
      throw new NotFoundException(`No Twilio records found for Campania with ID ${campaniaId}`);
    }

    return twilios;
  }
}
