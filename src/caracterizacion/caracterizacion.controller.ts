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
import { CaracterizacionService } from "./caracterizacion.service";
import { CreateCaracterizacionDto } from "./dto/create-caracterizacion.dto";
import { UpdateCaracterizacionDto } from "./dto/update-caracterizacion.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "src/auth/auth.service";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Controller("caracterizacion")
export class CaracterizacionController {
  constructor(
    private readonly caracterizacionService: CaracterizacionService
  ) {}

  // @UseGuards(AuthGuard)
  @Post("/create")
  create(@Body() createCaracterizacionDto: CreateCaracterizacionDto) {
    return this.caracterizacionService.create(createCaracterizacionDto);
  }

  @Post("/login")
  login(@Body() loginDto: LoginDto) {
    return this.caracterizacionService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get("/get")
  findAll() {
    return this.caracterizacionService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("/get-inactive")
  findAllInactive() {
    return this.caracterizacionService.findAllInactive();
  }

  // @UseGuards(AuthGuard)
  @Get("/get-id/:id")
  findOne(@Param("id") id: string) {
    return this.caracterizacionService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Get("/get-campania/:id")
  findByCampania(@Param("id") id: number) {
    return this.caracterizacionService.findByCampania(id);
  }

  @UseGuards(AuthGuard)
  @Get("/get-campania/get-user-inactive/:campaniaId")
  findInactiveUsersByCampania(@Param("campaniaId") campaniaId: number) {
    return this.caracterizacionService.findInactiveUsersByCampania(campaniaId);
  }

  @UseGuards(AuthGuard)
  @Patch("/update/:id")
  update(
    @Param("id") id: string,
    @Body() updateCaracterizacionDto: UpdateCaracterizacionDto
  ) {
    return this.caracterizacionService.update(+id, updateCaracterizacionDto);
  }

  // @UseGuards(AuthGuard)
  @Patch("/delete/:id")
  remove(@Param("id") id: string) {
    return this.caracterizacionService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Patch("/enable/:id")
  habilitar(@Param("id") id: string) {
    return this.caracterizacionService.habilitar(+id);
  }

  @UseGuards(AuthGuard)
  @Patch("/update-password/:id")
  updatePassword(
    @Param("id") id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.caracterizacionService.updatePassword(+id, updatePasswordDto);
  }
}
