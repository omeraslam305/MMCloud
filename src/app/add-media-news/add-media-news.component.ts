import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { debug } from 'util';
import { AmazingTimePickerService } from 'amazing-time-picker';

export interface DropDownVal {
  key: string;
  value: string;
}

@Component({
  selector: 'app-add-media-news',
  templateUrl: './add-media-news.component.html',
  styleUrls: ['./add-media-news.component.css']
})
export class AddMediaNewsComponent implements OnInit {

  private config = { hour: 7, minute: 15, meriden: 'PM', format: 12 };

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

constructor(private router: Router,private atp: AmazingTimePickerService) { }

newsTypeArray: DropDownVal[] = [];
channelArray: DropDownVal[] = [];

  ngOnInit() {
  }

  addNewsForm = new FormGroup({
    MediaType: new FormControl(),
    NewsType: new FormControl(),
    ChannelType: new FormControl(),
    Sentiment : new FormControl(),
    Subject: new FormControl(),
    Script : new FormControl(),
    Date: new FormControl(),
    Time: new FormControl(),
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

submitForm(){
  debugger;
  let formData = {
      mediaType: this.addNewsForm.controls['MediaType'].value,
      newsType: this.addNewsForm.get('NewsType').value.key,
      channelType: this.addNewsForm.get('ChannelType').value.key,
      sentiment: this.addNewsForm.get('Sentiment').value,
      subject: this.addNewsForm.get('Subject').value,
      script: this.addNewsForm.get('Script').value,
      date: this.addNewsForm.get('Date').value,
      time: this.addNewsForm.get('Time').value
  }

  console.log(formData);
  this.router.navigate(['dashboard']);
}

}
