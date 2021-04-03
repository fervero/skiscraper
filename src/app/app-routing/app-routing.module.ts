import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ResortsComponent } from '../resorts/resorts.component';

const routes: Routes = [
  {
    path: 'resorts',
    component: ResortsComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/resorts',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
