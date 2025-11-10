import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LokasiPerumahan } from './lokasi-perumahan';

describe('LokasiPerumahan', () => {
  let component: LokasiPerumahan;
  let fixture: ComponentFixture<LokasiPerumahan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LokasiPerumahan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LokasiPerumahan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
