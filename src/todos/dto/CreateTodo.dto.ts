import { IsNotEmpty, IsString, IsBoolean, IsNumber, IsDate } from "class-validator";
import { Type } from 'class-transformer';
import * as moment from 'moment-timezone';

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    completed: boolean;

    @IsDate()
    @Type(() => Date)
    addDate: Date;

    @IsDate()
    @Type(() => Date)
    updateDate: Date;

    @IsNotEmpty()
    @IsNumber()
    priority: number;
}