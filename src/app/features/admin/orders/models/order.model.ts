import { Client } from "../../clients/models/client.model";
import { Item } from "../../items/models/item.model";

export interface Order{
  id: number,
  uniqueCode: string,
  date: Date ,
  status: string
  client: Client,
  items: Item[],
  total: number
}
