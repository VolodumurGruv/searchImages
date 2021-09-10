import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlickrService } from './services/flickr.service';

@NgModule({
  imports: [HttpClientModule],
  // providers: [{ provide: FlickrService, useClass: FlickrService }],
})
export class SharedModule {}
