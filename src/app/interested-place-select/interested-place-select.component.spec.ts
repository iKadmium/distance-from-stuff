import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedPlaceSelectComponent } from './interested-place-select.component';

describe('InterestedPlaceSelectComponent', () => {
  let component: InterestedPlaceSelectComponent;
  let fixture: ComponentFixture<InterestedPlaceSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestedPlaceSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedPlaceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
