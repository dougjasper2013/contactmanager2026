import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Contact } from './contact';

@Injectable({
    providedIn: 'root',
})

export class ContactService {
    baseUrl = 'http://localhost/contactapi2026';

    constructor(private http: HttpClient)
    {
        // no statements required
    }

    getAll() {
        return this.http.get(`${this.baseUrl}/list`).pipe(
            map((res: any) => {
                return res['data'];
            })
        )
    }
}