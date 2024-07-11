import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../schemas/user.schema';
import { AddUserDto } from './dto/AddUser.dto';
/*import { UpdateTodoDto } from './dto/UpdateTodo.dto'; */

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService) { }

    async addNewUser(addUserDto: AddUserDto): Promise<User> {
        const isUserExist = await this.userModel.findOne(addUserDto);
        if (isUserExist) {
            throw new HttpException("User is already exist", HttpStatus.CONFLICT);
        }
        const payload = { sub: addUserDto.password, username: addUserDto.email };
        const token = await this.jwtService.signAsync(payload);
        console.log(token);

        const newUser = await new this.userModel({ email: addUserDto.email, password: addUserDto.password, token: token }).save();

        return newUser
    }
}

