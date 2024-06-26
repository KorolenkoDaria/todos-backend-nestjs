import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class createTodoDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    completed: boolean;
}