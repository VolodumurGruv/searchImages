import { Component, Input, OnInit } from '@angular/core';
import { Images } from 'src/app/shared/interfaces/image.interface';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  public images: Images[] = [];
  public isImages?: any;

  constructor() {}

  ngOnInit() {
    const b = localStorage.getItem('data');

    if (b !== null) {
      this.images = JSON.parse(b);
      this.isImages = !!this.images.length;
    }
  }

  deleteImage(i: number) {
    this.images?.splice(i, 1);
    this.isImages = !!this.images.length;

    localStorage.setItem('data', JSON.stringify(this.images));
  }
}
