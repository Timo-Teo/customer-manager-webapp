import { Component, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ClientsService } from "../../services/clients.service";
import {  Router } from "@angular/router";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import { CreateClientDto } from "../../dto/create-client.dto";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {

  formClient: FormGroup;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private builder: FormBuilder,
  ) {
    this.formClient = new FormGroup({});
    this.buildForm();
  }

  ngOnInit() {

  }

  private buildForm() {
    this.formClient = this.builder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required]
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

    const client: CreateClientDto = {
      name: this.nameField?.value,
      lastname: this.lastnameField?.value
    }

    this.clientsService.create(client).subscribe({
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
