import { Module } from "@nestjs/common";
/* import { AppController } from "./app.controller";
import { AppService } from "./app.service"; */
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todos/todo.module'
@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://Korolenko:l3iguC2LCPOUXNw2@cluster0.w3zl1n3.mongodb.net/db-todos?retryWrites=true&w=majority'),
        TodoModule
    ],
    controllers: [],
    providers: [],

})

export class AppModule { };
