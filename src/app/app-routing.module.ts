import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importando as páginas
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MostruarioComponent } from './pages/mostruario.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redireciona para login por padrão
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'mostruario', component: MostruarioComponent },
  { path: '**', redirectTo: 'login' } // rota para páginas não encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
