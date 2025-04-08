import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './components/mapa/mapa.component';
import { UnidadesComponent } from './components/unidades/unidades.component';
import { PersonalComponent } from './components/personal/personal.component';

const routes: Routes = [
  { path: '', redirectTo: '/mapa', pathMatch: 'full' }, // Ruta inicial
  { path: 'mapa', component: MapaComponent },
  { path: 'unidades', component: UnidadesComponent },
  { path: 'personal', component: PersonalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
