import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUpload } from './input-upload';

describe('InputUpload', () => {
  let component: InputUpload;
  let fixture: ComponentFixture<InputUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
