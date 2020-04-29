import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadserviceService {
  constructor(private http: HttpClient) { }
  uploadImage(){
    console.log('uploadImage');
    return this.http.post('/fileupload',{});
  }
}
