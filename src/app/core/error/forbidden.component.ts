import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'forbidden',
    templateUrl: './forbidden.component.html',
    styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {
    constructor(private route: ActivatedRoute) {
    }
    errorStatus: string;
    errorMessage: string = "";
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.errorStatus = params['error'];
            if(this.errorStatus == undefined || ['401','403','404'].includes(this.errorStatus.toString()) == false)
                {this.errorStatus = '404';}


            switch (this.errorStatus) {
                case '403':
                    this.errorMessage = "Forbidden"
                    break;
                case '401':
                    this.errorMessage = `Unauthorized`;
                    break;
                case '404':
                default:
                    this.errorMessage = "Requested page not found"
                    break;
            }
        })
    }
}
