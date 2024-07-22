import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../schemas/user.schema';
import { AuthUserDto } from './dto/AuthUser.dto';
import { LogoutUserDto } from "./dto/LogoutUser.dto"
import * as bcrypt from 'bcrypt';
/*import { UpdateTodoDto } from './dto/UpdateTodo.dto'; */

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService) { }

    async addNewUser(addUserDto: AuthUserDto): Promise<User> {
        const { email, password } = addUserDto
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(addUserDto.password, saltRounds);

        const isUserExist = await this.userModel.findOne({ email });
        if (isUserExist) {
            throw new HttpException("User is already exist", HttpStatus.CONFLICT);
        }
        const newUser = await new this.userModel({ email: addUserDto.email, password: hashedPassword }).save();

        const payload = { sub: newUser._id, username: newUser.email };
        const token = await this.jwtService.signAsync(payload);

        return await this.userModel.findOneAndUpdate(newUser._id, { token: token }, { new: true })
    }

    async login(authUserDto: AuthUserDto): Promise<User> {
        const { email } = authUserDto
        const isUser = await this.userModel.findOne({ email });

        if (!isUser) {
            throw new HttpException("Email or password is incorrect", HttpStatus.UNAUTHORIZED);
        }

        const passwordCompare = await bcrypt.compare(authUserDto.password, isUser.password);

        if (!passwordCompare) {
            throw new HttpException("Email or password is incorrect", HttpStatus.UNAUTHORIZED);
        }
        const payload = { sub: isUser._id, username: isUser.email };
        const token = await this.jwtService.signAsync(payload);

        return await this.userModel.findOneAndUpdate(isUser._id, { token: token }, { new: true })
    }

    async logout(logoutUserDto: LogoutUserDto): Promise<User> {
        const { email } = logoutUserDto
        return await this.userModel.findOneAndUpdate({ email }, { token: "" }, { new: true });

    }

}




