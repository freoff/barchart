import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as c3 from 'c3';
import { ChartAPI, DataPoint } from 'c3';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
const FLOOR_PREFIX = 'floor';
const FLOOR_COLOR = '#000';
@Component({
  selector: 'app-bar-cahart',
  templateUrl: './bar-cahart.component.html',
  styleUrls: ['./bar-cahart.component.scss']
})
export class BarCahartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer', { read: ElementRef, static: true }) container: ElementRef<HTMLElement>;
  private chart: ChartAPI;
  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(0))
        .subscribe(ev => {
          console.log('resize');
          this.init();
        });
    });
  }

  ngAfterViewInit(): void {
    this.init();
  }

  init() {
    const maxHeight = Math.max();
    const visibleReserveHeight = 12;
    window['c'] = this.chart = c3.generate({
      bindto: this.container.nativeElement,
      data: {
        x: 'x',
        columns: [
          ['x', 200, 400, 600],
          ['r2', 200, 400, 500],
          ['r1', 200, 300, 400],
          ['r3', 200, 500, 600],
          ['floor1', 500, 300, 500],
          ['floor2', 300, 200, 800]
        ],
        color: (col, d: DataPoint) => {
          if (d.id?.startsWith(FLOOR_PREFIX)) {
            return FLOOR_COLOR;
          }
          return col;
        },
        types: {
          floor1: 'line',
          floor2: 'line'
        },
        classes: {
          floor1: 'reserveFloors',
          floor2: 'reserveFloors'
        },
        type: 'bar',
        groups: [['r3', 'FLd', 'r1', 'r2']],
        order: null,
        hide: []
      },
      point: {
        focus: {
          expand: {
            enabled: false
          }
        }
      },
      legend: {
        hide: ['floor1', 'floor2']
      },
      tooltip: {
        contents(
          data: DataPoint[],
          defaultTitleFormat: (...args: unknown[]) => unknown,
          defaultValueFormat: (...args: unknown[]) => unknown,
          color: (...args: unknown[]) => unknown
        ): string {
          const filteredData = data.filter(dp => !dp.id.startsWith(FLOOR_PREFIX));
          function ff(args) {
            console.log('value format', args);
          }
          return this.getTooltipContent(data, defaultTitleFormat, defaultValueFormat, (ff: string) =>
            ff.startsWith(FLOOR_PREFIX) ? '#000' : color(ff)
          );
          // return `
          //   <table class=" tooltip-reserves">
          //
          //       ${filteredData.map(dp => '<tr><td>' + dp.id + '</td> <td>' + dp.value  + '</td></tr>')}
          //   </table>
          // `;
        }
      }
    });
    const points = document.querySelectorAll('.c3-target-reserveFloors .c3-circles');
    console.log('points', points);
    points.forEach(point => {
      point.innerHTML = point.innerHTML
        .replace(/<circle/g, '<rect width="100" height="3" fill="#000"')
        .replace(/<\/circle>/g, '</rect>')
        .replace(/<\/circle>/g, '</rect>');

      point.querySelectorAll('rect').forEach(rect => {
        rect.setAttribute('x', rect.getAttribute('cx'));
        rect.setAttribute('y', rect.getAttribute('cy'));
      });
    });

    this.redraw();
  }
  redraw() {
    const width = this.lineWidth();
    const rects: NodeListOf<Element> = document.querySelectorAll('.c3-target-reserveFloors .c3-circles rect');
    rects.forEach(elem => {
      elem.setAttribute('width', width.toString());
      elem.setAttribute('x', (parseInt(elem.getAttribute('x'), 10) - width / 2).toString());
    });
    console.log(this.chart.internal.get);
  }

  lineWidth() {
    return (document.querySelector('.c3-chart-bars .c3-chart-bar .c3-bar') as SVGAElement).getBBox().width;
  }
}
