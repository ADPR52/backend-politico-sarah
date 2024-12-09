import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Survey } from "./entities/survey.entity";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { UpdateSurveyDto } from "./dto/update-survey.dto";

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyrepositiry: Repository<Survey>
  ) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const surveyData = {
      ...createSurveyDto,
      survey: JSON.parse(createSurveyDto.survey),
    };

    const nuwSurvey = this.surveyrepositiry.create(surveyData);
    return this.surveyrepositiry.save(nuwSurvey);
  }

  async findAll(): Promise<Survey[]> {
    return this.surveyrepositiry.find();
  }

  async findOne(id: number): Promise<Survey> {
    const survey = await this.surveyrepositiry.findOne({
      where: { id },
    });
    if (!survey) {
      throw new NotFoundException(`survey with id ${id} not found`);
    }
    return survey;
  }

  async update(id: number, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    const survey = await this.findOne(id);

    let existingSurveyJson;
    if (typeof survey.survey === "string") {
      existingSurveyJson = JSON.parse(survey.survey);
    } else {
      existingSurveyJson = survey.survey;
    }
    if (updateSurveyDto.survey) {
      const updatedSurveyJson = JSON.parse(updateSurveyDto.survey);
      const mergedSurveyJson = { ...existingSurveyJson, ...updatedSurveyJson };
      updateSurveyDto.survey = JSON.stringify(mergedSurveyJson);
    }

    Object.assign(survey, updateSurveyDto);
    return this.surveyrepositiry.save(survey);
  }

  async remove(id: number): Promise<Survey> {
    const survey = await this.findOne(id);
    return this.surveyrepositiry.remove(survey);
  }

  async findByCampania(campaniaId: number): Promise<Survey[]> {
    const surveys = await this.surveyrepositiry.find({
      where: { campania: campaniaId },
    });

    if (surveys.length === 0) {
      throw new NotFoundException(
        `No se encontraron encuestas para la campaña con ID ${campaniaId}`
      );
    }

    return surveys;
  }
}
