import { Routes } from '@angular/router';
import { BreweryListComponent } from './components/brewery-list/brewery-list.component';
import { BreweryDetailsComponent } from './components/brewery-details/brewery-details.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';

export const routes: Routes = [
  { path: '', component: BreweryListComponent },
  { path: 'details/:id', component: BreweryDetailsComponent },
  { path: 'favorites', component: FavoritesListComponent },
];
