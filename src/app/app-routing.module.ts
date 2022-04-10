import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessRightErrorComponent } from './admin/access-right-error/access-right-error.component';

import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'accessRightError', component: AccessRightErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
