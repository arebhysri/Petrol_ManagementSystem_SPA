import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';

//import core classes
import { FuelInventory } from 'src/app/core/FuelInventory';
import { FuelInventoryService } from 'src/app/services/fuel-inventory.service';
import { ViewAllFualDetailsComponent } from '../popup/view-all-fual-details/view-all-fual-details.component';
import { ViewSingleInventoryComponent } from '../popup/view-single-inventory/view-single-inventory.component';

@Component({
  selector: 'app-all-fual-record-details',
  templateUrl: './all-fual-record-details.component.html',
  styleUrls: ['./all-fual-record-details.component.scss'],
  providers: [DialogService]
})
export class AllFualRecordDetailsComponent implements OnInit {

  fualRecordList: FuelInventory[] = [];

  constructor(public fuelInventoryService: FuelInventoryService, public dialogService: DialogService, public router: Router) { }

  ngOnInit(): void {
    this.getFualRecord();
  }

  getFualRecord() {
    this.fuelInventoryService.getAllRecord().subscribe(data => {
      if (data) {
        data.body.forEach((element: any) => {
          this.fualRecordList.push({
            CreatedDate: element.CreatedDate,
            FuelType: element.FuelType,
            PumperType: element.PumperType,
            UserName: element.UserName,
            TotalPrice: element.TotalPrice,
            FuelPrice: element.FuelPrice,
            TestingAmount: element.TestingAmount,
            TotalQuantiy: element.TotalQuantiy.toFixed(4),
            ClosingAmount: element.ClosingAmount,
            OpeningAmount: element.OpeningAmount,
            Id: element.Id
          })
        });

        console.log(this.fualRecordList)
      }
    })
  }

  //view single inventory
  viewInventoryList(id: number) {
    const ref = this.dialogService.open(ViewSingleInventoryComponent, {
      header: 'View Single Inventory Details',
      width: '45%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: {
        Id: id
      },
    });

    ref.onClose.subscribe(data => {
    });
  }

  //create new inventery
  createNewEntry() {
    this.router.navigate(['petrolSubmission']);
  }

  //view fual details
  viewFualDetail() {
    const ref = this.dialogService.open(ViewAllFualDetailsComponent, {
      header: 'View All Fual Details',
      width: '45%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,

    });

    ref.onClose.subscribe(data => {
    });
  }

  //edit entry
  editInventory(id: number) {
    let recordId = id.toString();
    this.router.navigate(['editPetrolSubmission', recordId]);
  }
}
