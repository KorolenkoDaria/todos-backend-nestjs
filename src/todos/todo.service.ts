import { Injectable } from '@nestjs/common';
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

    updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
        return this.todoModel.findByIdAndUpdate(
            id,
            updateTodoDto,
            { new: true }
        );
    }
}
