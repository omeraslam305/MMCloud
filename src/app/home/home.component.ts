import { Component, OnInit } from '@angular/core';
import { Property } from '../property';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User } from '../services/user';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  properties: Property[];
  agents: any;
  searchObj = {
    searchText: '',
    typeOfAccomodation: '',
    noOfBedRooms: '',
    squareFeet: '',
    adType: ''
  };
  apiCalled = false;
  userData : User;

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  // Getting the recent properties on init
  ngOnInit() {
    if(localStorage["userObj"] != null){
      this.router.navigate(['dashboard']);
    }
    this.apiCalled = false;

    // this.apiService.getAllProperties()
    //   .subscribe(response => {
    //     this.properties = response.data;

    //   });

    // this.apiService.getAgentList()
    //   .subscribe(response => {
    //     this.agents = response.data;
    //     console.log('agent list', this.agents);
    //   })
  }

  // Input fields

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
});

// Function for login

  login() {
      let loginData = {
          username: this.loginForm.controls['username'].value,
          password: this.loginForm.get('password').value
      }
      this.userData = {
        email: this.loginForm.controls['username'].value,
        password: this.loginForm.get('password').value
    }
      //implement login call
      console.log(this.userData);
      this.apiService.login('https://a20lhd1482.execute-api.us-east-2.amazonaws.com/prod', this.userData)
          .subscribe(response => {
            console.log('user data', response);
            if(response.success){
              localStorage.setItem("userObj",JSON.stringify(response.data[0]));
              this.apiService.loggedIn.next(true);
              this.router.navigate(['dashboard']);
            } else {
              alert("Email or password is incorrect");
            }
          });    
  }
}
