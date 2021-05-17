import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pumberTypeSection } from 'src/app/core/pumberTypeSection';
import { PumpSectionService } from 'src/app/services/pump-section.service';

@Component({
  selector: 'app-pumber-management',
  templateUrl: './pumber-management.component.html',
  styleUrls: ['./pumber-management.component.scss']
})
export class PumberManagementComponent implements OnInit {

  //pumber type selection
  pumberTypeList: pumberTypeSection[] = [];
  //redirection id
  recordFuelCode: any;
  tableLength: number = 0;
  constructor(private route: ActivatedRoute, public pumpSectionService: PumpSectionService, public router: Router) {
    this.recordFuelCode = this.route.snapshot.paramMap.get("fuelCode");
    console.log(this.recordFuelCode)
  }

  ngOnInit(): void {
    this.getPumberList();
  }

  //get pumber list based on fual type
  getPumberList() {
    debugger
    this.pumpSectionService.getAllRecordByfuelCode(this.recordFuelCode).subscribe(data => {
      if (data) {
        data.forEach((element: any) => {
          this.pumberTypeList.push({
            Pumbertype: element.Pumbertype,
            FualCode: element.FualCode,
            Id: element.Id
          })

        });
        this.tableLength = this.pumberTypeList.length;
      }
    });
    
  }
  //back to page
  backToInventory() {
    this.router.navigate(['fuelInventory']);
  }

  //edit
  editInventory(id: number) {
    this.router.navigate(['editPumberInventory', id]);
  }
  //create new pumber
  createNewPumberEntry() {
    this.router.navigate(['createPumberInventory']);
  }
  
}
