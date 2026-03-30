import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule} from '@angular/common/http';
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
  contactID: number;
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
  }
}
