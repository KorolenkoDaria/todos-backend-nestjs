import mongoose from 'mongoose';
import { Controller, Get, Post, Delete, Patch, Body, UsePipes, ValidationPipe, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '../schemas/user.schema';
import { AddUserDto } from './dto/AddUser.dto';
/* import { AuthGuard } from './user.guard'; */

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('signup')
    @UsePipes(new ValidationPipe)
    async signUp(@Body() addUserDto: AddUserDto) {
        return this.usersService.addNewUser(addUserDto);
    }
}
