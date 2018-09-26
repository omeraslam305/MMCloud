import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routes/routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialComponentsModule } from './modules/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApiService } from './services/api.service';
import { AuthGuard } from './services/auth.guard';
import { HelperService } from './services/helper.service';
import { SnakbarComponent } from './snakbar/snakbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddMediaNewsComponent } from './add-media-news/add-media-news.component';
import { MediaReportsComponent } from './media-reports/media-reports.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartModule } from 'angular-highcharts';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    PageNotFoundComponent,
    SnakbarComponent,
    DashboardComponent,
    AddMediaNewsComponent,
    MediaReportsComponent
    
  ],
  entryComponents: [
    SnakbarComponent
  ],
  imports: [
    BrowserModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    AmazingTimePickerModule,
    NgxDaterangepickerMd,
    ChartModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAEvOtY0iktyx73GGVSzr3c_O06G05dzIc'
    })

  ],
  providers: [ApiService, HelperService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
