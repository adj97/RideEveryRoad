import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerDialog } from './spinner-dialog.component';

describe('SpinnerDialog', () => {
  let component: SpinnerDialog;
  let fixture: ComponentFixture<SpinnerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
