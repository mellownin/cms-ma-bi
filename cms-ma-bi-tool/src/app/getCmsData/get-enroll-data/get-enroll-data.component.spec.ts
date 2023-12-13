import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEnrollDataComponent } from './get-enroll-data.component';

describe('GetEnrollDataComponent', () => {
  let component: GetEnrollDataComponent;
  let fixture: ComponentFixture<GetEnrollDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetEnrollDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetEnrollDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
