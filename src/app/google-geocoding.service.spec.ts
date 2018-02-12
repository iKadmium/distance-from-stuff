import { TestBed, inject } from '@angular/core/testing';

import { GoogleGeocodingService } from './google-geocoding.service';

describe('GoogleGeocodingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleGeocodingService]
    });
  });

  it('should be created', inject([GoogleGeocodingService], (service: GoogleGeocodingService) => {
    expect(service).toBeTruthy();
  }));
});
