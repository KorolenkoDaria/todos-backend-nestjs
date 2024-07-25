import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTodoDto {
    @IsNotEmpty()
    @IsString()
    editTitle: string;

    @IsString()
    priority: string;
}