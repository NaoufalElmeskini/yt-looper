import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {VideoReaderComponent} from "./video-reader/video-reader.component";


const routes: Routes = [
  {path: 'dashboard/:title', component: DashboardComponent},
  {path: 'video-reader/:videoUrl', component: VideoReaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
