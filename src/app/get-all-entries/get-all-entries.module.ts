import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllEntriesComponent } from './get-all-entries.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UpdateComponent } from './update/update.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: GetAllEntriesComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GetAllEntriesComponent, UpdateComponent],
  exports: [RouterModule]
})
export class GetAllEntriesModule { }
