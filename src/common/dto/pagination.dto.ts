import { Type } from "class-transformer";
import { IsEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";
export class PaginationDto{
    
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Type(()=> Number)
    page: number = 1;

    @IsPositive()
    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    limit: number = 10;
}