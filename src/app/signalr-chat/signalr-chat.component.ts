import { Component, ComponentRef, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HubConnectionState } from '@microsoft/signalr';
import { ChatMessage } from '@shared/chat-message.interface';
import { AlcoveService } from '@shared/services/alcove.service';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { Sender } from './sender.enum';
@Component({
	selector: 'signalr-chat',
	templateUrl: './signalr-chat.component.html',
	styleUrls: ['./signalr-chat.component.scss']
})
export class SignalrChatComponent implements OnInit {
	classScope: SignalrChatComponent = this;
	chatMessages: ChatMessage[] = [{ sender: 'Sender', message: 'The Name' }];
	sender = Sender;
	loading$: Subject<boolean> = new Subject();
	loading: boolean = true;
	checkConnectionState$: Observable<number> = interval(1000).pipe(takeUntil(this.loading$));
	private _destroy$: Subject<boolean> = new Subject();
	@ViewChild('firstSender', { static: true, read: ElementRef }) firstSender!: ElementRef<HTMLInputElement>;
	@ViewChild('secondSender', { static: true, read: ElementRef }) secondSender!: ElementRef<HTMLInputElement>;

	constructor(private _alcoveService: AlcoveService) { }

	ngOnInit(): void {
		this._alcoveService.startChatConnection();
		this._checkConnectionState();
		this._getMessage();
	}

	ngOnDestroy() {
		this._destroy$.next(true);
		this._destroy$.unsubscribe();
	}

	$$send(sender: string) {
		switch (sender) {
			case this.sender.FIRST:
				this._sendMessage(this.sender.FIRST, this.firstSender.nativeElement.value);
				this.firstSender.nativeElement.value = '';
				break;
			case this.sender.SECOND:
				this._sendMessage(this.sender.SECOND, this.secondSender.nativeElement.value);
				this.secondSender.nativeElement.value = '';
				break;
			default:
				break;
		}
	}

	isSender(chatSentBy: string, receiver: string) {
		return chatSentBy === receiver;
	}

	private _checkConnectionState() {
		this.checkConnectionState$.subscribe(() => {
			console.log(this._alcoveService.connection.state);

			if (this._alcoveService.connection.state !== HubConnectionState.Connected) return;
			this.loading$.next(false);
			this.loading = false;
		})
	}

	private _getMessage() {
		this._alcoveService.onMessage();
		this._alcoveService.chatMessages$
			.pipe(takeUntil(this._destroy$))
			.subscribe((chatMessages: ChatMessage[]) => {
				this.chatMessages = chatMessages;
			});
	}

	private _sendMessage(sender: string, message: string) {
		if (!message || this.loading) return;
		this._alcoveService.sendMessage(sender, message)
			.pipe(takeUntil(this._destroy$))
			.subscribe();
	}
}
