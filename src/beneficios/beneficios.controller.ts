import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from "@nestjs/common";
import { BeneficiosService } from "./beneficios.service";
import { CreateBeneficioDto } from "./dto/create-beneficio.dto";
import { UpdateBeneficioDto } from "./dto/update-beneficio.dto";
import { AuthGuard } from "src/auth/auth.service";

@Controller("benefits")
export class BeneficiosController {
  constructor(private readonly beneficiosService: BeneficiosService) {}

  @UseGuards(AuthGuard)
  @Post("/create")
  create(@Body() createBeneficioDto: CreateBeneficioDto) {
    return this.beneficiosService.create(createBeneficioDto);
  }

  @UseGuards(AuthGuard)
  @Get("/get")
  findAll() {
    return this.beneficiosService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("/get-id/:id")
  findOne(@Param("id") id: string) {
    return this.beneficiosService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch("/update/:id")
  update(
    @Param("id") id: string,
    @Body() updateBeneficioDto: UpdateBeneficioDto
  ) {
    return this.beneficiosService.update(+id, updateBeneficioDto);
  }

  @UseGuards(AuthGuard)
  @Get("/get-campania/:id")
  findByCampania(@Param("id") id: number) {
    return this.beneficiosService.findByCampania(id);
  }
}
