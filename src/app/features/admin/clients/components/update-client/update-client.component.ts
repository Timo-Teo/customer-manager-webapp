import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { ClientsService } from "../../services/clients.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UpdateClientDto } from "../../dto/update-client.dto";
import { Client } from "../../models/client.model";

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.scss'
})
export class UpdateClientComponent implements OnInit{

  client: Client;
  formClient: FormGroup;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private builder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.client = {} as Client;
    this.formClient = new FormGroup({});
    this.buildForm();
  }

  ngOnInit() {
    this.route.params.subscribe({
      next: (params) => {
        const id = params['id']
        if (id && isNaN(id)) {
          this.router.navigate(['/admin/clients']).then();
          return
        }
        this.matchForm(id);
      }
    });
  }

  private buildForm() {
    this.formClient = this.builder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  private matchForm(id: number) {
    this.clientsService.findOne(id).subscribe({
      next: (client) => {
        console.log(client);
        this.nameField?.setValue(client.name);
        this.lastnameField?.setValue(client.lastname);
        this.client = client;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  get nameField() {
    return this.formClient.get('name');
  }

  get lastnameField() {
    return this.formClient.get('lastname');
  }

  onSubmit() {

    if (this.formClient.invalid) {
      return;
    }

    const client: UpdateClientDto = {
      id: this.client.id,
      name: this.nameField?.value,
      lastname: this.lastnameField?.value
    }

    this.clientsService.update(client).subscribe({
      next: (client) => {
        console.log(client);
        this.router.navigate(['/admin/clients']).then();
      },
      error: (error) => {
        console.error(error);
      }
    });

  }
}
