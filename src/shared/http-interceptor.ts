import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class CustomHttpInterceptor implements HttpInterceptor {
	private _authorisation: string = environment.authorisationVariables.find(e => e.key === 'Auth')?.value || '';
	private _headers = new HttpHeaders({
		'Access-Control-Allow-Origin': environment.host,
		'Access-Control-Allow-Headers': environment.allowedHeaders,
		'Auth': this._authorisation
	});

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const request = req.clone({
			headers: this._headers
		});

		return next.handle(request);
	}
}
