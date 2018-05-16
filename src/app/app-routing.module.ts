import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './pages/home/home.component';
import {CollectionComponent} from './pages/collection/collection.component';
import {UploadComponent} from './pages/upload/upload.component';
import {UserRoomComponent} from './pages/user-room/user-room.component';
import {AuthGuard} from './shared/services/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'collection', component: CollectionComponent, canActivate: [AuthGuard]},
  { path: 'upload', component: UploadComponent},
  { path: 'profile-settings', component: UserRoomComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule {}
