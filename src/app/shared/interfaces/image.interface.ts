import { Flickr } from './flickr.interface';

export interface Image {
  photos: {
    photo: Flickr[];
  };
}

export interface Images {
  title: string;
  url: string;
  tag?: string;
}
