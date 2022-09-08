import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendortohubComponent } from './vendortohub.component';

describe('VendortohubComponent', () => {
  let component: VendortohubComponent;
  let fixture: ComponentFixture<VendortohubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendortohubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendortohubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
