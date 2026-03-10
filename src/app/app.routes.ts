import { Routes } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { AddcontactsComponent } from './addcontacts/addcontacts.component';

export const routes: Routes = [
    { path: "contacts", component: ContactsComponent },
    { path: "add", component: AddcontactsComponent },
    { path: "**", redirectTo: "/contacts", pathMatch: "full" }
];
