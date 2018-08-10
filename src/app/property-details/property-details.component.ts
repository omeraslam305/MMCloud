import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../services/api.service';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { Observable, Observer } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { SnakbarComponent } from '../snakbar/snakbar.component';

declare var google: any;
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  propertyDetails: any;
  id: any;
  hostLink: any;
  mapView: any;
  lat: any;
  lng: any;
  locationChosen = false;
  address = "";
  favChecked = false;
  message: any;
  activeImagePath: any;

  referProperty = {
    name: '',
    email: '',
    subject: '',
    url: ''
  }
  userObj: any;
  userType = 0;

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private mapsAPILoader: MapsAPILoader,
    public snackBar: MatSnackBar) { }

  // Getting the details of a property on init.

  ngOnInit() {
    if (localStorage.getItem('userObj')) {
      this.userObj = JSON.parse(localStorage.getItem('userObj'));
      this.userType = this.userObj.UserTypeId;
    }
    this.hostLink = this.apiService.END_POINT;
    this.id = this.route.snapshot.paramMap.get('id');

    this.apiService.propertyDetails(this.id)
      .subscribe(response => {
        var vm = this;
        vm.propertyDetails = response.data;

        vm.propertyDetails.FavouriteIds = [];

        console.log('property details =', vm.propertyDetails);
        vm.activeImagePath = vm.propertyDetails.AdMedia[0].ImagePath;

        vm.propertyDetails['FavouriteAds'].forEach(function (ad) {
          vm.propertyDetails['FavouriteIds'].push(ad.UserUserId);
        });
        vm.propertyDetails.FavouriteIds.forEach(function (id) {
          if (vm.userObj.UserId == id) {
            vm.favChecked = true;
          }
        })
        vm.locateOnMap(Number(vm.propertyDetails.Latitude), Number(vm.propertyDetails.Longitude));
      });

  }

  // Function for displaying the first image as active image

  displayImage(imgPath) {
    this.activeImagePath = imgPath;
  }

  // Function for getting the latitude and longitude

  getLatLang(address) {
    var vm = this;
    vm.mapsAPILoader.load().then(() => {
      var geocoder = new google.maps.Geocoder();
      if (geocoder) {
        geocoder.geocode({
          'address': address
        }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            vm.lng = results[0].geometry.viewport.b.b;
            vm.lat = results[0].geometry.viewport.f.f
            vm.locationChosen = true;
            console.log('address in google maps', results[0]);
          }
        });
      }
    });
  }

  // Locating the address on map

  locateOnMap(latitude, longitude) {
    var vm = this;
    vm.lat = latitude;
    vm.lng = longitude;
    vm.locationChosen = true;
  }

  // Function to mark the address on map when chosen manually

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }

  // Function to refer the property

  refer(data) {
    data.url = window.location.href;
    this.apiService.referProperty(data)
      .subscribe(response => {
        this.snackBar.openFromComponent(SnakbarComponent, {
          duration: 600,
        });
        console.log('response after refering =', response);
      })
    this.referProperty = {
      name: '',
      email: '',
      subject: '',
      url: ''
    }
  }

  // Function for toggling favorite checkbox

  toggleFav(obj) {
    console.log('fav val =', obj);
    let data = {
      AdID: this.propertyDetails.ID,
      Status: obj == true ? 1 : 0,
      UserID: this.userObj.UserId
    }
    console.log('data =', data);
    this.apiService.favoriteProperty(data).
      subscribe(response => {
        this.snackBar.openFromComponent(SnakbarComponent, {
          duration: 600,
        });
        console.log('response after favourite =', response);
      })
  }

  // Function for sending message to agent

  sendMessage(msg) {
    var vm = this;
    this.apiService.postMessageToUser(this.propertyDetails.AgentId, this.userObj.UserId, msg)
      .subscribe(response => {
        this.snackBar.openFromComponent(SnakbarComponent, {
          duration: 600,
        });
        console.log('response after sending message =', response);
      })
    vm.message = '';
  }

}
