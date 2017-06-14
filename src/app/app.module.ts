import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { config } from "./app.firebaseconfig";

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';

import { LoginPage } from "../pages/login/login";
import { ChatsPage } from "../pages/chats/chats";
import { ProfilePage } from "../pages/profile/profile";
import { GroupsPage } from "../pages/groups/groups";
import { SignupPage } from "../pages/signup/signup";
import { TabsPage } from "../pages/tabs/tabs";
import { TabsPageModule } from "../pages/tabs/tabs.module";
import { SignupPageModule } from "../pages/signup/signup.module";
import { LoginPageModule } from "../pages/login/login.module";

@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    GroupsPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    TabsPageModule,
    SignupPageModule,
    IonicModule.forRoot(MyApp, { tabsPlacement: "top" }),
    AngularFireModule.initializeApp(config),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ChatsPage,
    GroupsPage,
    ProfilePage,
    TabsPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    AuthProvider,
    UserProvider
  ]
})
export class AppModule { }
