
/**
 * {
 *  items:[
 *  {},{},{}
 * ]
 * }
 */

import { Type } from "class-transformer"
import { IsNumber, IsPositive } from "class-validator"

export class OrderItemDto {

    @IsPositive()
    @IsNumber()
    @Type(()=> Number)
    productId: number

    @IsPositive()
    @IsNumber()
    @Type(()=> Number)
    quantity: number

    @IsPositive()
    @IsNumber()
    @Type(()=> Number)
    price: number
}