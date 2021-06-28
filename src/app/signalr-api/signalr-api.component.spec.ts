import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalrApiComponent } from './signalr-api.component';

describe('SignalrApiComponent', () => {
	let component: SignalrApiComponent;
	let fixture: ComponentFixture<SignalrApiComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SignalrApiComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SignalrApiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
