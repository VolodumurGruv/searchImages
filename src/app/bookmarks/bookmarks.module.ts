import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { BookmarksComponent } from './components/bookmarks.component';

@NgModule({
  declarations: [BookmarksComponent],
  imports: [
    CommonModule,
    BookmarksRoutingModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class BookmarksModule {}
