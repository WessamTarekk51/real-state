import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerColored } from './container-colored';

describe('ContainerColored', () => {
  let component: ContainerColored;
  let fixture: ComponentFixture<ContainerColored>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerColored]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerColored);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
