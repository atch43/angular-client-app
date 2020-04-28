import { Directive, Output, Input, EventEmitter } from "@angular/core";
import { User } from "../users/shared/user";
import { DatePipe } from "@angular/common";

export type SortDirection = 'asc' | 'desc' | '';

const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0)
export function compareComplex(v1, v2, column) {
    if (column == "nominative") {
        return compare(v1.firstName + ' ' + v1.lastName, v2.firstName + ' ' + v2.lastName);
    } else
        if (column == "address") {
            return compare(v1.street + ' ' + v1.number, v2.street + ' ' + v2.number);
        }
        else{
            return compare(v1[column.toLowerCase()], v2[column.toLowerCase()]);
    }
}

export interface SortEvent {
    column: string;
    direction: SortDirection;
}

@Directive({
    selector: 'th[sortable]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    }
})

export class NgbdSortableHeader {

    @Input() sortable: string;
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();
    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    }
}
