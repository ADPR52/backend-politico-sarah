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
import { CampaniasService } from "./campanias.service";
import { CreateCampaniaDto } from "./dto/create-campania.dto";
import { UpdateCampaniaDto } from "./dto/update-campania.dto";
import { AuthGuard } from "src/auth/auth.service";

@Controller("campanias")
export class CampaniasController {
  constructor(private readonly campaniasService: CampaniasService) {}

  @UseGuards(AuthGuard)
  @Post("/create")
  create(@Body() createCampaniaDto: CreateCampaniaDto) {
    return this.campaniasService.create(createCampaniaDto);
  }

  @UseGuards(AuthGuard)
  @Get("/get")
  findAll() {
    return this.campaniasService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("/get-id/:id")
  findOne(@Param("id") id: string) {
    return this.campaniasService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch("/update/:id")
  update(
    @Param("id") id: string,
    @Body() updateCampaniaDto: UpdateCampaniaDto
  ) {
    return this.campaniasService.update(+id, updateCampaniaDto);
  }

  @UseGuards(AuthGuard)
  @Delete("/delete/:id")
  remove(@Param("id") id: string) {
    return this.campaniasService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Get("/calendar")
  getCalendar() {
    return this.campaniasService.getCalendar();
  }
}
