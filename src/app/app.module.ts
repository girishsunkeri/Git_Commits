import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommitsComponent } from './commits/commits.component';
import { SingleCommitComponent } from './single-commit/single-commit.component';
import { CommitDetailComponent } from './commit-detail/commit-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CommitsComponent,
    SingleCommitComponent,
    CommitDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
