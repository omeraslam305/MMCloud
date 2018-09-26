import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';

export interface MediaNews {
  id: number;
  mediatype: string;
  newstype: string;
  channeltype : string;
  sentiment: string;
  dt: string;
}

export interface DropDownVal {
  key: string;
  value: string;
}

@Component({
  selector: 'app-media-reports',
  templateUrl: './media-reports.component.html',
  styleUrls: ['./media-reports.component.css']
})
export class MediaReportsComponent implements OnInit {
  mediaTypeChart; newsTypeChart; sentimentChart;
  dataSource;
      displayedColumns = [];
      selected: any;
      alwaysShowCalendars: boolean;
      showRangeLabelOnInput: boolean;
      keepCalendarOpeningWithRange: boolean; 

      newsType = [{
        id: "1",
        newsTypeName: "Tickers/Announcement",
        mediaTypeId: "1"
      }, 
      {
        id: "2",
        newsTypeName: "Rebuttals",
        mediaTypeId: "1"
      },
      {
        id: "3",
        newsTypeName: "News Report",
        mediaTypeId: "1"
      },
      {
        id: "4",
        newsTypeName: "Breaking News",
        mediaTypeId: "1"
      }, {
        id: "5",
        newsTypeName: "SOT/Beepers",
        mediaTypeId: "1"
      }, {
        id: "6",
        newsTypeName: "Tickers/Announcement",
        mediaTypeId: "2"

      }, {
        id: "7",
        newsTypeName: "Rebuttals",
        mediaTypeId: "2"
      },
      {
        id: "8",
        newsTypeName: "News Report",
        mediaTypeId: "2"
      },
      {
        id: "9",
        newsTypeName: "Breaking News",
        mediaTypeId: "2"
      }, {
        id: "10",
        newsTypeName: "SOT/Beepers",
        mediaTypeId: "2"
      }, {
        id: "11",
        newsTypeName: "News Report(KE Stance, Editorial, News Story)",
        mediaTypeId: "3"
      },
      {
        id: "12",
        newsTypeName: "Rebuttals",
        mediaTypeId: "3"
      }, {
        id: "13",
        newsTypeName: "Press Release",
        mediaTypeId: "3"

      }, {
        id: "14",
        newsTypeName: "Picture Release",
        mediaTypeId: "3"
      },
      {
        id: "15",
        newsTypeName: "LTE",
        mediaTypeId: "3"
      }];

      channels = [{
        id: "1",
        channelName: "Das Erste",
        mediaTypeId: "1"
      }, {
        id: "2",
        channelName: "Westdeutscher Rundfunk",
        mediaTypeId: "1"
      },
      {
        id: "3",
        channelName: "SWR Fernsehen",
        mediaTypeId: "1"
      },
      {
        id: "4",
        channelName: "SR Fernsehen",
        mediaTypeId: "1"
      }, {
        id: "5",
        channelName: "RBB Fernsehen",
        mediaTypeId: "1"
      }, {
        id: "6",
        channelName: "Deutschlandfunk",
        mediaTypeId: "2"

      }, {
        id: "7",
        channelName: "Bayerischer Rundfunk",
        mediaTypeId: "2"
      },
      {
        id: "8",
        channelName: "Hessischer Rundfunk",
        mediaTypeId: "2"
      },
      {
        id: "9",
        channelName: "Mitteldeutscher Rundfunk",
        mediaTypeId: "2"
      }, {
        id: "10",
        channelName: "Norddeutscher Rundfunk",
        mediaTypeId: "2"
      }, {
        id: "11",
        channelName: "Süddeutsche Zeitung",
        mediaTypeId: "3"
      },
      {
        id: "12",
        channelName: "Frankfurter Allgemeine Zeitung",
        mediaTypeId: "3"
      }, {
        id: "13",
        channelName: "Die Welt",
        mediaTypeId: "3"

      }, {
        id: "14",
        channelName: "Handelsblatt",
        mediaTypeId: "3"
      },
      {
        id: "15",
        channelName: "Der Tagesspiegel",
        mediaTypeId: "3"
      }];

  constructor(private router: Router, private apiService: ApiService) { }

  newsTypeArray: DropDownVal[] = [];
  channelArray: DropDownVal[] = [];

  ngOnInit() {
    this.alwaysShowCalendars = true;
    this.keepCalendarOpeningWithRange = true;
    this.showRangeLabelOnInput = true;
    this.selected = {startDate: moment().subtract(2, 'year'), endDate: moment()};
    this.search();
  }

  searchRecordForm = new FormGroup({
    MediaType: new FormControl(),
    NewsType: new FormControl(),
    ChannelType: new FormControl(),
    Sentiment : new FormControl(),
    Date: new FormControl(),
  });
  

