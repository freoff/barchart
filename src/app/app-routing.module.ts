import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarCahartComponent } from './components/bar-cahart/bar-cahart.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: BarCahartComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
