import { IsNotEmpty, IsString } from "class-validator";
import { IsCustomDateFormat } from "../validation/custom-date-format.decorator";

export class UpdateTodoDto {
    @IsNotEmpty()
    @IsString()
    editTitle: string;

    @IsString()
    priority: string;

    @IsNotEmpty()
    @IsString()
    @IsCustomDateFormat('DD-MM-YYYY', { message: 'Date must be in the format DD-MM-YYYY' })
    updateDate: string;
}