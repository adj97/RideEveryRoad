import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangetokenPageComponent } from './exchangetoken-page.component';

describe('ExchangetokenPageComponent', () => {
  let component: ExchangetokenPageComponent;
  let fixture: ComponentFixture<ExchangetokenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangetokenPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangetokenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
