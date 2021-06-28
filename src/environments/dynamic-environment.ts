import { KeyValue } from '@angular/common';

export class DynamicVariables {
	allowedHeaders: string = 'Allow,Server,X-Powered-BySet-,Cookie,Set-Cookie,Date,Content-Length';
	authorisationVariables: KeyValue<string, string>[] = [{ key: 'Auth', value: 'U0xEaFBLU0FQT2QwKlNET0RTKmEw' }];
}
