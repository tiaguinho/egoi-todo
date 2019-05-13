import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/todo' },
  { path: 'todo', loadChildren: './todo/todo.module#TodoModule' },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
