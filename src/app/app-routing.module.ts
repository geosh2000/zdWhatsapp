import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { ZdWhatsappWindowComponent } from './zd-whatsapp-window/zd-whatsapp-window.component';


const routes: Routes = [
  { path: 'conversations', component: ConversationsComponent },
  { path: 'chat/:ticket', component: ChatWindowComponent },
  { path: 'whatsapp/:agentId', component: ZdWhatsappWindowComponent },
  { path: 'whatsapp/:agentId/:ticket', component: ZdWhatsappWindowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
