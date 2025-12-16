import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailesWorker } from './detailes-worker';

describe('DetailesWorker', () => {
  let component: DetailesWorker;
  let fixture: ComponentFixture<DetailesWorker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailesWorker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailesWorker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
