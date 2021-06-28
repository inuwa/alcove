import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalrChatComponent } from './signalr-chat.component';

describe('SignalrChatComponent', () => {
  let component: SignalrChatComponent;
  let fixture: ComponentFixture<SignalrChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignalrChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalrChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
