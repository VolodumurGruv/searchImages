import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Images } from 'src/app/shared/interfaces/image.interface';
import { FlickrService } from 'src/app/shared/services/flickr.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public images: Images[] = [];
  public keyword = new FormControl('');

  constructor(private flickrService: FlickrService) {}

  ngOnInit(): void {}

  search() {
    const value = this.keyword.value.toLowerCase().trim();

    if (value && value.length > 0) {
      this.flickrService.search(value).subscribe((res: any) => {
        this.images = res;
        console.log(this.images[0].title);
      });
    }
  }

  addToStorage(data: any) {
    let dataStorage: any = [];

    if (data && localStorage.getItem('data')) {
      let b = localStorage.getItem('data');

      if (b !== null) {
        let d = JSON.parse(b);

        d.forEach((el: any) => dataStorage.push(el));

        dataStorage.push(data);

        localStorage.setItem('data', JSON.stringify(dataStorage));
      }
    } else {
      dataStorage.push(data);

      localStorage.setItem('data', JSON.stringify(dataStorage));
    }
  }
}
