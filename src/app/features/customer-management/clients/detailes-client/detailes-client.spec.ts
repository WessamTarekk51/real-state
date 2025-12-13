import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailesClient } from './detailes-client';

describe('DetailesClient', () => {
  let component: DetailesClient;
  let fixture: ComponentFixture<DetailesClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailesClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailesClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
