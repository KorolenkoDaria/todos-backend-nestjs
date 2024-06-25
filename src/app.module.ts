import { Module } from "@nestjs/common";
/* import { AppController } from "./app.controller";
import { AppService } from "./app.service"; */
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [MongooseModule.forRoot('mongodb+srv://Korolenko:l3iguC2LCPOUXNw2@cluster0.w3zl1n3.mongodb.net/db-todos?retryWrites=true&w=majority'),],

    /*     controllers: [AppController],
        providers: [AppService],
     */
})

export class AppModule { };
