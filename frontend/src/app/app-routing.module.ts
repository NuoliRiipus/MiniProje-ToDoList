import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnasayfaComponent } from './sayfalar/anasayfa/anasayfa.component';


const routes: Routes = [
  { path: '', component: AnasayfaComponent },
  { path: ':listeid', component: AnasayfaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
