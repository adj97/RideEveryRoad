import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StravaInfoDialogComponent } from './stravainfo-dialog.component';

describe('StravaInfoDialogComponent', () => {
  let component: StravaInfoDialogComponent;
  let fixture: ComponentFixture<StravaInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StravaInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StravaInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
