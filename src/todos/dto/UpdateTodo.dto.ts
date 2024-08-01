import { IsNotEmpty, IsString, IsNumber, IsDate } from "class-validator";
import { Transform } from 'class-transformer';
import * as moment from 'moment-timezone';
export class UpdateTodoDto {
    @IsNotEmpty()
    @IsString()
    editTitle: string;

    @IsNumber()
    priority: number;

    @Transform(({ value }) => moment.tz(value, 'DD-MM-YYYY', 'UTC').toDate())
    @IsDate()
    updateDate: Date;
}