import { IsNotEmpty, IsString } from "class-validator";

export class CriteriaTodosDto {
    @IsNotEmpty()
    @IsString()
    criteria: string;
}