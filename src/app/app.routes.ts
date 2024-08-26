import { Routes } from '@angular/router';
import { ClientsComponent } from "./features/admin/clients/components/clients/clients.component";
import { MainLayoutComponent } from "./shared/layouts/main-layout/main-layout.component";
import { ClientComponent } from "./features/admin/clients/components/client/client.component";
import UpdateCommandModule from "@angular/cli/src/commands/update/cli";
import { UpdateClientComponent } from "./features/admin/clients/components/update-client/update-client.component";
import { UpdateItemComponent } from "./features/admin/items/components/update-item/update-item.component";
import { ItemsComponent } from "./features/admin/items/components/items/items.component";
import { ItemComponent } from "./features/admin/items/components/item/item.component";
import { OrdersComponent } from "./features/admin/orders/components/orders/orders.component";
import { OrderComponent } from "./features/admin/orders/components/order/order.component";
import { UpdateOrderComponent } from "./features/admin/orders/components/update-order/update-order.component";
import { AdminHomeComponent } from "./features/admin/pages/admin-home/admin-home.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent
      },
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path: 'clients/create',
        component: ClientComponent,
      },{
      path: 'clients/:id',
      component: UpdateClientComponent
      },
      {
        path: 'items',
        component: ItemsComponent
      },
      {
        path: 'items/create',
        component: ItemComponent
      },
      {
        path: 'items/:id',
        component: UpdateItemComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'orders/create',
        component: OrderComponent
      },
      {
        path: 'orders/:id',
        component: UpdateOrderComponent
      }
    ]
  }
];
