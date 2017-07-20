import qs from 'query-string';
import React, {Component} from 'react';


export default class Video extends Component {
  

  static urlMap = new Map([
    ['youtube', 'http://www.youtube.com/embed/'],
    ['vimeo', 'http://player.vimeo.com/video/'],
    ['soundcloud', 'http://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/']
  ]);

  getIdFromVideoString =(vString)=> {
    const urlArr = vString.split('/');
    const idString = urlArr[urlArr.length - 1];
    const queryParams = qs.extract(vString);

    return (queryParams && qs.parse(queryParams).v) || idString || '';
  }

  render=()=> {
    const {service, video, ...htmlTags} = this.props;
    const src = `${Video.urlMap.get(service)}${this.getIdFromVideoString(video)}`;
    
    return (
      <iframe
        src={src}
        frameBorder='0'
        webkitAllowFullScreen
        mozallowfullscreen
        allowFullScreen
        {...htmlTags}
      />
    );
  }
}