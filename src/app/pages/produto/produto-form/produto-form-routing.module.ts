import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoFormComponent } from './produto-form/produto-form.component';


const routes: Routes = [
    {path: '', component: ProdutoFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoFormRoutingModule { }
