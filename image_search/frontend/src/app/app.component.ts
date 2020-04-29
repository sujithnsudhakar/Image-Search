import { Component } from '@angular/core';
import { UploadserviceService } from './uploadservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Image Search';
  constructor(private uploadservice:UploadserviceService){}
  upload(){
    this.uploadservice.uploadImage();
  }
}

