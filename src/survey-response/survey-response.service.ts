import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SurveyResponse } from "./entities/survey-response.entity";
import { CreateSurveyResponseDto } from "./dto/create-survey-response.dto";
import * as ExcelJS from "exceljs";

@Injectable()
export class SurveyResponseService {
  constructor(
    @InjectRepository(SurveyResponse)
    private readonly surveyResponseRepository: Repository<SurveyResponse>
  ) {}

  create(
    createSurveyResponseDto: CreateSurveyResponseDto
  ): Promise<SurveyResponse> {
    const newSurveyResponse = this.surveyResponseRepository.create(
      createSurveyResponseDto
    );
    return this.surveyResponseRepository.save(newSurveyResponse);
  }

  findAll(): Promise<SurveyResponse[]> {
    return this.surveyResponseRepository.find();
  }

  async findOne(id: number): Promise<SurveyResponse> {
    const surveyResponse = await this.surveyResponseRepository.findOne({
      where: { id },
    });

    if (!surveyResponse) {
      throw new NotFoundException(`SurveyResponse with id ${id} not found`);
    }

    return surveyResponse;
  }

  async findBySurveyId(surveyId: number): Promise<SurveyResponse[]> {
    return this.surveyResponseRepository.find({
      where: { survey_id: surveyId },
    });
  }

  async generateExcelBySurveyResponses(
    surveyResponses: SurveyResponse[]
  ): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
  
    for (const [index, response] of surveyResponses.entries()) {
      const worksheet = workbook.addWorksheet(`Response ${index + 1}`);
      const headerRow = worksheet.addRow(["Pregunta", "Respuesta"]);
      headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
      headerRow.alignment = { horizontal: "center" };
      const cellA1 = worksheet.getCell('A1');
      const cellB1 = worksheet.getCell('B1');
  
      cellA1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4F81BD" },
      };
  
      cellB1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4F81BD" },
      };
  
      for (const item of response.response) {
        const { question, answer } = item;
  
        if (typeof answer === "string" && answer.startsWith("data:image")) {
          const imageId = workbook.addImage({
            base64: answer,
            extension: "png",
          });
          const row = worksheet.addRow([question]);
          worksheet.addImage(imageId, {
            tl: { col: 1, row: row.number - 1 },
            ext: { width: 100, height: 50 },
          });
        } else {
          worksheet.addRow([question, answer]);
        }
      }
      worksheet.columns.forEach((column, index) => {
        if (index === 0 || index === 1) {
          column.width = 50;
        } else {
          const maxLength = column.values
            ? Math.max(
                ...column.values.map((val) =>
                  typeof val === "string" ? val.length : 15
                )
              )
            : 15;
  
          column.width = Math.max(maxLength + 5, 20);
        }
      });
      worksheet.eachRow({ includeEmpty: true }, (row) => {
        row.height = 20;
      });
      worksheet.eachRow({ includeEmpty: true }, (row) => {
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });
      const lastRowNumber = worksheet.lastRow ? worksheet.lastRow.number : 1;
      worksheet.addTable({
        name: `Table${index + 1}`,
        ref: `A1:B${lastRowNumber}`,
        headerRow: true,
        totalsRow: false,
        style: {
          theme: "TableStyleMedium9",
          showRowStripes: true,
        },
        columns: [
          { name: "Pregunta", filterButton: true },
          { name: "Respuesta", filterButton: true },
        ],
        rows: [],
      });
    }
  
    return workbook.xlsx.writeBuffer() as Promise<Buffer>;
  }
  
}
