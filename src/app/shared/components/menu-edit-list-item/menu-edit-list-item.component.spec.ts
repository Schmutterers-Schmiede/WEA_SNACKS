import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEditListItemComponent } from './menu-edit-list-item.component';

describe('MenuEditListItemComponent', () => {
  let component: MenuEditListItemComponent;
  let fixture: ComponentFixture<MenuEditListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuEditListItemComponent]
    });
    fixture = TestBed.createComponent(MenuEditListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
