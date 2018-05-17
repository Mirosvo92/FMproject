import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './pages/home/home.component';
import {CollectionComponent} from './pages/collection/collection.component';
import {UserRoomComponent} from './pages/user-room/user-room.component';
import {AuthGuard} from './shared/services/auth.guard';
import {FavoritesComponent} from './pages/favorites/favorites.component';
import {ArtistsComponent} from './pages/artists/artists.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'collection', component: CollectionComponent},
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
  { path: 'artists', component: ArtistsComponent},
  { path: 'profile-settings', component: UserRoomComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule {}
