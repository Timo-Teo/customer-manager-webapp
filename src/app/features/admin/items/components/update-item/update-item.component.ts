import { Component, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Item } from "../../models/item.model";
import { ItemsService } from "../../services/items.service";
import { UpdateItemDto } from "../../dto/update-item.dto";

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.scss'
})
export class UpdateItemComponent implements OnInit{


  item: Item;
  formItem: FormGroup;

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private builder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.item = {} as Item;
    this.formItem = new FormGroup({});
    this.buildForm();
  }

  ngOnInit() {
    this.route.params.subscribe({
      next: (params) => {
        const id = params['id']
        if (id && isNaN(id)) {
          this.router.navigate(['/admin/items']).then();
          return
        }
        this.matchForm(id);
      }
    });
  }

  private buildForm() {
    this.formItem = this.builder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      uniqueCode: ['', Validators.required]
    });
  }

  private matchForm(id: number) {
    this.itemsService.findOne(id).subscribe({
      next: (item) => {
        console.log(item);
        this.nameField?.setValue(item.name);
        this.priceField?.setValue(item.price);
        this.stockField?.setValue(item.stock);
        this.uniqueCodeField?.setValue(item.uniqueCode);
        this.item = item;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  get nameField() {
    return this.formItem.get('name');
  }

  get priceField() {
    return this.formItem.get('price');
  }

  get stockField() {
    return this.formItem.get('stock');
  }

  get uniqueCodeField() {
    return this.formItem.get('uniqueCode');
  }


  onUpdate() {

    if (this.formItem.invalid) {
      return;
    }

    const item: UpdateItemDto = {
      id: this.item.id,
      name: this.nameField?.value,
      price: this.priceField?.value,
      stock: this.stockField?.value,
      uniqueCode: this.uniqueCodeField?.value
    }

    this.itemsService.update(item).subscribe({
      next: (item) => {
        console.log(item);
        this.router.navigate(['/admin/items']).then();
      },
      error: (error) => {
        console.error(error);
      }
    });

  }

}
