import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-line-chart',
  templateUrl: './d3-line-chart.component.html',
  styleUrls: ['./d3-line-chart.component.scss']
})
export class D3LineChartComponent implements OnInit {
  private svg!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private margin = { top: 20, right: 30, bottom: 40, left: 40 };
  private width = 960 - this.margin.left - this.margin.right;
  private height = 500 - this.margin.top - this.margin.bottom;

  private data: number[] = [30, 86, 168, 281, 303, 365];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.createSvg();
    this.drawLine();
  }

  private createSvg(): void {
    this.svg = d3.select(this.elementRef.nativeElement)
      .select('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  private drawLine(): void {
    if (!this.svg) return; // Ensure svg is initialized

    const x = d3.scalePoint()
      .domain(this.data.map((_, i) => i.toString()))
      .range([0, this.width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data) || 0])
      .range([this.height, 0]);

    const line = d3.line<number>()
      .x((_, i) => x(i.toString())!)
      .y(d => y(d));

    this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', line);

    // Add dots for each data point
    this.svg.selectAll('.dot')
      .data(this.data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', (_, i) => x(i.toString())!)
      .attr('cy', d => y(d))
      .attr('r', 5);
  }
}