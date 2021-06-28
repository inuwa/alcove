import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MainNavComponent } from './main-nav/main-nav.component';
import { SignalrApiComponent } from './signalr-api/signalr-api.component';
import { SignalrChatComponent } from './signalr-chat/signalr-chat.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { AlcoveService } from 'src/shared/services/alcove.service';
import { SignalrUserResolver } from '@shared/signalr-user.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CustomHttpInterceptor } from '@shared/http-interceptor';

@NgModule({
	declarations: [
		AppComponent,
		MainNavComponent,
		SignalrApiComponent,
		SignalrChatComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		LayoutModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatSelectModule,
		MatToolbarModule,
		MatSidenavModule
	],
	providers: [
		AlcoveService,
		SignalrUserResolver,
		{ provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
