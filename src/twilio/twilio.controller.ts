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
import { TwilioService } from "./twilio.service";
import { CreateTwilioDto } from "./dto/create-twilio.dto";
import { UpdateTwilioDto } from "./dto/update-twilio.dto";
import { AuthGuard } from "src/auth/auth.service";

@Controller("twilio")
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @UseGuards(AuthGuard)
  @Post("/create")
  create(@Body() createTwilioDto: CreateTwilioDto) {
    return this.twilioService.create(createTwilioDto);
  }

  @UseGuards(AuthGuard)
  @Get("/get")
  findAll() {
    return this.twilioService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("/get-id/:id")
  findOne(@Param("id") id: string) {
    return this.twilioService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch("/update/:id")
  update(@Param("id") id: string, @Body() updateTwilioDto: UpdateTwilioDto) {
    return this.twilioService.update(+id, updateTwilioDto);
  }

  @UseGuards(AuthGuard)
  @Delete("/delete/:id")
  remove(@Param("id") id: string) {
    return this.twilioService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Get("/get-campania-id/:campaniaId")
  getByCampaniaId(@Param("campaniaId") campaniaId: string) {
    return this.twilioService.findByCampaniaId(+campaniaId);
  }
}
