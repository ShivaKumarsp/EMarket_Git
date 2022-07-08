import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-orderwise-payment-list',
  templateUrl: './orderwise-payment-list.component.html',
  styleUrls: ['./orderwise-payment-list.component.css']
})
export class OrderwisePaymentListComponent implements OnInit {

  @ViewChild('printDiv') htmlData!: ElementRef;
  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute,
   private spinner:NgxSpinnerService,
  ) { }
   orderGroup = new FormGroup({
    orderStatus: new FormControl('',[Validators.required]),
    orderRemark: new FormControl('',[Validators.required]),
  });
  page: number = 1;
   count: number = 0;
   tableSize: number = 7;
   tableSizes: any = [3, 6, 9, 12];
   search="";

  submitted=false;
   formModel: any;
   orderwise_payment_list:any; 
   payment_details:any;
   cancel_item_id=0;
   order_item_id=0;
   order_id=0;
   item_id=0;
   cancel_request_status="";
   cancel_request_reasion="";
   accept_order_count:any;
   reject_order_count:any;
   payment_method="";
   delivery_charge="";
   discount_amount="";
   tax_amount="";
   total_order_amount="";
   gross_amount="";
   payable_amount="";
   payment_status="";
   transaction_id="";
   fromdate="";
   todate="";
   min_dob:any;
   getdata=new FormGroup({
    v_fromdate:new FormControl('',[Validators.required]),
    v_todate:new FormControl('',[Validators.required])
   })
   datePipe = new DatePipe('en-US');
   
  //validation
  get f(){
    return this.orderGroup.controls;
  }
  get g(){
    return this.getdata.controls;
  }
  ngOnInit(): void {
    this.min_dob=new Date();
    this.spinner.show();
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("allOrderModal")
    );

    let url='OrderWise_Report/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.orderwise_payment_list=JSON.parse(promise.orderwise_payment_list).Table;
        this.spinner.hide();
      })
      this.spinner.hide();
  }

  get_data() {
    this.submitted=true;
   if(this.getdata.invalid)
   {
    return
   }
   var s_fromdate = this.datePipe.transform(this.fromdate, 'MM-dd-yyyy');
   var s_todate = this.datePipe.transform(this.todate, 'MM-dd-yyyy');
    this.spinner.show();
   var data={
    "from_date":this.fromdate,
    "to_date":this.todate,
    "language_id":1
   }
    let url='OrderWise_Report/get_payment_data/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.orderwise_payment_list=JSON.parse(promise.orderwise_payment_list).Table;
        this.spinner.hide();
      })
      this.spinner.hide();
  }
  clear()
  {
    this.ngOnInit();
    this.submitted=false;
   this.getdata.reset();
  }


  printPage(){
    let DATA: any = document.getElementById('printDiv');
    console.log(DATA)
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

  openModal(ss:any){
    this.spinner.show();
    var data={
      "order_id":ss.order_id,
      "language_id":1
    }
    let url='OrderWise_Report/payment_details/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.payment_details=JSON.parse(promise.payment_details).Table;
        if(this.payment_details!="")
        {
          this.payment_method=this.payment_details[0].payment_method;
          this.payment_status=this.payment_details[0].payment_status;
          this.delivery_charge=this.payment_details[0].delivery_charge;
          this.discount_amount=this.payment_details[0].discount_amount;
          this.tax_amount=this.payment_details[0].tax_amount;
          this.total_order_amount=this.payment_details[0].total_order_amount;
          this.gross_amount=this.payment_details[0].gross_amount;
          this.payable_amount=this.payment_details[0].payable_amount;
          this.transaction_id=this.payment_details[0].transaction_id;
         
          this.formModel.show();
          this.spinner.hide();
        }
        else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No data Found',
            showConfirmButton: false,
            timer: 3000
        })
        }
        this.spinner.hide();
       
      })


    this.spinner.hide();
  }

  closeModal(){
    this.formModel.hide(); 
  }

 onTableDataChange(event: any) {
    this.page = event;
   
  }



}

