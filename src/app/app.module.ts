import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LoginService } from './login.service';
import { AuthenticationComponent } from './authentication/authentication.component';

const isIE = window.navigator.userAgent.indexOf('MSIE')>-1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MsalModule.forRoot(new PublicClientApplication(
      {
        auth:{
          clientId:'977e7d3b-d6af-4e9c-bcc4-c8bdaf310ec0',
          redirectUri:'http://localhost:4200',
          authority:'https://login.microsoftonline.com/34c25798-fa80-4e05-b8ee-454fec6f8be8'

        },
        cache:{
          cacheLocation:'localStorage',
          storeAuthStateInCookie:isIE
        }
      }
    ),
    {
      interactionType:InteractionType.Redirect,
      authRequest:{
        scopes:['user.read']
      }
    },
    {
      interactionType:InteractionType.Redirect,
      protectedResourceMap:new Map(
        [
         ['https://graph.microsoft.com/v1.0/me',['user.Read']]
        ]
      )

    })
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true
  },
  MsalGuard,LoginService
  ],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
