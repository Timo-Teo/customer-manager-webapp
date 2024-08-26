import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Client } from "../models/client.model";
import { CreateClientDto } from "../dto/create-client.dto";
import { UpdateClientDto } from "../dto/update-client.dto";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  appUrl = `${ environment.API_URL }/${ environment.API_VERSION }/clients`

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Client[]>(this.appUrl);
  }

findOne(id: number) {
    return this.http.get<Client>(`${this.appUrl}/${id}`);
  }

create(client: CreateClientDto) {
    return this.http.post<Client>(this.appUrl, client);
  }

update(client: UpdateClientDto) {
    return this.http.put<Client>(`${this.appUrl}/${client.id}`, client);
  }

delete(id: number) {
    return this.http.delete(`${this.appUrl}/${id}`);
  }

}
