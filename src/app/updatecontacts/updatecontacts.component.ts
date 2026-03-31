import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatecontacts',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './updatecontacts.component.html',
  styleUrl: './updatecontacts.component.css',
  providers: [ContactService]
})
export class UpdatecontactsComponent implements OnInit {
  contactID: number=0;
  contact: Contact = { firstName:'', lastName:'', emailAddress:'', phoneNumber:'', status:'', dob:'' };

  error = '';
  success = '';
  maxDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private http: HttpClient,
    private router: Router
  )
  {

  }

  ngOnInit(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.maxDate = `${yyyy}-${mm}-${dd}`;

    this.contactID = +this.route.snapshot.paramMap.get('id')!;

    this.contactService.get(this.contactID).subscribe({
      next: (data: Contact) => {
        this.contact = data;
      },
      error: () => this.error = 'Error loading contact.'
    });
  }

  updateContact(form: NgForm)
  {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contact.emailAddress ?? '')) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    // Phone validation
    const phoneRegex = /^(\(\d{3}\)\s|\d{3}-)\d{3}-\d{4}$/;
    if (!phoneRegex.test(this.contact.phoneNumber ?? '')) {
      this.error = 'Please enter a valid phone number.';
      return;
    }

    if (form.invalid) {
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('contactID', this.contactID.toString());
    formData.append('firstName', this.contact.firstName || '');
    formData.append('lastName', this.contact.lastName || '');
    formData.append('emailAddress', this.contact.emailAddress || '');
    formData.append('phoneNumber', this.contact.phoneNumber || '');
    formData.append('status', this.contact.status || '');
    formData.append('dob', this.contact.dob || '');

    // Send request to update.php
    this.http.post('http://localhost/contactapi2026/update.php', formData).subscribe({
      next: () => {
        this.success = 'Contact updated successfully.';
        this.router.navigate(['/contacts']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 409) {
          this.error = err.error?.error || 'Duplicate entry detected.';
        }
        else {
          this.error = 'Update failed.';
        }
      }
    });

  }

}
