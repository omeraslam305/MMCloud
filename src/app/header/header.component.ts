import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HelperService } from '../services/helper.service';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  routeLinks: any[];
  activeLink = '';
  userObj: any;
  userType: any;
  isLoggedIn$: boolean = false;
  

  constructor(private router: Router,
    private dialog: MatDialog,
    private helper: HelperService,
    private route: ActivatedRoute,
    private apiService: ApiService) {   

  }

  ngOnInit() {
    if (localStorage.getItem('userObj')) {
      //alert(1);
      console.log("setting nav links");
      this.helper.userObj = JSON.parse(localStorage.getItem('userObj'));
      this.userType = this.helper.userObj.userType;
      this.userObj = this.helper.userObj;
           
    }

    this.apiService.isLoggedIn.subscribe((val) => {
      this.isLoggedIn$ = val || localStorage["userObj"] != null;
    }, (err) => {});
    console.log("In header Login value : " + this.isLoggedIn$); 

    this.routeLinks = [
      {
        label: 'Dashboard',
        link: './dashboard'
      },
      {
        label: 'Reports',
        link: './mediareports'
      }
    ];

    this.userObj = this.helper.userObj;
    console.log(this.userObj);
    this.router.events.subscribe((res) => {
      this.activeLink = '.' + this.router.url;
    })
    console.log('link =', this.activeLink);
  }

  logout() {
    localStorage.removeItem('userObj');
    // this.userType = 0;
    // this.userObj = null;
    // this.helper.userObj = null;
    this.apiService.logout();
    this.router.navigate(['home']);
  }
}
