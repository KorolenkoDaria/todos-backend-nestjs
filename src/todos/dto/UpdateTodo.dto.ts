import { IsNotEmpty, IsString, IsNumber, IsDate } from "class-validator";
import { Type } from 'class-transformer';
/* import { Transform } from 'class-transformer';
import * as moment from 'moment-timezone'; */
export class UpdateTodoDto {
    @IsNotEmpty()
    @IsString()
    editTitle: string;

    @IsNumber()
    priority: number;

    @IsDate()
    @Type(() => Date)
    updateDate: Date;
}