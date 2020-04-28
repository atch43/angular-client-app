import { Component, Input, OnInit, Injectable, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../shared/custom-validator';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'user-form',
    templateUrl: `./user-form.component.html`

})


export class UserFormComponent implements OnInit {

    //#region declarations

    user: User;
    @Input()
    username: string;
    errorMessage = "";
    showError: boolean = false;
    userForm: FormGroup;
    showSpinner: boolean = false;

    //#endregion

    constructor(private authenticationService: AuthenticationService,
        private userService: UserService, private fb: FormBuilder, private datepipe: DatePipe, private router: Router) {
        this.initForm();
    }

    //#region checks

    checkDisabled() {
        return !this.userForm.valid;
    }
    isAdmin(): boolean {
        return this.authenticationService.isAdmin();
    }

    //#endregion

    //#region methods


    ngOnInit() {
        this.showSpinner = true;
        this.getUserApp(this.username)

    }

    getUserApp(username: string): void {
        this.userService.getUser(username).subscribe(
            (user) => this.fillForm(user),
            error => this.handleError(error));
    }
    onDateChange(event) {
        var birthday = +new Date(event);
        this.userForm.controls['age'].setValue(~~((Date.now() - birthday) / (31557600000)));
    }

    transformDate(date): string {
        return this.datepipe.transform(date, 'yyyy-MM-dd');
    }

    fillForm(user: User): void {

        let date = this.transformDate(user.dob);
        user.dob = date;

        this.userForm.patchValue(user);
        this.onDateChange(new Date(user.dob));

        this.showSpinner = false;
    }

    Reload() {
        this.showError = false;
        this.ngOnInit();
    }

    Submit() {
        this.showSpinner = true;
        var params = this.userForm.value;

        this.userService.updateUser(this.username, params).pipe(
            switchMap(res => {
                if (res)
                    return this.userService.getUser(this.username)
                return of(this.user);
            })
        ).subscribe(user => {
            this.user = user;
            this.showSpinner = false;
        }
            , error => this.handleError(error));

    }



    initForm() {
        this.userForm = this.fb.group({
            id: [{ value: 'Loading..', disabled: true }],
            firstName: [{ value: 'Loading..', disabled: false }, [Validators.required]],
            lastName: ['Loading..', [Validators.required]],
            username: [{ value: '', disabled: true }, [Validators.required]],
            dob: [{ value: 'Loading..', disabled: false }, [Validators.required]],
            age: [{ value: 'Loading..', disabled: true }],
            sex: ['Loading', [Validators.required]],
            telephone: ['Loading', [Validators.required, CustomValidator.phoneValidator]]
        });
    }


    handleError(error) {
        this.showSpinner = false;
        this.showError = true;
        switch (error.status) {
            case 400:
            case 401:
            case 403:
            case 404:
            case 405:
            case 500: this.errorMessage = "Something went wrong while fetching user."; break;
        }
        this.router.navigate(['/error', '404'])
        return Promise.resolve(error.message || error);
    }

    //#endregion

}