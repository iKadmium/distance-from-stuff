import { TestBed, inject } from '@angular/core/testing';

import { GoogleDistanceMatrixService } from './google-distance-matrix.service';

describe('GoogleDistanceMatrixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleDistanceMatrixService]
    });
  });

  it('should be created', inject([GoogleDistanceMatrixService], (service: GoogleDistanceMatrixService) => {
    expect(service).toBeTruthy();
  }));
});
