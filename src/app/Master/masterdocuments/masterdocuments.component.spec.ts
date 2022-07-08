import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterdocumentsComponent } from './masterdocuments.component';

describe('MasterdocumentsComponent', () => {
  let component: MasterdocumentsComponent;
  let fixture: ComponentFixture<MasterdocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterdocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
