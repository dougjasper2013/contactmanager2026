import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-contacts',
  imports: [RouterModule, HttpClientModule, CommonModule],
  providers: [ContactService],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {

  title = "ContactManager2026";
  public contacts: Contact[] = [];
  contact: Contact = { firstName:'', lastName:'', emailAddress:'', phoneNumber:'', status:'', dob:'' };

  error = '';
  success = '';

  constructor(private contactService: ContactService, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getAll().subscribe(
      (data: Contact[]) => {
        this.contacts = data;
        this.success = 'successful list retrieval';
        console.log(this.success);
        console.log(this.contacts);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
