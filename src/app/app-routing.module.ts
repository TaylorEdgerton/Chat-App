import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [{path: '',   component:LoginComponent},{path: "chatuser", component: ChatUserComponent},{path:"newuser", component: NewUserComponent}, {path:"adminPanel", component: AdminPanelComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
