import { TestBed } from '@angular/core/testing';

import { RestaurantDataService } from './restaurant-data-service.service';

describe('RestaurantDataServiceService', () => {
  let service: RestaurantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
