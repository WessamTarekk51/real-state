import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLand } from './delete-land';

describe('DeleteLand', () => {
  let component: DeleteLand;
  let fixture: ComponentFixture<DeleteLand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLand]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
