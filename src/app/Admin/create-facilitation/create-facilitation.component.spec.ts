import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFacilitationComponent } from './create-facilitation.component';

describe('CreateFacilitationComponent', () => {
  let component: CreateFacilitationComponent;
  let fixture: ComponentFixture<CreateFacilitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFacilitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFacilitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
