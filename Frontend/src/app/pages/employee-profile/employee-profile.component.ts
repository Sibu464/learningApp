import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ImageServiceService } from 'src/app/services/image-service.service'; // Import the service
import { FileDetails } from 'src/app/models/FileDetails';
import { UploadService } from 'src/app/UploadService.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ModuleServiceService } from'src/app/services/module-service.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
@Injectable({ providedIn: 'root'})
export class EmployeeProfileComponent implements OnInit {
  selectedFile: File | null = null;
  isLoggedIn = false;
  currentUser: any;
  // role: any;
  activeButton: string | undefined;
  imageUrl: any[] = [];
  // nameuser: string | null | undefined;
  file!: File;
  fileDetails!: FileDetails;
  files: Array<string> = [];
  name: string = '';
  profileImageUrl = sessionStorage.getItem('avatar')?.toString();
  imagedata: any;
  completedModules: any[] = [];
  userId:any; // Assume the logged-in user has ID 1 
  role:string="";
  Profile =  sessionStorage.getItem('avatar')?.toString();

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private imageService: ImageServiceService, // Inject the service
    // private fileUploadService: FileUploadService
    private uploadService: UploadService,
    private _location: Location,
    private moduleServiceService: ModuleServiceService
  ) {}

  ngOnInit(): void {
    this.userId=this.storageService.getUser().id;
    this.authService.authState.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (this.isLoggedIn) {
        this.currentUser = this.storageService.getUser(); // Assuming username is a property in the user object
        console.log(this.currentUser);
        this.profileImageUrl;
      }

      if(this.storageService.getUserRole()=="ROLE_EMPLOYEE"){
        this.role="Employee";
      }else{
        this.role="Employer";
      }
      this.currentUser=this.storageService.getUser();
  
      
    });

   /*  this.moduleServiceService.getCompletedModules(this.userId).subscribe((data) => {
      this.completedModules = data;
    }); */

    this.currentUser = this.storageService.getUser().username;

    this.loadProfileImage();
    // this.imageUrl = this.imageService.getImageByName(this.currentUser);

    console.log('image' + this.loadProfileImage());

    
  }


  // Method to load profile image
  loadProfileImage() {
    const profilepic = sessionStorage.getItem('avatar');
    return profilepic;
  }

  ondsileSelecteds(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const names = this.currentUser;
    if (this.selectedFile) {
      this.imageService.uploadImage(names, this.selectedFile).subscribe(
        (response) => {
          alert('Image uploaded successfully');
        },
        (error) => {
          console.error('Error uploading image', error);
        }
      );
    } else {
      console.error('Name or file is missing');
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onProfileIconClick() {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.router.navigate(['/signin']);
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Method to get an image by name
  getImage(name: string) {
    this.imageService.getImageByName(name).subscribe(
      (imageBlob) => {
        const url = URL.createObjectURL(imageBlob);
        console.log('Image URL:', url);
        // You can use this URL to display the image in your component
      },
      (error) => {
        console.error('Error fetching image', error);
      }
    );
  }

  // Method to update an image
  updateImage(id: string, name: string, url: string) {
    this.imageService.updateImage(id, name, url).subscribe(
      (response) => {
        console.log('Image updated successfully', response);
      },
      (error) => {
        console.error('Error updating image', error);
      }
    );
  }

  updateImages() {
    if (this.imagedata) {
      const id = this.imagedata.id;
      const name = this.imagedata.name;
      const url = this.selectedFile; // Update this based on your new image data

      this.imageService.updateImage(id, name, url).subscribe(
        (response) => {
          //this.storageService.saveUserImage(response.url)
          console.log('Image updated successfully', response);

          alert('Image updated successfully.' + response);
          this.loadProfileImage(); // Optionally reload image data after update
        },
        (error) => {
          console.error('Error updating image', error);
        }
      );
    } else {
      console.error('No image data to update');
      alert('No image data available to update.');
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.uploadService
        .uploadImage('sample-name', this.selectedFile, this.userId)
        .subscribe(
          (response) => {
            // console.log('Upload response:', response);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'File uploaded succesfully. Check url below to preview',
              imageUrl: response.url,
              footer: `<a href=${response.url}>Image Link</a>`,
            });

            /// Push the image URL to session storage
            this.saveImageUrl(response.url);
          },
          (error) => {
            console.error('Upload error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!, check error message below',
              footer: error.toString(),
            });
          }
        );
    }
  }

  

  saveImageUrl(url: string) {
    sessionStorage.setItem('avatar', url);
    window.location.reload();
  }
  
}
