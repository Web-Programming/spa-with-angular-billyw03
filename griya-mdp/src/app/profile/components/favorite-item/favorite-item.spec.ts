import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteItem } from './favorite-item';

describe('FavoriteItem', () => {
  let component: FavoriteItem;
  let fixture: ComponentFixture<FavoriteItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
