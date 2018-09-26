import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { debug } from 'util';
import * as moment from 'moment';
import { ApiService } from '../services/api.service';

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
  dataSource;
      displayedColumns = [];
      @ViewChild(MatSort) sort: MatSort;

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
    
  }

  searchRecordForm = new FormGroup({
    MediaType: new FormControl(),
    NewsType: new FormControl(),
    ChannelType: new FormControl(),
    Sentiment : new FormControl(),
    Script : new FormControl(),
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
  debugger;
  let searchParams = {
      mediaTypeId: this.searchRecordForm.controls['MediaType'].value,
      newsTypeId: this.searchRecordForm.get('NewsType').value != null ? this.searchRecordForm.get('NewsType').value.key : "",
      channelId: this.searchRecordForm.get('ChannelType').value != null ? this.searchRecordForm.get('ChannelType').value.key : "",
      sentimentId: this.searchRecordForm.get('Sentiment').value,
      fromDate: this.selected != null ? this.selected.startDate.month() + 1 + "/" + this.selected.startDate.date() + "/" + this.selected.startDate.year().toString().substr(-2) : "",
      toDate: this.selected != null ? this.selected.endDate.month() + 1 + "/" + this.selected.endDate.date() + "/" + this.selected.endDate.year().toString().substr(-2)  : ""
  }
  
  console.log(searchParams);
  this.apiService.postData('https://6h8ekj594f.execute-api.us-east-2.amazonaws.com/prod',searchParams)
    .subscribe(response => {
      console.log(response);
      if(response.success){
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

}
