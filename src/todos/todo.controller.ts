import mongoose from 'mongoose';
import { Controller, Get, Post, Delete, Patch, Body, UsePipes, ValidationPipe, Param, HttpException } from '@nestjs/common';
import { TodosService } from './todo.service';
import { Todo } from '../schemas/todo.schema';
import { CreateTodoDto } from './dto/CreateTodo.dto';
import { UpdateTodoDto } from './dto/UpdateTodo.dto';

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService) { }

    @Post()
    @UsePipes(new ValidationPipe)
    async createTodo(@Body() createTodoDto: CreateTodoDto) {
        console.log(createTodoDto);
        return this.todosService.createTodo(createTodoDto);
    }

    @Get()
    async find(): Promise<Todo[]> {
        return this.todosService.getsTodos();
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        console.log("mongoose.Types", mongoose.Types);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const deleteTodo = await this.todosService.deleteTodo(id);
        if (!deleteTodo) throw new HttpException('The task Not Found', 404);
        return { message: "The task deleted successfully!" };
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateTodo(
        @Param('id') id: string,
        @Body() updateTodoDto: UpdateTodoDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);

        const updatedTodo = await this.todosService.updateTodo(id, updateTodoDto);
        if (!updatedTodo) throw new HttpException('User Not Found', 404);
        return updatedTodo;
    }

}
