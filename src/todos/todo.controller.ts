import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';

@Controller('todos')
export class TodoController {
    private readonly logger = new Logger(TodoController.name);
    constructor(private readonly todoService: TodoService) { }

    @Post()
    async create(@Body() createTodoDto: { title: string, completed: boolean }): Promise<Todo> {
        this.logger.log('Creating a new todo');
        return this.todoService.create(createTodoDto);
    }

    @Get()
    async findAll(): Promise<Todo[]> {
        return this.todoService.findAll();
    }
}
