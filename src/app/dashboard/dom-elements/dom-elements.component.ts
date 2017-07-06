import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dom-elements',
  templateUrl: './dom-elements.component.html',
  styleUrls: ['./dom-elements.component.scss'],
  providers: [DashboardService]
})
export class DomElementsComponent implements OnInit {
  timestamps: number[] = [];
  domElements: number[] = [];

  public lineChartLabels: Array<any> = [];

  constructor(private dashboardService: DashboardService) { }

  getTestResults() {
    this.dashboardService.getLoadTimes()
      .subscribe(res => {
        for (let test_result of res) {
          this.timestamps.push(test_result._source.date);
          this.domElements.push(test_result._source.domElements);
        }

        this.lineChartLabels = this.timestamps;
      });
  }

  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'DOM Elements',
      fontSize: 24
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        }
      }],
      yAxes: [{
        display: true,
        gridLines: {
          display: false,
        }
      }]
    }
  };

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(54,59,51,0.5)',
      borderColor: 'rgba(178,234,148,1)',
      pointBackgroundColor: 'rgba(217,95,14,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartData: Array<any> = [
    { data: this.domElements, label: 'domElements' }
  ];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  ngOnInit() {
    this.getTestResults();
  }

}
