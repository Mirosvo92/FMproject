import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {firebaseConfig} from './shared/config/firebase';
import {HttpLoaderFactory} from './shared/config/httpLoaderFactory';
// components
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ChatComponent} from './chat/chat.component';
import {PageLinkComponent} from './header/page-link/page-link.component';
import {SearchComponent} from './header/search/search.component';
import {UserLinkComponent} from './header/user-link/user-link.component';
import {LanguageComponent} from './header/language/language.component';
import {PagesComponent} from './pages/pages.component';
import {HomeComponent} from './pages/home/home.component';
import {CollectionComponent} from './pages/collection/collection.component';
import {UploadComponent} from './pages/upload/upload.component';
import {SignInComponent} from './header/user-link/sign-in/sign-in.component';
// routing
import {AppRoutingModule} from './app-routing.module';
// directives
import {ShowDirective} from './shared/directives/show.directive';
import {HideDirective} from './shared/directives/hide.directive';
import {AnimateContentDirective} from './shared/directives/animateContent';
// services
import {LoginService} from './shared/services/login.servise';
import {ChatService} from './shared/services/chat.servise';
import {TracksService} from './shared/services/tracks.servise';
import {FavoriteService} from './shared/services/favorite.servise';
// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { UserListComponent } from './chat/user-list/user-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    PageLinkComponent,
    SearchComponent,
    UserLinkComponent,
    LanguageComponent,
    PagesComponent,
    HomeComponent,
    CollectionComponent,
    UploadComponent,
    ShowDirective,
    HideDirective,
    SignInComponent,
    UserListComponent,
    AnimateContentDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [LoginService, ChatService, TracksService, FavoriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
