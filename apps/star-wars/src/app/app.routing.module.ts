import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FilmListComponent } from './film-list/film-list.component';
import { FilmComponent } from './film/film.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterComponent } from './character/character.component';
import { HomeComponent } from './home/home.component';


export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: "film-list",
    component: FilmListComponent,
  }, {
    path: "film/:filmId",
    component: FilmComponent,
  }, {
    path: "character-list",
    component: CharacterListComponent,
  }, {
    path: "character/:characterId",
    component: CharacterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const ROUTER_COMPONENTS = [FilmListComponent, FilmComponent, CharacterListComponent, CharacterComponent, HomeComponent];
