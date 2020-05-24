import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as c3 from 'c3';
import { ChartAPI, DataPoint } from 'c3';
const FLOOR_PREFIX = 'FL';
const FLOOR_COLOR = '#000';
@Component({
  selector: 'app-bar-cahart',
  templateUrl: './bar-cahart.component.html',
  styleUrls: ['./bar-cahart.component.scss']
})
export class BarCahartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer', { read: ElementRef, static: true }) container: ElementRef<HTMLElement>;
  private chart: ChartAPI;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    window['c'] = c3.generate({
      bindto: this.container.nativeElement,
      data: {
        x: 'x',
        columns: [
          ['x', 200, 400, 600],
          ['r2', 200, 400, 500],
          ['FLd', 10, 10, 10],
          ['r1', 200, 300, 400],
          ['r3', 200, 500, 600],
          ['points', 500, 300, 500]
        ],
        color: (col, d: DataPoint) => {
          if (d.id?.startsWith(FLOOR_PREFIX)) {
            return FLOOR_COLOR;
          }
          return col;
        },
        types: {
          points: 'line'
        },
        classes: {
          points: 'reserveFloors'
        },
        type: 'bar',
        groups: [['r3', 'FLd', 'r1', 'r2']],
        order: null,
        hide: []
      }
    });
  }

  focus() {
    document.querySelector('c3-target-reserveFloors ');
  }
}

class Reserve {
  value: number;
  floor: number;
}
