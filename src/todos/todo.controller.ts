import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { TodosService } from './todo.service';
import { Todo } from '../schemas/todo.schema';
import { createTodoDto } from './dto/createTodo.dto'

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService) { }

    @Post()
    @UsePipes(new ValidationPipe)
    createTodo(@Body() createTodoDto: createTodoDto) {
        console.log(createTodoDto);
        return this.todosService.createTodo(createTodoDto);
    }

    @Get()
    async findAll(): Promise<Todo[]> {
        return this.todosService.findAll();
    }
}
