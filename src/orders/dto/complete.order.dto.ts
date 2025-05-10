import { IsString } from "class-validator";

export class CompleteOrderDto{
    @IsString()
    orderId:string;
    @IsString()
    stripeId: string;
    @IsString()
    stripeReceipt: string;
}
