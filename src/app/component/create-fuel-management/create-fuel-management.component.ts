import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fualTypeSection } from '../../core/fualTypeSection';
import { FuelSectionService } from '../../services/fuel-section.service';

@Component({
  selector: 'app-create-fuel-management',
  templateUrl: './create-fuel-management.component.html',
  styleUrls: ['./create-fuel-management.component.scss']
})
export class CreateFuelManagementComponent implements OnInit {

  fuelType: string = '';
  fuelCode: string = '';
  price: number = 0;
  pumber: string ='';

  selectedFuelTypeAlert: string = '';
  selectedFuelCodeAlert: string = '';
  selectedPriceAlert: string = '';
  selectedPumbAlert: string = '';

  showSelectedFuelTypeAlert: boolean = false;
  showSelectedFuelCodeAlertmsg: boolean = false;
  showSelectedPriceAlertmsg: boolean = false;
  showSelectedPumbAlertmsg: boolean = false;

  //redirection id
  recordId: any;

  fualTypeList: fualTypeSection[] = [];
  
  constructor(public router: Router,private route: ActivatedRoute,public fuelSectionService:FuelSectionService) {
    this.recordId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getFuelTypeById();
  }

  //create entry
  submitRecord(recordId: number) {
    debugger
    if (this.fuelType == '' || this.fuelType ==undefined) {
      this.selectedFuelTypeAlert='fill this field';
      this.showSelectedFuelTypeAlert=true;
    }
    if (this.fuelCode == '' || this.fuelCode == undefined) {
      this.selectedFuelCodeAlert='fill this field';
      this.showSelectedFuelCodeAlertmsg=true;
    }
    if (this.price == 0 || this.price == undefined) {
      this.selectedPriceAlert='fill this field';
      this.showSelectedPriceAlertmsg=true;
    }
    if (this.fuelType && this.fuelCode && this.price) {
      this.fualTypeList.push({
        FualCode:this.fuelCode,
        FualType:this.fuelType,
        Price:this.price,
        Id:recordId
      });
      if (recordId == null) {
        debugger
        //call services
        recordId = 0;
        this.fuelSectionService.creatFuelInventory(this.fualTypeList[0],recordId).subscribe(Response => {
          Response.status;
          this.router.navigate(['fuelInventory']);
          return true;
        });
      }else{
        //call services
        this.fuelSectionService.creatFuelInventory(this.fualTypeList[0],recordId).subscribe(Response => {
          Response.status;
          this.router.navigate(['fuelInventory']);
          return true;
        });
      }
    }
  }

  //cancel
  cancel() {
    this.router.navigate(['fuelInventory']);
  }

  // get fuel type bt id
  getFuelTypeById(){
    if (this.recordId !=null) {
      this.fuelSectionService.getFuelRecordById(this.recordId).subscribe(data =>{
        this.fuelType=data[0].FualType;
        this.fuelCode=data[0].FualCode;
        this.price=data[0].Price;
      });
    }
  }
}
