import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCall } from './create-call';

describe('CreateCall', () => {
  let component: CreateCall;
  let fixture: ComponentFixture<CreateCall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCall]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCall);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
