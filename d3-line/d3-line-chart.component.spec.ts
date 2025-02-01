import { ComponentFixture, TestBed } from '@angular/core/testing';
import { D3LineChartComponent } from './d3-line-chart.component';

describe('D3LineChartComponent', () => {
  let component: D3LineChartComponent;
  let fixture: ComponentFixture<D3LineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3LineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});