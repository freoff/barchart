import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCahartComponent } from './bar-cahart.component';

describe('BarCahartComponent', () => {
  let component: BarCahartComponent;
  let fixture: ComponentFixture<BarCahartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarCahartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarCahartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
