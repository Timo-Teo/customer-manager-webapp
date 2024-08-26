import { ItemsOrdersDto } from "../../items/dto/items-orders.dto";

export interface CreateOrderDto {
  clientId: number,
  items: ItemsOrdersDto[]
}
