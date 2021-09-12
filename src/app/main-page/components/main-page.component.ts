import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { Images } from 'src/app/shared/interfaces/image.interface';
import { FlickrService } from 'src/app/shared/services/flickr.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public images: Images[] = [];
  public data: Images[] = [];
  public page = 0;
  public size = 8;
  public keyword = new FormControl('');
  public tag = new FormControl('');
  public isLoading?: boolean;
  public mode: ProgressSpinnerMode = 'indeterminate';
  public color: ThemePalette = 'primary';

  constructor(private flickrService: FlickrService) {}

  ngOnInit() {}

  search() {
    const value = this.keyword.value.toLowerCase().trim();

    this.isLoading = true;

    if (value && value.length > 0) {
      this.flickrService.search(value).subscribe((res: any) => {
        this.images = res;
        this.getData({ pageIndex: this.page, pageSize: this.size });
        this.isLoading = false;
      });
    }
  }

  addToStorage(data: any) {
    let dataStorage: any = [];

    if (data && localStorage.getItem('data')) {
      let b = localStorage.getItem('data');

      if (b !== null) {
        let d = JSON.parse(b);

        if (this.tag.value) {
          data.tag = this.tag.value;
        }

        d.forEach((el: any) => {
          if (el.url !== data.url) {
            dataStorage.push(el);
          }
        });

        dataStorage.push(data);

        localStorage.setItem('data', JSON.stringify(dataStorage));

        this.tag.reset();
      }
    } else {
      if (this.tag.value) {
        data.tag = this.tag.value;
      }

      dataStorage.push(data);

      localStorage.setItem('data', JSON.stringify(dataStorage));

      this.tag.reset();
    }
  }

  // pagination
  getData(obj: any) {
    let index = 0;
    let startingIndex = obj.pageIndex * obj.pageSize;
    let endingIndex = startingIndex + obj.pageSize;
    this.data = this.images.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
}
