import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Importa o componente principal
import { AppComponent } from './app.component';

// Importa as páginas criadas
import { LoginComponent, } from "./pages/login/login.component";
import { cadastro } from "./pages/cadastro/cadastro.component";
import { Inicio } from "./pages/inicio/inicio.component";
import { Mostruario } from "./pages/mostruario/mostruario.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Cadastro,
    Inicio,
    Mostruario
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
