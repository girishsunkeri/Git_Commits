import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitDetailComponent } from './commits/commit-detail/commit-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'commit/:id', component: CommitDetailComponent
  },
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
