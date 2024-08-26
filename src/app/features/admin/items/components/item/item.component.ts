import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { Router } from "@angular/router";
import { ItemsService } from "../../services/items.service";
import { CreateItemDto } from "../../dto/create-item.dto";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {

  formItem: FormGroup

  constructor(private builder: FormBuilder,
              private itemsService: ItemsService,
              private router: Router) {
    this.formItem = new FormGroup({})
    this.buildForm()
  }

  buildForm() {
    this.formItem = this.builder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      uniqueCode: ['', Validators.required]
    })
  }

  get nameField() {
    return this.formItem.get('name')
  }

  get priceField() {
    return this.formItem.get('price')
  }

  get stockField() {
    return this.formItem.get('stock')
  }

  get uniqueCodeField() {
    return this.formItem.get('uniqueCode')
  }

  onCreate() {
    if (this.formItem.invalid) {
      return
    }

    const item: CreateItemDto = {
      price: this.priceField?.value,
      name: this.nameField?.value,
      stock: this.stockField?.value,
      uniqueCode: this.uniqueCodeField?.value
    }

    this.itemsService.create(item).subscribe({
      next: () => {
        this.router.navigate(['/admin/items']).then()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
