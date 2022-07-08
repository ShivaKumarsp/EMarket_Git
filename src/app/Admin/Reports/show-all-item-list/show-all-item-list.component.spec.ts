import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllItemListComponent } from './show-all-item-list.component';

describe('ShowAllItemListComponent', () => {
  let component: ShowAllItemListComponent;
  let fixture: ComponentFixture<ShowAllItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
