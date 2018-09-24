import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaReportsComponent } from './media-reports.component';

describe('MediaReportsComponent', () => {
  let component: MediaReportsComponent;
  let fixture: ComponentFixture<MediaReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
