import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateOutcomes } from './private-outcomes';

describe('PrivateOutcomes', () => {
  let component: PrivateOutcomes;
  let fixture: ComponentFixture<PrivateOutcomes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateOutcomes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateOutcomes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
