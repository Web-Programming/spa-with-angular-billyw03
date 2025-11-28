import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyItem } from './property-item';

describe('PropertyItem', () => {
  let component: PropertyItem;
  let fixture: ComponentFixture<PropertyItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
