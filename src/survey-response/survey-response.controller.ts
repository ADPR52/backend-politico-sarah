import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { SurveyResponseService } from "./survey-response.service";
import { CreateSurveyResponseDto } from "./dto/create-survey-response.dto";
import { AuthGuard } from "src/auth/auth.service";

@Controller("survey-response")
export class SurveyResponseController {
  constructor(private readonly surveyResponseService: SurveyResponseService) {}

  @UseGuards(AuthGuard)
  @Post("/create")
  create(@Body() createSurveyResponseDto: CreateSurveyResponseDto) {
    return this.surveyResponseService.create(createSurveyResponseDto);
  }

  @UseGuards(AuthGuard)
  @Get("/get")
  findAll() {
    return this.surveyResponseService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("/get-id/:id")
  findOne(@Param("id") id: string) {
    return this.surveyResponseService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Get("/get-by-survey-id/:surveyId")
  findBySurveyId(@Param("surveyId") surveyId: string) {
    return this.surveyResponseService.findBySurveyId(+surveyId);
  }

  @UseGuards(AuthGuard)
  @Get("/generate-excel/:id")
  async generateExcelForSurvey(@Param("id") id: string, @Res() res: Response) {
    const surveyResponses = await this.surveyResponseService.findBySurveyId(
      +id
    );
    const excelBuffer =
      await this.surveyResponseService.generateExcelBySurveyResponses(
        surveyResponses
      );

    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename=survey_responses_${id}.xlsx`,
    });

    res.send(excelBuffer);
  }
}
