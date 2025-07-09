import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTodos() {
    return this.appService.getTodos();
  }

  @Post()
  createTodo(@Body() data: { title: string; completed?: boolean }) {
    return this.appService.createTodo(data);
  }

  @Put(':id')
  updateTodo(
    @Param('id') id: number,
    @Body() data: { title?: string; completed?: boolean },
  ) {
    return this.appService.updateTodo(id, data);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.appService.deleteTodo(id);
  }
}
