import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListItemComponent } from './menu-list-item.component';

describe('MenuListItemComponent', () => {
  let component: MenuListItemComponent;
  let fixture: ComponentFixture<MenuListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuListItemComponent]
    });
    fixture = TestBed.createComponent(MenuListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
