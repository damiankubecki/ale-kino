import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDaysComponent } from './list-of-days.component';

describe('ListOfDaysComponent', () => {
  let component: ListOfDaysComponent;
  let fixture: ComponentFixture<ListOfDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
