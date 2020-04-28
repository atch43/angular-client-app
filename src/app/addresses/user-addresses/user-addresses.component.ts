import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Address } from '../shared/address';
import { UserService } from '../../users/shared/user.service';
import { compareComplex, NgbdSortableHeader, SortEvent } from '../../shared/sortable';

@Component({
    selector: 'user-addresses',
    templateUrl: `./user-addresses.component.html`
})


export class UserAddressesComponent implements OnInit {

    constructor(private userService: UserService) {
    }

    @Input()
    username: string;

    showError: boolean = false;
    errorMessage = "";
    addresses: Address[];

    ngOnInit() {
        this.userService.getUserAddresses(this.username).subscribe((addresses) => {
            this.addresses = addresses;
        }, error => this.handleError(error));
    }

    Reload() {
        this.showError = false;
        this.ngOnInit();
    }

    handleError(error) {
        this.showError = true;
        switch (error.status) {
            case 400: ;
            case 401: ;
            case 403: ;
            case 404: ;
            case 405: ;
            case 500: this.errorMessage = "Something went wrong while fetching user addresses."; break;
        }
        return Promise.resolve(error.message || error);
    }

    setResidence(id: number) {
        this.userService.setResidence(this.username, id).pipe(
            switchMap(res => {
                if (res)
                    return this.userService.getUserAddresses(this.username)
                return of(this.addresses);
            })
        ).subscribe((addresses) => {
            this.addresses = addresses;
        }, error => this.handleError(error));
    }

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

            this.addresses = this.addresses.sort((a, b) => {
                const res = compareComplex(a, b, column);
                return direction === 'asc' ? res : -res;
            });
        }
    }

    //#endregion



}