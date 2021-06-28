import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignalrUserResolver } from '@shared/signalr-user.resolver';
import { SignalrApiComponent } from './signalr-api/signalr-api.component';
import { SignalrChatComponent } from './signalr-chat/signalr-chat.component';

const routes: Routes = [
	{
		path: 'signalr-api', component: SignalrApiComponent,
		resolve: {
			users: SignalrUserResolver
		}
	},
	{ path: 'signalr-chat', component: SignalrChatComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
