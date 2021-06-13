import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
    {path: '', component: HomeComponent },
    {
        path: 'cliente',
        loadChildren: () => import('./pages/cliente/cliente-listar/cliente-listar.module').then((modulo) => modulo.ClienteListarModule),
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
