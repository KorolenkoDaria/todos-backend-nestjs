import { IsNotEmpty, IsString, IsBoolean, } from "class-validator";
import { IsCustomDateFormat } from "../validation/custom-date-format.decorator"

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    completed: boolean;

    @IsNotEmpty()
    @IsString()
    @IsCustomDateFormat('DD-MM-YYYY', { message: 'Date must be in the format DD-MM-YYYY' })
    addedDate: string
}