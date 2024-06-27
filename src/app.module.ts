import * as dotenv from "dotenv";
dotenv.config();

import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todos/todo.module';

const { DB_HOST } = process.env;

@Module({
    imports: [
        MongooseModule.forRoot(DB_HOST),
        TodoModule
    ],
    controllers: [],
    providers: [],

})

export class AppModule { };
