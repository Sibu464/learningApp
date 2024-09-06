import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileDetails } from 'src/app/models/FileDetails';
import { ImageServiceService } from 'src/app/services/image-service.service';
import { UploadService } from 'src/app/UploadService.service';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';


@Component({
  selector: 'app-imageform',
  templateUrl: './imageform.component.html',
  styleUrls: ['./imageform.component.css']
})
export class ImageformComponent  {

  selectedFile: File | null = null;
  name: string = '';
  userId:any = localStorage.getItem('auth-user.id')
  constructor(private uploadService: UploadService, private _location: Location) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }



  onUpload(): void {
    if (this.selectedFile) {
      this.uploadService.uploadImage('sample-name', this.selectedFile, this.userId)
        .subscribe(response => {
          console.log('Upload response:', response);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "File uploaded succesfully. Check url below",
            showConfirmButton: true,

            footer: `<a href=${response.url}>Image URL</a>`
          }).then((results)=>{
            if(results.isConfirmed)

            {
            this._location.back();
            }
          });


        }, error => {
          console.error('Upload error:', error,);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!, check error message below"+
             error.message,
          });
        });

    }
  }
}
