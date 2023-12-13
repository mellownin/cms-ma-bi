import { TestBed } from '@angular/core/testing';

import { ParseCmsZipService } from './parse-cms-zip.service';

describe('ParseCmsZipService', () => {
  let service: ParseCmsZipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseCmsZipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
