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
import { UltramsgService } from "./ultramsg.service";
import { CreateUltramsgDto } from "./dto/create-ultramsg.dto";
import { UpdateUltramsgDto } from "./dto/update-ultramsg.dto";
import { AuthGuard } from "src/auth/auth.service";

@Controller("ultramsg")
export class UltramsgController {
  constructor(private readonly ultramsgService: UltramsgService) {}

  @UseGuards(AuthGuard)
  @Post("/create")
  create(@Body() createUltramsgDto: CreateUltramsgDto) {
    return this.ultramsgService.create(createUltramsgDto);
  }

  @UseGuards(AuthGuard)
  @Get("/get")
  findAll() {
    return this.ultramsgService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("/get-id/:id")
  findOne(@Param("id") id: string) {
    return this.ultramsgService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Get("/get-campania/:campaniaId")
  findByCampania(@Param("campaniaId") campaniaId: string) {
    return this.ultramsgService.findByCampania(+campaniaId);
  }

  @UseGuards(AuthGuard)
  @Patch("/update/:id")
  update(
    @Param("id") id: string,
    @Body() updateUltramsgDto: UpdateUltramsgDto
  ) {
    return this.ultramsgService.update(+id, updateUltramsgDto);
  }

  @UseGuards(AuthGuard)
  @Delete("/delete/:id")
  remove(@Param("id") id: string) {
    return this.ultramsgService.remove(+id);
  }
}
