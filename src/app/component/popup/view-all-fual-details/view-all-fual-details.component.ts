import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { fualTypeSection } from 'src/app/core/fualTypeSection';
import { FuelInventoryService } from 'src/app/services/fuel-inventory.service';
import { FuelInventory } from 'src/app/core/FuelInventory';
import { groupBy } from 'rxjs/operators';

@Component({
  selector: 'app-view-all-fual-details',
  templateUrl: './view-all-fual-details.component.html',
  styleUrls: ['./view-all-fual-details.component.scss']
})
export class ViewAllFualDetailsComponent implements OnInit {
  fuelTypeList: FuelInventory[] = [];

  //Total amount of fuel
  totalFuelAmount: number = 0;
  groupFuel:any[]=[];
  calculateTotaQuantity:number=0;
  totalPetrol92:number=0;
  totalPetrol95:number=0;
  totalAD:number=0;
  totalSD:number=0;
  totalPetrol92Price:number=0;
  totalPetrol95Price:number=0;
  totalADPrice:number=0;
  totalSDPrice:number=0;
  createdDate:Date=new Date();

  P92Price:number=0;
  P95Price:number=0;
  ADPrice:number=0;
  SDPrice:number=0;
  
  constructor(public fuelInventoryService: FuelInventoryService) { }

  ngOnInit(): void {
    this.getFualRecord();
  }

  //get all record
  getFualRecord() {
    let element ={};
    this.fuelInventoryService.getAllRecord().subscribe(data => {
      debugger
      if (data) {
        data.body.forEach((element: any) => {
          this.fuelTypeList.push({
            CreatedDate: element.CreatedDate,
            FuelType: element.FuelType,
            PumperType: element.PumperType,
            UserName: element.UserName,
            TotalPrice: element.TotalPrice,
            FuelPrice: element.FuelPrice,
            TestingAmount: element.TestingAmount,
            TotalQuantiy: element.TotalQuantiy,
            ClosingAmount: element.ClosingAmount,
            OpeningAmount: element.OpeningAmount,
            Id: element.Id
          })
        });
        // for (let i = 0; i < this.fuelTypeList.length; i++) {
        //   this.calculateTotaQuantity = this.calculateTotaQuantity + this.fuelTypeList[i].TotalQuantiy;
          
        // }
        let findP92= this.fuelTypeList.filter(obj=>obj.FuelType == 'Petrol-92');
        if (findP92.length !=0) {
          this.P92Price = findP92[0].FuelPrice;
          for (let i = 0; i < findP92.length; i++) {
            this.totalPetrol92 =this.totalPetrol92 + findP92[i].TotalQuantiy;
            this.totalPetrol92Price = (this.totalPetrol92 *this.P92Price);        
          }
        }
        let findP95= this.fuelTypeList.filter(obj=>obj.FuelType == 'Petrol-95');
        if (findP95.length !=0) {
          this.P95Price = findP95[0].FuelPrice;
          for (let i = 0; i < findP95.length; i++) {
            this.totalPetrol95 = this.totalPetrol95 + findP95[i].TotalQuantiy;
            this.totalPetrol95Price = (this.totalPetrol95 *this.P95Price);        
          }
        }
        
        let findAD= this.fuelTypeList.filter(obj=>obj.FuelType == 'Auto-Diesel');
        if (findAD.length !=0) {
          this.ADPrice = findAD[0].FuelPrice;
          for (let i = 0; i < findAD.length; i++) {
            this.totalAD =this.totalAD + findAD[i].TotalQuantiy;
            this.totalADPrice = (this.totalAD *this.ADPrice);        
          }
        }
        let findSD= this.fuelTypeList.filter(obj=>obj.FuelType == 'Super-Diesel');
        if (findSD.length !=0) {
          this.SDPrice = this.fuelTypeList[0].FuelPrice;
          for (let i = 0; i < findSD.length; i++) {
            this.totalSD = this.totalSD + findSD[i].TotalQuantiy
            this.totalSDPrice = (this.totalSD * this.SDPrice);        
          }
        }
        this.calculateTotaQuantity=this.totalPetrol92Price+this.totalPetrol95Price+this.totalADPrice+this.totalSDPrice;
      }
    })
  }
  generatePDF() {
    var today = new Date();
    var fileName = 'InventoryDetail_' + today;
    var data = document.getElementById('contentToConvert') as HTMLCanvasElement;
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(fileName);
    });
  }
}
