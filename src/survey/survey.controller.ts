import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { SurveyService } from "./survey.service";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { UpdateSurveyDto } from "./dto/update-survey.dto";
import { AuthGuard } from "src/auth/auth.service";

@Controller("survey")
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @UseGuards(AuthGuard)
  @Post("/create")
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.create(createSurveyDto);
  }

  @UseGuards(AuthGuard)
  @Get("/get")
  findAll() {
    return this.surveyService.findAll();
  }

  @Get("/get-id/:id")
  findOne(@Param("id") id: string) {
    return this.surveyService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch("/update/:id")
  update(@Param("id") id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveyService.update(+id, updateSurveyDto);
  }

  @UseGuards(AuthGuard)
  @Delete("/delete/:id")
  remove(@Param("id") id: string) {
    return this.surveyService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Get("/get-by-campania/:campaniaId")
  findByCampania(@Param("campaniaId") campaniaId: number) {
    return this.surveyService.findByCampania(campaniaId);
  }
}
