import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemfeaturesComponent } from './itemfeatures.component';

describe('ItemfeaturesComponent', () => {
  let component: ItemfeaturesComponent;
  let fixture: ComponentFixture<ItemfeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemfeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemfeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
