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
  hostLink: any;
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
      this.hostLink = this.apiService.END_POINT;
      this.userObj = this.helper.userObj;
           
    }

    this.apiService.isLoggedIn.subscribe((val) => {
      this.isLoggedIn$ = val;
    }, (err) => {});
    console.log("In header Login value : " + this.isLoggedIn$); 

    this.routeLinks = [
      {
        label: 'Home',
        link: './home'
      },
      {
        label: 'About Us',
        link: './aboutus'
      },
      {
        label: 'Contact Us',
        link: './contact'
      }
    ];

    this.userObj = this.helper.userObj;
    console.log(this.userObj);
    this.router.events.subscribe((res) => {
      this.activeLink = '.' + this.router.url;
    })
    console.log('link =', this.activeLink);
  }

  // Function for opening the login dialog

  // openLoginDialog() {
  //   this.dialog.open(LoginComponent, {
  //     height: '45%',
  //     width: '30%',
  //     data: { name: this.name, animal: this.animal }
  //   })
  //     .afterClosed()
  //     .subscribe(response => {

  //       if (response.success) {

  //         localStorage.setItem('userObj', JSON.stringify(response.data));
  //         this.helper.userObj = JSON.parse(localStorage.getItem('userObj'));
  //         this.userObj = this.helper.userObj;
  //         this.userType = this.helper.userObj.UserTypeId;
  //         this.hostLink = this.apiService.END_POINT;
  //         console.log('after login =', this.userObj);
  //         this.router.navigate(['home']);
  //       }
  //     });
  // }

  // // Function for opening signup dialog

  // openSingUpDialog() {
  //   this.dialog.open(SignupComponent, {
  //     height: '85%',
  //     width: '50%',
  //     data: { name: this.name, animal: this.animal }
  //   })
  //     .afterClosed()
  //     .subscribe(result => {
  //       console.log('Dialog result =', result);
  //     });
  // }

  logout() {
    localStorage.removeItem('userObj');
    // this.userType = 0;
    // this.userObj = null;
    // this.helper.userObj = null;
    this.apiService.logout();
    this.router.navigate(['home']);
  }
}
