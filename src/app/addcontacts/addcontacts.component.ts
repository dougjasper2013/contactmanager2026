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
    this.resetAlerts();

    this.contactService.add(this.contact).subscribe(
      (res: Contact) => {
        this.success = 'Successfully created';

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

  }

  uploadFile(): void {
    
  }

}
