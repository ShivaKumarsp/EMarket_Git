import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubManagerListComponent } from './hub-manager-list.component';

describe('HubManagerListComponent', () => {
  let component: HubManagerListComponent;
  let fixture: ComponentFixture<HubManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubManagerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
