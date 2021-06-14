import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
    {path: '', component: HomeComponent },
    {
        path: 'cliente',
        loadChildren: () => import('./pages/cliente/cliente-listar/cliente-listar.module').then((modulo) => modulo.ClienteListarModule),
    },
    {
        path: 'cliente/form',
        loadChildren: () => import('./pages/cliente/cliente-form/cliente-form.module').then((modulo) => modulo.ClienteFormModule),
    },
    {
        path: 'cliente/form/:id',
        loadChildren: () => import('./pages/cliente/cliente-form/cliente-form.module').then((modulo) => modulo.ClienteFormModule),
    },
    {
        path: 'produto',
        loadChildren: () => import('./pages/produto/produto-listar/produto-listar.module').then((modulo) => modulo.ProdutoListarModule),
    },
    {
        path: 'produto/form',
        loadChildren: () => import('./pages/produto/produto-form/produto-form.module').then((modulo) => modulo.ProdutoFormModule),
    },
    {
        path: 'produto/form/:id',
        loadChildren: () => import('./pages/produto/produto-form/produto-form.module').then((modulo) => modulo.ProdutoFormModule),
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
