import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { STATUS } from "@prisma/client";
import { STATUS_ORDERS } from "src/enum/orders.enum";

export class PaginationOrdersDto extends PaginationDto{
    @IsOptional()
    @IsString()
    @IsEnum(STATUS_ORDERS, {
        message: 'status variants are ' + STATUS_ORDERS.join(',')
    })
    status: STATUS

}