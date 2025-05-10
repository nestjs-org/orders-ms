import { ArrayMinSize, IsArray, IsString  } from "class-validator";
import { OrderItemDto } from "./order.item.dto";
import { Type } from "class-transformer";
export class CreateOrderDto {
    @IsArray()
    @ArrayMinSize(1)
    @Type(()=> OrderItemDto)
    item: OrderItemDto[]
}
