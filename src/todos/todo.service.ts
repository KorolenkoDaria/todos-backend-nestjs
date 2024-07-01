import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';
import { CreateTodoDto } from './dto/CreateTodo.dto';
import { UpdateTodoDto } from './dto/UpdateTodo.dto';

@Injectable()
export class TodosService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) { }

    createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        const newTodo = new this.todoModel(createTodoDto);
        return newTodo.save();
    }

    getsTodos(): Promise<Todo[]> {
        return this.todoModel.find().exec();
    }

    deleteTodo(id: string) {
        return this.todoModel.findByIdAndDelete(id).exec();
    }

    async toggleTodoStatus(id: string): Promise<Todo | null> {
        const todo = await this.todoModel.findById(id).exec();
        if (!todo) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
        todo.completed = !todo.completed;
        return todo.save();
    }
}

