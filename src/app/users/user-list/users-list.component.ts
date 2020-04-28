import { Component, Input, OnInit, Injectable, ViewChild, AfterViewInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PagerService } from '../../shared/services/pager.service';
import { NgbdSortableHeader, SortEvent, compare, compareComplex } from '../../shared/sortable';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { Pager } from '../../shared/pager';

@Component({
    selector: 'users-list',
    templateUrl: `./users-list.component.html`,
    animations: [

        trigger('slideInOut', [
            state('0', style({ 'max-height': '0px', opacity: 0 })),
            state('1', style({ 'max-height': '*', opacity: 1 })),
            transition(':enter', animate('200ms ease-in-out')),
            transition('* => *', animate('200ms ease-in-out')),
        ])
    ]

})


export class UsersListComponent implements OnInit, OnDestroy {

    ngOnDestroy() {
        this.observables.forEach(element => {
            if (element)
                element.unsubscribe();
        });
    }

    constructor(
        private userService: UserService,
        private location: Location,
        private pagerService: PagerService,
        private router: Router
    ) {

        this.showSpinner = true;

    };


    observables: any[] = [];
    ngOnInit(): void {
        this.getAllUsers(1);
    }




    //#region declarations
    showSpinner: boolean = false;

    searchString: string;
    advancedSearch: boolean = false;
    searchId: string = "";
    searchUsername: string = "";
    searchNominative: string = "";
    sortField: string;
    sortAsc: boolean = true;

    pager: Pager = { currentPage: 0, endIndex: 0, endPage: 0, pageSize: 0, pages: [], startIndex: 0, startPage: 0, totalItems: 0, totalPages: 1 };
    pagedItems: User[];
    rows: number;
    currentPage: number = 1;

    params: any;
    action: number;

    showError: boolean = false;
    errorMessage: string;


    //#endregion

    //#region search

    searchAll(page: any) {
        this.showError = false;
        this.action = 0;
        this.params = {};
        if (this.searchString == undefined || this.searchString == "") {
            this.getAllUsers(page);
        }
        else {
            this.params.searchAll = this.searchString;
            this.observables[0] = this.userService.getUsersByKeyword(this.params, page)
                .subscribe((response: any) => {
                    this.pagedItems = response.list;
                    this.rows = response.nRows;
                    this.pager = this.pagerService.getPager(this.rows, page, response.perPage);
                    this.showSpinner = false;
                }, error => this.handleError(error));
        }
    }

    searchFields(page: any) {
        this.showError = false;
        this.action = 1;
        this.showSpinner = true;
        this.params = {};

        if (this.searchId != "" && this.searchId != undefined)
            this.params.id = this.searchId;
        if (this.searchUsername != "" && this.searchUsername != undefined)
            this.params.username = this.searchUsername;
        if (this.searchNominative != "" && this.searchNominative != undefined)
            this.params.nominative = this.searchNominative;
        if (this.sortAsc)
            this.params.sort = "ASC"
        else
            this.params.sort = "DESC"

        if (this.sortField == "" || this.sortField == undefined)
            this.sortField = "id";

        this.params.sortBy = this.sortField;


        this.observables[1] = this.userService.getUsersByKeyword(this.params, page)
            .subscribe((response: any) => {
                this.pagedItems = response.list;
                this.rows = response.nRows;
                this.pager = this.pagerService.getPager(this.rows, page, response.perPage);
                this.showSpinner = false;
            }, error => this.handleError(error));
    }

    getAllUsers(page: any) {
        this.showError = false;
        this.action = 2;
        this.observables[2] = this.userService.getUsers(page)
            .subscribe((response: any) => {
                this.pagedItems = response.list;
                this.rows = response.nRows;
                this.pager = this.pagerService.getPager(this.rows, page, response.perPage);
                this.showSpinner = false;
            }, error => this.handleError(error));
    }

    toggleSort() {
        if (this.sortAsc)
            return "../../assets/sortAsc.png";
        else
            return "../../assets/sortDesc.png";

    }

    Reload() {
        this.showError = false;
        this.ngOnInit();
    }

    handleError(error) {
        this.showSpinner = false;
        this.showError = true;
        switch (error.status) {
            case 400: ;
            case 401: ;
            case 403: ;
            case 404: ;
            case 405: ;
            case 500: this.errorMessage = "Something went wrong while loading users."; break;
        }
        return Promise.resolve(error.message || error);
    }
    //#endregion

    //#region events
    @ViewChild('pagerForm') pagerForm: NgForm;
    
    pageFocusOut() {
        if (this.pager.currentPage == null)
            this.pager.currentPage = this.currentPage;
    }

    changeSearchSort() {
        this.sortAsc = !this.sortAsc;
    }
    changeStatus(event) {
        this.advancedSearch = event.target.checked;
    }
    goToProfile(username: String) {
        this.router.navigate(['/profile/' + username]);
    }
    goBack(): void {
        this.location.back();
    }

    //#endregion

    //#region pagination

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        this.pager = this.pagerService.getPager(this.rows, page);
        this.currentPage = this.pager.currentPage;
        if (this.action == 0)
            this.searchAll(page);
        else if (this.action == 1)
            this.searchFields(page);
        else if (this.action == 2)
            this.getAllUsers(page);
    }
    //#endregion

    //#region local sort

    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    onSort({ column, direction }: SortEvent) {
        this.headers.forEach(header => {

            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        if (direction === '') {

        } else {

            this.pagedItems = this.pagedItems.sort((a, b) => {
                const res = compareComplex(a, b, column);
                return direction === 'asc' ? res : -res;
            });
        }
    }

    //#endregion



}