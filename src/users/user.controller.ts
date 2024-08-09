import mongoose from 'mongoose';
import { Controller, Get, Post, Delete, Patch, Body, UsePipes, ValidationPipe, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '../schemas/user.schema';
import { AuthUserDto } from './dto/AuthUser.dto';
import { LogoutUserDto } from './dto/LogoutUser.dto';
/* import { AuthGuard } from './user.guard'; */

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('signup')
    @UsePipes(new ValidationPipe)
    async signUp(@Body() addUserDto: AuthUserDto) {
        return this.usersService.addNewUser(addUserDto);
    }

    @Post('signin')
    @UsePipes(new ValidationPipe)
    async signIn(@Body() authUserDto: AuthUserDto) {
        return this.usersService.login(authUserDto);
    }

    @Post('logout')
    @UsePipes(new ValidationPipe)
    async logOut(@Body() logoutUserDto: LogoutUserDto) {
        return this.usersService.logout(logoutUserDto);
    }

    @Post('refresh-token')
    @UsePipes(new ValidationPipe)
    async refreshToken(@Body() body: { refreshToken: string }) {
        return this.usersService.refresh(body.refreshToken);
    }


}
