import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.scss']
})
export class D3ChartComponent implements OnInit {
  private svg!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private margin = { top: 20, right: 30, bottom: 40, left: 40 };
  private width = 960 - this.margin.left - this.margin.right;
  private height = 500 - this.margin.top - this.margin.bottom;
  
  private data: number[] = [30, 86, 168, 281, 303, 365];
  
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.createSvg();
    this.drawBars();
  }

  private createSvg(): void {
    this.svg = d3.select(this.elementRef.nativeElement)
      .select('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  private drawBars(): void {
    if (!this.svg) return; // Ensure svg is initialized

    const x = d3.scaleBand()
      .range([0, this.width])
      .padding(0.1);
    const y = d3.scaleLinear()
      .range([this.height, 0]);

    x.domain(this.data.map((_, i) => i.toString()));
    y.domain([0, d3.max(this.data) || 0]);

    this.svg.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (_, i) => x(i.toString()) || 0)
      .attr('y', d => y(d))
      .attr('width', x.bandwidth())
      .attr('height', d => this.height - y(d));
  }
}
