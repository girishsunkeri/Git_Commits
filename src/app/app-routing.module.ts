import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitDetailComponent } from './commit-detail/commit-detail.component';
import { CommitsComponent } from './commits/commits.component';

const routes: Routes = [
  {
    path: 'commits', component: CommitsComponent
  },
  {
    path: 'commit/:id', component: CommitDetailComponent
  },
  {
    path: '', redirectTo: '/commits', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
