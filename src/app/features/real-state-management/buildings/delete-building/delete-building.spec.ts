import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBuilding } from './delete-building';

describe('DeleteBuilding', () => {
  let component: DeleteBuilding;
  let fixture: ComponentFixture<DeleteBuilding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBuilding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBuilding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
