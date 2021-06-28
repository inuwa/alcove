import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlcoveService } from 'src/shared/services/alcove.service';
import { User } from 'src/shared/user.interface';
import { UserFilter } from '@shared/user-filter.enum';
@Component({
	selector: 'signalr-api',
	templateUrl: './signalr-api.component.html',
	styleUrls: ['./signalr-api.component.scss']
})
export class SignalrApiComponent implements OnInit {
	_users: User[] = [];
	users: User[] = [];
	carer: UserFilter = UserFilter.CARER;
	allUsers: UserFilter = UserFilter.ALL_USERS;
	friendsAndFamily: UserFilter = UserFilter.FRIENDS_AND_FAMILY;

	constructor(private _alcoveService: AlcoveService, private _router: ActivatedRoute) { }

	ngOnInit(): void {
		this._users = (this._router.snapshot.data.users) ? this._router.snapshot.data.users as User[] : [];
		this.users = this._users.slice();
	}

	$$filter(filter: string) {
		switch (filter) {
			case UserFilter.ALL_USERS:
				this.users = this._users.slice();
				break;
			case UserFilter.CARER:
				this.users = this._users.filter((e) => e.isServiceUser);
				break;
			case UserFilter.FRIENDS_AND_FAMILY:
				this.users = this._users.filter((e) => e.isFF);
				break;
			default:
				break;
		}
	}

	getUsers(): Observable<User[]> {
		return this._alcoveService.getUsers().pipe(
			map((users: User[] | HttpErrorResponse) => {
				if (users instanceof HttpErrorResponse) return [];
				return users;
			})
		);
	}
}
