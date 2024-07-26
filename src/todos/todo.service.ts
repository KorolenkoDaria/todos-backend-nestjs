import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';
import { CreateTodoDto } from './dto/CreateTodo.dto';
import { UpdateTodoDto } from './dto/UpdateTodo.dto';
import priorities from '../helpers/priorities';

@Injectable()
export class TodosService {
    constructor(
        @InjectModel(Todo.name) private todoModel: Model<TodoDocument>) { }

    async createTodo(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
        const newTodo = await new this.todoModel({ ...createTodoDto, owner: userId });
        return newTodo.save();
    }

    async getsTodos(criteria: string, userId: string): Promise<Todo[]> {
        console.log(criteria);
        const todos = await this.todoModel.find({ owner: userId }).sort({ [criteria]: 1 }).exec();
        const result = todos.map(todo => {
            return {
                ...todo.toObject(),
                priority: priorities[todo.priority]
            };
        });
        return result;
    }

    async deleteTodo(id: string) {
        return await this.todoModel.findByIdAndDelete(id).exec();
    }

    async toggleTodoStatus(id: string): Promise<Todo | null> {
        const todo = await this.todoModel.findById(id).exec();
        if (!todo) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
        todo.completed = !todo.completed;
        return todo.save();
    }
    async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
        const todo = await this.todoModel.findOneAndUpdate(
            { _id: id },
            { title: updateTodoDto.editTitle },
            { new: true }
        ).exec();
        if (!todo) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
        return todo;
    }
}

