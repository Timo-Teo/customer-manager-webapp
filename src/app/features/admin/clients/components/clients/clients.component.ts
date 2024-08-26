import { Component, OnInit, signal } from '@angular/core';
import { Client } from "../../models/client.model";
import { ClientsService } from "../../services/clients.service";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import { MatButton } from "@angular/material/button";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    RouterLink
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {

  clients: Client[]
  headers: String[]

  constructor(
    private clientsService: ClientsService,
    private router: Router
  ) {
    this.clients = []
    this.headers = ['name', 'lastname', 'actions']
  }

  ngOnInit() {
    this.clientsService.findAll().subscribe({
      next: (clients) => {
        console.log(clients);
        this.clients = clients;
      },
      error: (error) => {
        console.error(error);
      }
    });


  }

  onCreate(){
    this.router.navigate(['/admin/clients/create']).then()
  }

  onUpdate(client: Client) {
    this.router.navigate([`/admin/clients/${client.id}`]).then()
  }

  onDelete(client: Client) {
    this.clientsService.delete(client.id).subscribe({
      next: (response) => {
        console.log(response);
        this.clients = this.clients.filter(c => c.id !== client.id)
      },
      error: (error) => {
        console.error(error);
      }
    })

  }
}
