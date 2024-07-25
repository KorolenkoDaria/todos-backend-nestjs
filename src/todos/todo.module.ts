
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from '../schemas/todo.schema';
import { TodosService } from './todo.service';
import { TodosController } from './todo.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema },])
    ],
    providers: [TodosService],
    controllers: [TodosController],
})
export class TodoModule { }
