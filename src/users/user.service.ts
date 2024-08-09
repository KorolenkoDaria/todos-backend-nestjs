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
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d'
        });

        return await this.userModel.findOneAndUpdate(newUser._id, { refreshToken, token }, { new: true })
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
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });

        return await this.userModel.findOneAndUpdate(
            isUser._id,
            { token, refreshToken },
            { new: true }
        );
    }

    async logout(logoutUserDto: LogoutUserDto): Promise<User> {
        const { email } = logoutUserDto
        return await this.userModel.findOneAndUpdate({ email }, { token: "", refreshToken: "" }, { new: true });

    }

    async refresh(refreshToken: string): Promise<{ token: string, refreshToken: string }> {
        const payload = await this.jwtService.verifyAsync(refreshToken);
        const user = await this.userModel.findById(payload.sub);

        if (!user || user.refreshToken !== refreshToken) {
            throw new HttpException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
        }

        const newAccessToken = await this.jwtService.signAsync({ sub: user._id, username: user.email });
        const newRefreshToken = await this.jwtService.signAsync({ sub: user._id, username: user.email }, {
            expiresIn: '7d',
        });

        await this.userModel.findByIdAndUpdate(user._id, { token: newAccessToken, refreshToken: newRefreshToken });

        return { token: newAccessToken, refreshToken: newRefreshToken };
    }

}




