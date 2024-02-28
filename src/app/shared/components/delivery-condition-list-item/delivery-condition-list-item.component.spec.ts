import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryConditionListItemComponent } from './delivery-condition-list-item.component';

describe('DeliveryConditionListItemComponent', () => {
  let component: DeliveryConditionListItemComponent;
  let fixture: ComponentFixture<DeliveryConditionListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryConditionListItemComponent]
    });
    fixture = TestBed.createComponent(DeliveryConditionListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
