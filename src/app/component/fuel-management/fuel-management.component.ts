import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fualTypeSection } from '../../core/fualTypeSection';
import { FuelSectionService } from '../../services/fuel-section.service';

@Component({
  selector: 'app-fuel-management',
  templateUrl: './fuel-management.component.html',
  styleUrls: ['./fuel-management.component.scss']
})
export class FuelManagementComponent implements OnInit {

  fualTypeList: fualTypeSection[] = [];
  tableLength:number=0;
  constructor(private route: ActivatedRoute, public router: Router, public fuelSectionService: FuelSectionService) { }

  ngOnInit(): void {
    this.getFualTypeList();
  }

  //get fual types
  getFualTypeList() {
    this.fuelSectionService.getAllRecord().subscribe(data => {
      if (data) {
        data.body.forEach((element: any) => {
          this.fualTypeList.push({
            FualType: element.FualType,
            FualCode: element.FualCode,
            Price: element.Price,
            Id: element.Id
          })
        });
        this.tableLength = this.fualTypeList.length
      }
    });
  }
  //create new entry
  createNewEntry() {
    this.router.navigate(['createFuelInventory']);
  }

  //creeate pumber entry
  viewPumberInventory(fuelCode:string){
    let fuelCodeData = fuelCode.toString();
    this.router.navigate(['allPumberRecordByFuelCode',fuelCodeData]);
  }
  //edit entry
  editInventory(id: number) {
    let recordId = id.toString();
    this.router.navigate(['editFuelInventory', recordId]);
  }

  //back to page
  backToInventory(){
    this.router.navigate(['allFualRecord']);
  }
}
