import { TestBed } from '@angular/core/testing';

import { AlcoveService } from './alcove.service';

describe('AlcoveService', () => {
	let service: AlcoveService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AlcoveService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
