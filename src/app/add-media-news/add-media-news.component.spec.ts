import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMediaNewsComponent } from './add-media-news.component';

describe('AddMediaNewsComponent', () => {
  let component: AddMediaNewsComponent;
  let fixture: ComponentFixture<AddMediaNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMediaNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMediaNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
