import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FuelInventory } from 'src/app/core/FuelInventory';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FuelInventoryService } from 'src/app/services/fuel-inventory.service';

@Component({
  selector: 'app-view-single-inventory',
  templateUrl: './view-single-inventory.component.html',
  styleUrls: ['./view-single-inventory.component.scss']
})
export class ViewSingleInventoryComponent implements OnInit {
  title = 'html-to-pdf';
  singleInventory: FuelInventory[] = [];
  Id: number = 0;

  createdDate:Date=new Date();
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, public fuelInventoryService: FuelInventoryService) {
    this.Id = this.config.data['Id'];
  }

  ngOnInit(): void {
    this.getFuelRecordById();
  }

  //get fuel record by id
  getFuelRecordById() {
    
    //call services
    this.fuelInventoryService.getRecordById(this.Id).subscribe((data) => {
      // When Both are done loading do something
      this.singleInventory = data;

    });

  }
  //generate pdf
  generatePDF() {
    var today = new Date();
    var fileName = 'Single_Inventory_' + today;
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
