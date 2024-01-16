import { TestBed } from '@angular/core/testing';

import { RestaurantDataServiceService } from './restaurant-data-service.service';

describe('RestaurantDataServiceService', () => {
  let service: RestaurantDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
