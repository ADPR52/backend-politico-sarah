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
import { GastosService } from "./gastos.service";
import { CreateGastoDto } from "./dto/create-gasto.dto";
import { UpdateGastoDto } from "./dto/update-gasto.dto";
import { AuthGuard } from "src/auth/auth.service";

@Controller("bills")
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @UseGuards(AuthGuard)
  @Post("/create")
  create(@Body() CreateGastoDto: CreateGastoDto) {
    return this.gastosService.create(CreateGastoDto);
  }

  @UseGuards(AuthGuard)
  @Get("/get")
  findAll() {
    return this.gastosService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("/get-id/:id")
  findOne(@Param("id") id: string) {
    return this.gastosService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch("/update/:id")
  update(@Param("id") id: string, @Body() UpdateGastoDto: UpdateGastoDto) {
    return this.gastosService.update(+id, UpdateGastoDto);
  }

  @UseGuards(AuthGuard)
  @Get("/get-by-campania/:campaniaId")
  findByCampania(@Param("campaniaId") campaniaId: number) {
    return this.gastosService.findByCampania(campaniaId);
  }

  // @UseGuards(AuthGuard)
  // @Delete('/delete/:id')
  // remove(@Param('id') id: string) {
  //   return this.gastosService.remove(+id);
  // }
}
