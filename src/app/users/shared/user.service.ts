import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { Address } from '../../addresses/shared/address';
import { environment } from 'src/environments/environment';
import { Skill } from '../../skills/shared/skill';

@Injectable()
export class UserService {

    requestOptions = {
        headers: new HttpHeaders(environment.headers),
        observe: "response" as 'body',
    };
    getRequestOptions;

    constructor(private http: HttpClient) { }

    getUsers(page: number): Observable<User[]> {
        return this.http.get(environment.pagedUsersUrl + page, this.requestOptions).pipe(switchMap(res => of(res['body'] as User[])));
    }

    getUsernames(): Observable<User[]> {
        return this.http.get(environment.usersUrl + environment.usernames, this.requestOptions).pipe(switchMap(res => of(res['body'] as User[])));
    }

    getUsersByKeyword(searchParams: any, page: number): Observable<any> {
        this.getRequestOptions = {
            headers: new HttpHeaders(environment.headers),
            observe: "response" as 'body',
            params: searchParams
        };

        return this.http.get(environment.pagedUsersUrl + page, this.getRequestOptions).pipe(switchMap(res => of(res['body'] as User[])));
    }



    
    getUserAddresses(username: string): Observable<Address[]> {
        return this.http.get(environment.usersUrl + username + environment.addresses, this.requestOptions).pipe(switchMap(res => of(res['body'] as Address[])));
    }
    setResidence(username: string, id: number): Observable<number> {
        return this.http
            .post(environment.usersUrl + username + environment.addresses, id, { ... this.requestOptions }).pipe(
                switchMap(res => of(res['body'] as number))
            );
    }



    getUser(username: string): Observable<User> {
        return this.http.get(environment.usersUrl + username, this.requestOptions).pipe(switchMap(res => of(res['body'] as User)));
    }
    updateUser(username: string, map: any): Observable<number> {
        return this.http
            .post(environment.usersUrl + username, map, { ... this.requestOptions }).pipe(switchMap(res => of(res['body'] as number)));
    }



    getUserSkills(username: string): Observable<Skill[]> {
        return this.http.get(environment.usersUrl + username + environment.skills, this.requestOptions).pipe(switchMap(res => of(res['body'] as Skill[])));
    }
    
}