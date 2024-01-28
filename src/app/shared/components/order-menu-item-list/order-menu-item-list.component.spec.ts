import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMenuItemListComponent } from './order-menu-item-list.component';

describe('OrderMenuItemListComponent', () => {
  let component: OrderMenuItemListComponent;
  let fixture: ComponentFixture<OrderMenuItemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderMenuItemListComponent]
    });
    fixture = TestBed.createComponent(OrderMenuItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
