import { Component, OnInit } from '@angular/core';
import { Images } from 'src/app/shared/interfaces/image.interface';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  public images: Images[] = [];

  constructor() {}

  ngOnInit() {
    const b = localStorage.getItem('data');
    if (b !== null) {
      this.images = JSON.parse(b);
    }
  }

  deleteImage(i: number) {
    let d = this.images.splice(i, 1);
    localStorage.setItem('data', JSON.stringify(d));

    console.log(d);
  }
}
