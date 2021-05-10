import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { fualTypeSection } from 'src/app/core/fualTypeSection';
import { pumberTypeSection } from 'src/app/core/pumberTypeSection';

import { DialogService } from 'primeng/dynamicdialog';
import { ViewAllFualDetailsComponent } from '../popup/view-all-fual-details/view-all-fual-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FuelInventory } from 'src/app/core/FuelInventory';
import { FuelInventoryService } from 'src/app/services/fuel-inventory.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { PumpSectionService } from 'src/app/services/pump-section.service';
import { FuelSectionService } from 'src/app/services/fuel-section.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-petrol-submission-form',
  templateUrl: './petrol-submission-form.component.html',
  styleUrls: ['./petrol-submission-form.component.scss'],
  providers: [DialogService, DatePipe]
})
export class PetrolSubmissionFormComponent implements OnInit {
  //fual type section
  fualTypeList: fualTypeSection[] = [];
  dropdwnFualList: SelectItem[] = [];
  selectedFualType: string = '';
  selectednewFualType: string = '';

  newFuelInventory: FuelInventory[] = [];
  //pumber type selection
  pumberTypeList: pumberTypeSection[] = [];
  drpDownPumberList: SelectItem[] = [];
  selectedPumber: string = '';
  selectedNewPumber: string = '';

  //date
  selectedDate: Date = new Date();
  //staff name
  staffName: string = '';
  //petrol price
  fuelPrice: number = 0;

  //opening balance
  openingBalance: number = 0.0000;
  //testing balance
  testingBalance: number = 0.0000;
  //closing balance
  closingBalance: number = 0.0000;
  //total issue
  totalIssue: number = 0.0000;

  //total price
  totalPrice: number = 0;

  selectedDateAlert: string = '';
  showSelectedDateAlertAlertmsg: boolean = false;

  alertClosing: string = '';
  showClosingAlertmsg: boolean = false;

  selectedstaffNameAlert: string = ''
  showSelectedstaffNameAlertmsg: boolean = false

  selectedselectedFualTypeAlert: string = '';
  showSelectedselectedFualTypeAlertmsg: boolean = false;

  selectedselectedPumberAlert: string = '';
  showSelectedselectedPumberAlertmsg: boolean = false;

  alertOpening: string = '';
  showOpenAlertmsg: boolean = false;

