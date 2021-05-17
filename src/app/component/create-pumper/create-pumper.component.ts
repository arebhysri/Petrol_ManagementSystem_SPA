import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { fualTypeSection } from 'src/app/core/fualTypeSection';
import { pumberTypeSection } from 'src/app/core/pumberTypeSection';
import { FuelSectionService } from 'src/app/services/fuel-section.service';
import { PumpSectionService } from 'src/app/services/pump-section.service';

@Component({
  selector: 'app-create-pumper',
  templateUrl: './create-pumper.component.html',
  styleUrls: ['./create-pumper.component.scss']
})
export class CreatePumperComponent implements OnInit {

  //fual type section
  fualTypeList: fualTypeSection[] = [];
  dropdwnFualList: SelectItem[] = [];
  fuelCode: any;
  selectedFualType: string = '';

  selectedFuelTypeAlert: string = '';
  selectedFuelCodeAlert: string = '';
  selectedPumbAlert: string = '';

  showSelectedFuelTypeAlert: boolean = false;
  showSelectedFuelCodeAlertmsg: boolean = false;
  showSelectedPumbAlertmsg: boolean = false;

  //pumber type selection
  pumberTypeList: pumberTypeSection[] = [];

  //redirection id
  recordId: any;

  pumber: string = '';

  constructor(private route: ActivatedRoute, public router: Router, public fuelSectionService: FuelSectionService, public pumpSectionService: PumpSectionService) {
    this.recordId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getFuelTypeById();
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
        this.fualTypeList.forEach(obj => {
          this.dropdwnFualList.push({
            label: obj.FualType,
            value: obj.FualCode
          })
        });
      }
    });
  }

  //get pumber type
  getPumber($event: any) {
    debugger
    let selectedList = this.fualTypeList.find(obj => obj.FualCode == $event.value);
    console.log(selectedList?.FualCode);
    this.fuelCode = selectedList?.FualCode;
  }

  //create record
  submitRecord(recordId: number) {
    if (this.selectedFualType == '' || this.selectedFualType == undefined) {
      this.selectedFuelTypeAlert = 'fill this field';
      this.showSelectedFuelTypeAlert = true;
    }
    if (this.fuelCode == '' || this.fuelCode == undefined) {
      this.selectedFuelCodeAlert = 'fill this field';
      this.showSelectedFuelCodeAlertmsg = true;
    }
    if (this.pumber == '' || this.pumber == undefined) {
      this.selectedPumbAlert = 'fill this field';
      this.showSelectedPumbAlertmsg = true;
    }
    if (this.fuelCode && this.pumber) {
      this.pumberTypeList.push({
        FualCode: this.fuelCode,
        Pumbertype: this.pumber,
        Id: recordId
      });
      if (recordId == null) {
        debugger
        //call services
        recordId = 0;
        this.pumpSectionService.creatPumbInventory(this.pumberTypeList[0], recordId).subscribe(Response => {
          Response.status;
          this.router.navigate(['fuelInventory']);
          return true;
        });
      } else {
        //call services
        this.pumpSectionService.creatPumbInventory(this.pumberTypeList[0], recordId).subscribe(Response => {
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
      //call services
    forkJoin([
      this.pumpSectionService.getPumbRecordById(this.recordId), //observable 1
      this.fuelSectionService.getAllRecord()
    ]).subscribe(([data1, data2]) => {
      // When Both are done loading do something
      this.pumber=data1[0].Pumbertype;
        this.fuelCode=data1[0].FualCode;
      
        data2.body.forEach((element: any) => {
          this.fualTypeList.push({
            FualType: element.FualType,
            FualCode: element.FualCode,
            Price: element.Price,
            Id: element.Id
          })
        });
        this.fualTypeList.forEach(obj => {
          this.dropdwnFualList.push({
            label: obj.FualType,
            value: obj.FualCode
          })
        });

      let findFual = this.fualTypeList.filter(obj => obj.FualCode == this.fuelCode);
      this.selectedFualType = findFual[0].FualCode;
    });
    }
  }
}
