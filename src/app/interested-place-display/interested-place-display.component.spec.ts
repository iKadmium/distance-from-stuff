import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedPlaceDisplayComponent } from './interested-place-display.component';

describe('InterestedPlaceDisplayComponent', () => {
  let component: InterestedPlaceDisplayComponent;
  let fixture: ComponentFixture<InterestedPlaceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestedPlaceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedPlaceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
