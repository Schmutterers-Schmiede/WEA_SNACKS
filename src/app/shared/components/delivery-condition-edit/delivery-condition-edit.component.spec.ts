import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryConditionEditComponent } from './delivery-condition-edit.component';

describe('DeliveryConditionEditComponent', () => {
  let component: DeliveryConditionEditComponent;
  let fixture: ComponentFixture<DeliveryConditionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryConditionEditComponent]
    });
    fixture = TestBed.createComponent(DeliveryConditionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