  //redirection id
  recordId: any;
  constructor(private route: ActivatedRoute, public fuelSectionService: FuelSectionService, public pumpSectionService: PumpSectionService, public dialogService: DialogService, public router: Router, public fuelInventoryService: FuelInventoryService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.recordId = this.route.snapshot.paramMap.get("id");
    this.getFualTypeList();
    this.getFuelRecordById();
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

  //get pumber list based on fual type
  getPumberList($event: any) {
    this.drpDownPumberList = [];
    this.pumpSectionService.getAllRecord().subscribe(data => {
      if (data) {
        data.body.forEach((element: any) => {
          this.pumberTypeList.push({
            Pumbertype: element.Pumbertype,
            FualCode: element.FualCode,
            Id: element.Id
          })

        });
        if ($event.value) {
          this.pumberTypeList.filter(
            obj => obj.FualCode == $event.value
          ).forEach(obj => {
            this.drpDownPumberList.push({
              label: obj.Pumbertype,
              value: obj.Pumbertype
            })
          });
        }
      }
    });
  }

  //get price for selected petrol or deisel
  getFualPrice($event: any) {
    if ($event.value) {
      let selectedPumberForFual = this.pumberTypeList.filter(obj => obj.Pumbertype == $event.value);
      let displayPrice = this.fualTypeList.filter(obj => obj.FualCode == selectedPumberForFual[0].FualCode)
      this.fuelPrice = displayPrice[0].Price;
    }
  }

  //calculate total price
  calculateTotalPrice() {
    if (this.closingBalance) {
      this.showClosingAlertmsg = false;
    }
    this.totalIssue = 0;
    this.totalPrice = 0;
    this.totalIssue = (this.closingBalance - this.openingBalance - this.testingBalance);
    this.totalPrice = this.totalIssue * this.fuelPrice;
  }

  //view fual details
  viewFualDetail() {
    const ref = this.dialogService.open(ViewAllFualDetailsComponent, {
      header: 'View All Fual Details',
      width: '45%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    ref.onClose.subscribe(data => {
    });
  }

  //submit the record
  submitRecord(id: number) {
    
    if (this.selectedDate == undefined || this.selectedDate == null) {
      this.selectedDateAlert = 'Please select the date';
      this.showSelectedDateAlertAlertmsg = true;
    }
    if (this.staffName == undefined || this.staffName == '') {
      this.selectedstaffNameAlert = 'Please enter staff name';
      this.showSelectedstaffNameAlertmsg = true;
    }
    if (this.selectedFualType == undefined || this.selectedFualType == '') {
      this.selectedselectedFualTypeAlert = 'Please select fuel type';
      this.showSelectedselectedFualTypeAlertmsg = true;
    } else {
      let initiateFuel = this.fualTypeList.filter(obj => obj.FualCode == this.selectedFualType);
      this.selectedFualType = initiateFuel[0].FualType;
    }
    if (this.selectedPumber == undefined || this.selectedPumber == '') {
      this.selectedselectedPumberAlert = 'Please select pump';
      this.showSelectedselectedPumberAlertmsg = true;
    }
    if (this.closingBalance == 0) {
      this.alertOpening = "Please enter Opening Balance";
      this.showOpenAlertmsg = true;
    }
    if (this.openingBalance == 0) {
      this.alertClosing = "Please enter Closing Balance";
      this.showClosingAlertmsg = true;
    }

    if (this.selectedDate && this.staffName && this.selectedFualType && this.selectedPumber) {
      var date = moment(this.selectedDate).format("YYYY-MM-DD");
      this.newFuelInventory.push({
        CreatedDate: date.toString(),
        UserName: this.staffName,
        FuelType: this.selectedFualType,
        PumperType: this.selectedPumber,
        OpeningAmount: this.openingBalance,
        TestingAmount: this.testingBalance,
        ClosingAmount: this.closingBalance,
        TotalQuantiy: this.totalIssue,
        TotalPrice: this.totalPrice,
        FuelPrice: this.fuelPrice,
        Id: id
      })
      if (id == 0) {
        //call services
        let recordId = 0;
        this.fuelInventoryService.creatFuelInventory(this.newFuelInventory[0], recordId).subscribe(Response => {
          Response.status;
          this.router.navigate(['allFualRecord']);
          return true;
        });
      } else {
        //call services
        this.fuelInventoryService.creatFuelInventory(this.newFuelInventory[0], id).subscribe(Response => {
          Response.status;
          this.router.navigate(['allFualRecord']);
          return true;
        });
      }
    }
  }

  //enter alert
  enterTestingField() {
    if (this.openingBalance) {
      this.alertClosing = "Please enter Closing Balance";
      this.showClosingAlertmsg = true;
    }
  }

  //change fuel type
  changeFuel($event:any){
    
    if (this.selectednewFualType != $event.value) {
      this.openingBalance =0;
      this.closingBalance=0;
      this.testingBalance=0;
      this.fuelPrice=0;
    }
  }
  //get fuel record by id
  getFuelRecordById() {
    
    //call services
    forkJoin([
      this.fuelInventoryService.getRecordById(this.recordId), //observable 1
      this.pumpSectionService.getAllRecord(), //observable 2,
      this.fuelSectionService.getAllRecord()
    ]).subscribe(([data1, data2, data3]) => {
      // When Both are done loading do something
      this.selectedDate = data1[0].CreatedDate;
      this.staffName = data1[0].UserName;
      this.openingBalance = data1[0].OpeningAmount.toFixed(4);
      this.closingBalance = data1[0].ClosingAmount.toFixed(4);
      this.testingBalance = data1[0].TestingAmount.toFixed(4);
      this.totalIssue = data1[0].TotalQuantiy.toFixed(4);
      this.fuelPrice = data1[0].FuelPrice.toFixed(2);
      this.totalPrice = data1[0].TotalPrice.toFixed(2);
      this.fualTypeList = data3.body;
      let findFual = this.fualTypeList.filter(obj => obj.FualType == data1[0].FuelType);
      this.selectednewFualType = findFual[0].FualCode;
      this.selectedFualType = findFual[0].FualCode;
      this.pumberTypeList = data2.body;
      this.pumberTypeList.filter(
        obj => obj.FualCode == this.selectedFualType
      ).forEach(obj => {
        this.drpDownPumberList.push({
          label: obj.Pumbertype,
          value: obj.Pumbertype
        })
      });
      let pump = this.pumberTypeList.filter(obj => obj.Pumbertype == data1[0].PumperType);
      console.log(pump);
      let editPump = this.drpDownPumberList.filter(obj => obj.value == pump[0].Pumbertype);
      this.selectedPumber = editPump[0].value;
      console.log(this.selectedPumber);
    });
  }

  cancel() {
    this.router.navigate(['allFualRecord']);
  }
}
