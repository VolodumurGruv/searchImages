import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../interfaces/image.interface';
import { map } from 'rxjs/operators';
import { Flickr } from '../interfaces/flickr.interface';

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  constructor(private http: HttpClient) {}

  search(keyword: string): Observable<Image[]> {
    const URL: string =
      'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12`;

    return this.http.get<Image>(URL + params).pipe(
      map((res: Image) => {
        const urlArr: any = [];

        res.photos.photo.forEach((photo: Flickr) => {
          const photoObj = {
            url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
            title: photo.title,
          };

          urlArr.push(photoObj);
        });
        return urlArr;
      })
    );
  }
}
