import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUnit } from './delete-unit';

describe('DeleteUnit', () => {
  let component: DeleteUnit;
  let fixture: ComponentFixture<DeleteUnit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUnit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUnit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
