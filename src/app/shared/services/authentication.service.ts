import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {

    

    requestOptions = {
        headers: new HttpHeaders(environment.headers),
        observe: "response" as 'body',
    };


    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

    data: any;
    loginUser(model: any): Promise<any> {

        var data = {
            "username": model.username,
            "password": model.password
        }
        return this.http.post(environment.loginUrl, JSON.stringify(data), { ... this.requestOptions }).toPromise();
    }

    public isAuthenticated(): boolean {
        var currentUser = localStorage.getItem('currentUser');
        var token;

        if (currentUser != null) {
            try {
                token = JSON.parse(currentUser).token;
                return !this.jwtHelper.isTokenExpired(token);
            }
            catch (e) {
            }
        }
        else {
            return false;
        }
    }

    public isAdmin(): boolean {
        var currentUser = localStorage.getItem('currentUser');
        var token;
        var admin = false;
        var description: string;
        if (currentUser != null) {
            try {
                token = JSON.parse(currentUser).token;
                description = JSON.parse(currentUser).description;

                if (description == 'ADMIN')
                    admin = true;

                return !this.jwtHelper.isTokenExpired(token) && admin;
            }
            catch (e) {
                return false;
            }
        }
        else {
            return false;
        }
    }


    logout(): Observable<any> {
        return this.http.get(environment.logoutUrl);
    }

    getUsernameFromToken(): string {
        var currentUser = localStorage.getItem('currentUser');
        if (currentUser != null) {
            try {
                return JSON.parse(currentUser).username;
            }
            catch (e) {
            }
        }
    }

    getPrivilegeFromToken(): string {
        var currentUser = localStorage.getItem('currentUser');
        if (currentUser != null) {
            try {
                return  JSON.parse(currentUser).description;
            }
            catch (e) {
            }
        }
    }

    getToken(): string {
        var currentUser = localStorage.getItem('currentUser');
        if (currentUser != null) {
            try {
                return JSON.parse(currentUser).token;
            }
            catch (e) {
            }
        }
    }
}