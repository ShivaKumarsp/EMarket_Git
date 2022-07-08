import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDirectCartComponent } from './public-direct-cart.component';

describe('PublicDirectCartComponent', () => {
  let component: PublicDirectCartComponent;
  let fixture: ComponentFixture<PublicDirectCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicDirectCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicDirectCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
