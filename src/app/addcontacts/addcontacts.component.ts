import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-addcontacts',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './addcontacts.component.html',
  styleUrl: './addcontacts.component.css',
  providers: [ContactService]
})
export class AddcontactsComponent implements OnInit {

  contact: Contact = { firstName:'', lastName:'', emailAddress:'', phoneNumber:'', status:'', dob:'', imageName: '' };

  selectedFile: File | null = null;
  error = '';
  success = '';

  constructor(
    private contactService: ContactService,
    private http: HttpClient,
    private router: Router
  )
  {

  }

  ngOnInit(): void {
    
  }

  addContact(f: NgForm) {
    console.log("in addContact at top")
    this.resetAlerts();

    if (!this.contact.imageName) {
      this.contact.imageName = 'placeholder_100.jpg';
      console.log("in placeholder if")
    }
    console.log("after placeholder if")

    this.contactService.add(this.contact).subscribe(
      (res: Contact) => {
        this.success = 'Successfully created';
        console.log("in contactService.ad subscribe");

        if (this.selectedFile && this.contact.imageName != 'placeholder_100.jpg') {
          this.uploadFile();
        }

        f.reset();
        this.router.navigate(['/contacts']);
      },
      (err) => {
        this.error = err.error?.message || err.message || 'Error occurred';
      }
    )
  }

  resetAlerts(): void {
    this.error = '';
    this.success = '';
  }

  onFileSelected(event: Event): void {
    console.log("in onFileSelected")
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log("in if onFileSelected")
      this.selectedFile = input.files[0];
      this.contact.imageName = this.selectedFile.name;
    }
    console.log("after if in onFileSelected")
  }

  uploadFile(): void {
    console.log("before if in uploadFile")
    if (!this.selectedFile) {
      console.log("if in uploadFile")
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post('http://localhost/contactapi2026/upload', formData).subscribe(
      response => console.log('File uploaded successfully:', response),
      error => console.error('File upload failed:', error)
    );
  }

}
