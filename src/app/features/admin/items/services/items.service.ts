import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { CreateItemDto } from "../dto/create-item.dto";
import { UpdateClientDto } from "../../clients/dto/update-client.dto";
import { Item } from "../models/item.model";
import { UpdateItemDto } from "../dto/update-item.dto";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  appUrl = `${environment.API_URL}/${environment.API_VERSION}/items`

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Item[]>(this.appUrl);
  }

  findOne(id: number) {
    return this.http.get<Item>(`${this.appUrl}/${id}`);
  }

  create(item: CreateItemDto) {
    return this.http.post<Item>(this.appUrl, item);
  }

  update(item: UpdateItemDto) {
    return this.http.put<Item>(`${this.appUrl}/${item.id}`, item);
  }

  delete(id: number) {
    return this.http.delete(`${this.appUrl}/${id}`);
  }
}
