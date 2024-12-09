import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from 'src/auth/auth.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @UseGuards(AuthGuard)
  @Get('/get')
  findAll() {
    return this.eventsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/get-id/:id')
  findOne(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/update/:id')
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.eventsService.remove(id);
  }
}
