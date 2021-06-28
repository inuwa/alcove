import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AlcoveService } from './services/alcove.service';
import { User } from './user.interface';

@Injectable()
export class SignalrUserResolver implements Resolve<Observable<User[] | HttpErrorResponse>> {
	constructor(private _alcoveService: AlcoveService) { }
	resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this._alcoveService.getUsers();
	}
}
