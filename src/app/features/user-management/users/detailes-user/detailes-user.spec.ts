import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailesUser } from './detailes-user';

describe('DetailesUser', () => {
  let component: DetailesUser;
  let fixture: ComponentFixture<DetailesUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailesUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailesUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
