import { STATUS } from "@prisma/client";

export interface OrderCreated {

        orderItems: {
            product_name: any;
            productId: number;
            quantity: number;
            price: number;
        }[];
        id: string;
        totalAmount: number;
        totalItems: number;
        paidAt: Date | null;
        status: STATUS
        paid: boolean;
        createAt: Date;
        updateAt: Date;
}

export interface orderPayment {
        id:number
        name: string;
        price: number;
        quantity:number;

}