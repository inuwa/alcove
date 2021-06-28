import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Endpoint } from '../endpoint.const';
import { User } from '../user.interface';
import {
	HubConnectionBuilder,
	HubConnectionState,
	HubConnection
} from '@microsoft/signalr';
import { KeyValue } from '@angular/common';
import { ChatMessage } from '@shared/chat-message.interface';

@Injectable()
export class AlcoveService {
	chatMessages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
	private _chatMessages: ChatMessage[] = [];
	private _url = Endpoint.CHAT_URL.concat(Endpoint.CHAT_HUB, this.createKeyValueString(environment.authorisationVariables));
	connection: HubConnection = new HubConnectionBuilder()
		.withUrl(this._url)
		.build();

	constructor(private _httpClient: HttpClient) { }

	getUsers(): Observable<User[] | HttpErrorResponse> {
		return this._httpClient.get<User[]>(Endpoint.ALCOVE_USERS_ALL).pipe(
			take(1),
			catchError(this._handleError)
		);
	}

	startChatConnection(): Observable<void | HttpErrorResponse> {
		return from(this.connection.start()).pipe(catchError(this._handleError));
	}

	sendMessage(user: string, message: string) {
		return from(this.connection.send('broadcastMessage', user, message)).pipe(
			catchError(this._handleError)
		);
	}

	onMessage() {
		this.connection.on('broadcastMessage', (sender: string, message: string) => {
			this._chatMessages.push({ sender, message });
			this.chatMessages$.next(this._chatMessages);
		});
	}

	private createKeyValueString(keyValuePairs: KeyValue<string, string>[]): string {
		const keyValueString = keyValuePairs.map((keyValuePair) => keyValuePair.key.concat('=', keyValuePair.value)).reduce((initialValue, currentValue) => {
			return initialValue.concat('&', currentValue);
		});

		return '?'.concat(keyValueString);
	}

	private _handleError(e: HttpErrorResponse) {
		return of(e);
	}
}
