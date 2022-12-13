import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaItemComponent } from './social-media-item.component';

describe('SocialMediaItemComponent', () => {
  let component: SocialMediaItemComponent;
  let fixture: ComponentFixture<SocialMediaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
