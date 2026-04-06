import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})

export class Auth {
    baseUrl = 'http://localhost/contactapi2026/';

    constructor(private http: HttpClient, private router: Router)
    {
        // no statements required
    }

    register(user: any) {
        return this.http.post<any>(`${this.baseUrl}register.php`, user);
    }

}