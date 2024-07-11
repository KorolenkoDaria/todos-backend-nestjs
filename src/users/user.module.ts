import * as dotenv from "dotenv";
dotenv.config();

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from '../schemas/user.schema';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

const { SECRET_KEY } = process.env;

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            global: true,
            secret: SECRET_KEY,
            signOptions: { expiresIn: '6h' },
        }),
    ],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UserModule { };
