import { TestBed } from '@angular/core/testing';

import { MenuDataServiceService } from './menu-data-service.service';

describe('MenuDataServiceService', () => {
  let service: MenuDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