  onMediaTypeChange(mediaTypeId) {
    console.log(mediaTypeId);
    this.newsTypeArray = [];
    this.channelArray = [];
    var that = this;

    var newsOptions = this.newsType.filter(function(el){ return el.mediaTypeId == mediaTypeId;});   
    newsOptions.forEach(function(el){
      that.newsTypeArray.push({key: el.id, value: el.newsTypeName});
    });

    var channelOptions = this.channels.filter(function(el){ return el.mediaTypeId == mediaTypeId;});   
    channelOptions.forEach(function(el){
      that.channelArray.push({key: el.id, value: el.channelName});
    });

    console.log(this.newsTypeArray);   
}

search(){
  let searchParams = {
      mediaTypeId: this.searchRecordForm.controls['MediaType'].value,
      newsTypeId: this.searchRecordForm.get('NewsType').value != null ? this.searchRecordForm.get('NewsType').value.key : "",
      channelId: this.searchRecordForm.get('ChannelType').value != null ? this.searchRecordForm.get('ChannelType').value.key : "",
      sentimentId: this.searchRecordForm.get('Sentiment').value,
      fromDate: this.selected != null ? this.selected.startDate.month() + 1 + "/" + this.selected.startDate.date() + "/" + this.selected.startDate.year().toString().substr(-2) : "",
      toDate: this.selected != null ? this.selected.endDate.month() + 1 + "/" + this.selected.endDate.date() + "/" + this.selected.endDate.year().toString().substr(-2)  : ""
  }

  // if(defaultCall){
  //   var dt = new Date();
  //   searchParams.fromDate = "1/1/17";
  //   searchParams.toDate = dt.getMonth() + "/" + dt.getDate() + "/" + dt.getFullYear().toString().substr(-2);
  // }
  
  console.log(searchParams);
  this.apiService.postData('https://6h8ekj594f.execute-api.us-east-2.amazonaws.com/prod',searchParams)
    .subscribe(response => {
      console.log(response);
      if(response.success){
        var that = this;
        var mediaData = [];
        mediaData.push({y: response.data.MediaType.TV, color: this.getColor()});
        mediaData.push({y: response.data.MediaType.Radio, color: this.getColor()});
        mediaData.push({y: response.data.MediaType.Print, color: this.getColor()});

        var sentimentData = [];
        sentimentData.push({y: response.data.SentimentType.Positive, color: this.getColor()});
        sentimentData.push({y: response.data.SentimentType.Neutral, color: this.getColor()});
        sentimentData.push({y: response.data.SentimentType.Negative, color: this.getColor()});

        var newsTypeData = [];
        var newsTypeCategory = [];

        response.data.NewsType.forEach(function(i){
          newsTypeData.push({y: i.count, color: that.getColor()})
        });

        response.data.NewsType.forEach(function(i){
          newsTypeCategory.push(i.newsType)
        });

        this.mediaTypeChart = new Chart({
          chart: {
            type: 'column',
            width: 900
          },
          title: {
            text: 'By Media Type'
          },
          subtitle: {
            text: 'On the basis of media records'
          },
          xAxis: {
            type: 'category',
            categories: [
                'TV',
                'Radio',
                'Print'
            ],
            crosshair: true,
            labels: {
              rotation: -45,
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
          },
          yAxis: {
            min: 0,
            title: {
                text: 'No. of records'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
          plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
          },
          credits: {
            enabled: false
          },
          series: [
            {
              name: 'Total',
              data: mediaData
            }
          ]
        });

        this.newsTypeChart = new Chart({
          chart: {
            type: 'column',
            width: 900
          },
          title: {
            text: 'By News Type'
          },
          subtitle: {
            text: 'On the basis of media records'
          },
          xAxis: {
            categories: newsTypeCategory,
            crosshair: true,
            labels: {
              rotation: -45,
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
          },
          yAxis: {
            min: 0,
            title: {
                text: 'No. of records'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
          plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
          },
          credits: {
            enabled: false
          },
          series: [
            {
              name: 'Total',
              data: newsTypeData
            }
          ]
        });

        this.sentimentChart = new Chart({
          chart: {
            type: 'column',
            width: 900
          },
          title: {
            text: 'By Sentiment Type'
          },
          subtitle: {
            text: 'On the basis of media records'
          },
          xAxis: {
            categories: [
                'Positive',
                'Neutral',
                'Negative'
            ],
            crosshair: true,
            labels: {
              rotation: -45,
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
          },
          yAxis: {
            min: 0,
            title: {
                text: 'No. of records'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
          plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
          },
          credits: {
            enabled: false
          },
          series: [
            {
              name: 'Total',
              data: sentimentData
            }
          ]
        });

        console.log(response.data);
      } else {
        alert("Records fetching failed");
      }
    },
      (error: Response) => {
        if (error.status === 400) {
          console.log('Bad request')
        } else {
          console.log(error);
        }
      })
}

  getColor() {
    return (
      "#" +
      Math.random()
        .toString(16)
        .slice(2, 8)
    );
  }

}
