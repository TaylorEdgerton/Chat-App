import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { SocketService } from './services/socket.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MongodbService } from './services/mongodb.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewUserComponent,
    ChatUserComponent,
    AdminPanelComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SocketService, MongodbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
