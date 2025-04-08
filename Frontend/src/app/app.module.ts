import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// Importa el componente MapaComponent como un standalone
import { MapaComponent } from './components/mapa/mapa.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UnidadesComponent } from './components/unidades/unidades.component';
import { PersonalComponent } from './components/personal/personal.component'; // Asegúrate de importar el componente

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    UnidadesComponent,
    PersonalComponent,
    // No es necesario declarar MapaComponent aquí, ya que es standalone
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MapaComponent // Aquí lo importamos para que pueda ser utilizado
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
