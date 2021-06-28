import { DynamicVariables } from './dynamic-environment';

class environmentVariables extends DynamicVariables {
	production: boolean = true;
	host: string = '';
};

export const environment = new environmentVariables();
