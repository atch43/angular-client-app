import { Component, Input, OnInit, QueryList, ViewChildren, AfterViewInit, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Skill } from '../shared/skill';
import { UserService } from '../../users/shared/user.service';
import { compareComplex, NgbdSortableHeader, SortEvent } from '../../shared/sortable';
import Chart from 'node_modules/chart.js/dist/Chart.js';
import { User } from '../../users/shared/user';

@Component({
    selector: 'user-skills',
    templateUrl: `./user-skills.component.html`
})

 

export class UserSkillsComponent implements OnInit  {
    constructor(private userService: UserService) {
    }

    @Input()
    username: string;
    selectedUser: string;
    chartLabels: string[];
    
    showError: boolean = false;
    errorMessage = "";

    skills: Skill[];
    mainDataset: any;

    ngOnInit() {
        this.userService.getUserSkills(this.username).subscribe((skills) => {
            this.skills = skills;

            this.mainDataset = {
                label: this.username,
                backgroundColor: "transparent",
                borderColor: "rgba(200,0,0,0.6)",
                fill: false,
                radius: 6,
                pointRadius: 6,
                pointBorderWidth: 3,
                pointBackgroundColor: "orange",
                pointBorderColor: "rgba(200,0,0,0.6)",
                pointHoverRadius: 10,
                pointLabels: ['a','b','a','b','a','b','a'],
                data: this.skills.map(function(a) {return a.value;})
              };
              

            this.createChart([this.mainDataset]);

        }, error => this.handleError(error));
        this.getUsers();
    }
    Reload() {
        this.showError = false;
        this.ngOnInit();
    }

    users:any;

    getUsers(){
        return this.userService.getUsernames().subscribe(users=>{
            this.users = users.filter(e=>e.username != this.username);
        });
    }

    handleError(error) {
        this.showError = true;
        switch (error.status) {
            case 400: ;
            case 401: ;
            case 403: ;
            case 404: ;
            case 405: ;
            case 500: this.errorMessage = "Something went wrong while fetching user skills."; break;
        }
        return Promise.resolve(error.message || error);
    }
  

    //#endregion
    marksData: any;
    compareTo(username: string){
        this.userService.getUserSkills(username).subscribe(skills =>{
            let datasets = [this.mainDataset];
            datasets.push(
                {
                    label: username,
                    backgroundColor: "transparent",
                    borderColor: "rgba(200,100,0,0.6)",
                    fill: false,
                    radius: 6,
                    pointRadius: 6,
                    pointBorderWidth: 3,
                    pointBackgroundColor: "black",
                    pointBorderColor: "rgba(200,100,0,0.6)",
                    pointHoverRadius: 10,
                    pointLabels: ['a','b','a','b','a','b','a'],
                    data: skills.map(function(a) {return a.value;})
                }
                )
                this.radarChart.data.datasets = [... datasets];
                this.radarChart.update();
            });
        
    }

    radarChart: Chart;
    createChart(datasets: any){
        
        
           this.marksData = {
            labels: this.skills.map(function(a) {return a.skill;}),
            
            datasets: datasets
          };
           
          var chartOptions = {
            scale: {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
                stepSize: 20
              },
              pointLabels: {
                fontSize: 18
              }
            },
            legend: {
              position: 'left'
            }
          };

          var marksCanvas = document.getElementById("marksChart");

          this.radarChart = new Chart(marksCanvas, {
            type: 'radar',
            data: this.marksData,
            options: chartOptions
        });


    }        


}