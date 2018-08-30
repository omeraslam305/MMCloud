import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { debug } from 'util';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface DropDownVal {
  key: string;
  value: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource;
      displayedColumns = [];
      @ViewChild(MatSort) sort: MatSort;

      columnNames = [{
        id: "position",
        value: "No."

      }, {
        id: "name",
        value: "Name"
      },
      {
        id: "weight",
        value: "Weight"
      },
      {
        id: "symbol",
        value: "Symbol"
      }];

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
      }, 
      {
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

  constructor() { }

  newsTypeArray: DropDownVal[] = [];
  channelArray: DropDownVal[] = [];

  ngOnInit() {
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.createTable();
  }

  searchRecordForm = new FormGroup({
    MediaType: new FormControl(),
    NewsType: new FormControl(),
    ChannelType: new FormControl(),
    Sentiment : new FormControl(),
    Script : new FormControl(),
    Date: new FormControl(),
  });

  createTable() {
    let tableArr: PeriodicElement[] = [{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' }
    ];
    this.dataSource = new MatTableDataSource(tableArr);
    this.dataSource.sort = this.sort;
  }

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

}
