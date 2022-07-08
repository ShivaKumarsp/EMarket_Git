import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverLoginCreationComponent } from './deliver-login-creation.component';

describe('DeliverLoginCreationComponent', () => {
  let component: DeliverLoginCreationComponent;
  let fixture: ComponentFixture<DeliverLoginCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverLoginCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverLoginCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
