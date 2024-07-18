import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../schemas/user.schema';
import { AddUserDto } from './dto/AddUser.dto';
import * as bcrypt from 'bcrypt';
/*import { UpdateTodoDto } from './dto/UpdateTodo.dto'; */

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService) { }

    async addNewUser(addUserDto: AddUserDto): Promise<User> {

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(addUserDto.password, saltRounds);

        console.log("hashedPassword =>", hashedPassword);

        const isUserExist = await this.userModel.findOne(addUserDto);
        if (isUserExist) {
            throw new HttpException("User is already exist", HttpStatus.CONFLICT);
        }
        const newUser = await new this.userModel({ email: addUserDto.email, password: hashedPassword }).save();

        const payload = { sub: newUser._id, username: newUser.email };
        const token = await this.jwtService.signAsync(payload);

        return await this.userModel.findOneAndUpdate(newUser._id, { token: token }, { new: true })
    }
}




