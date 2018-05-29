import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPermissionRouteGuardService } from '../core/providers/admin-permission-route-guard/admin-permission-route-guard.service';
import { HomeComponent } from '../../components/home/home.component';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { TodoEditComponent } from '../../components/todo-edit/todo-edit.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'todo', component: TodoListComponent },
  { path: 'todo/:taskId', component: TodoEditComponent, canActivate: [AdminPermissionRouteGuardService] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}) // important to use hash if the app has to work correctly on Peach platform!!!
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
