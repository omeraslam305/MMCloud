import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddMediaNewsComponent } from '../add-media-news/add-media-news.component';
import { MediaReportsComponent } from '../media-reports/media-reports.component';
import { PropertyDetailsComponent } from '../property-details/property-details.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuard } from '../services/auth.guard';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent 
    },
    {
        path: 'property/:id',
        component: PropertyDetailsComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'addmedianews',
        component: AddMediaNewsComponent
    },
    {
        path: 'mediareports',
        component: MediaReportsComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent

    }
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule { }