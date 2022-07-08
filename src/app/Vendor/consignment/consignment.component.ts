import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window: any;


@Component({
  selector: 'app-consignment',
  templateUrl: './consignment.component.html',
  styleUrls: ['./consignment.component.css']
})
export class ConsignmentComponent implements OnInit {

  constructor( private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }
  
    bc_margin_top=1;
    bc_height=50;
    bc_width=2;
    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [3, 6, 9, 12];
    SerialId=12345;
    screen:any=0
  submitted=false;
  search="";
  editdata:boolean=false;

  consignment_id=0;
  consignment_l="";
  consignment_b="";
  consignment_h="";
  weight="";
  first_hub_id="";
  last_hub_id="";
  consignment_status="";
  hub_route_id="";
  order_item_id="";
  edit_item_name="";
  hub_list_1:any;
  hub_list_2:any;
  validation_list:any;
  consignment_list:any;
  order_item_list:any;
  closeform:any;
  print_data:any;
  consignment_print_data_two:any;
  edit_consignment_data:any;

  customer_name="";
address_line_1="";
address_line_2="";
city="";
state_name="";
 pincode="";
land_mark="";
mobile="";
email_id="";
store_name="";
pickup_location="";
first_hub="";
last_hub="";
payment_method="";

  consignmentdata=new FormGroup({
    v_order_item_id: new FormControl('',[Validators.required]),
    v_consignment_l: new FormControl('',[Validators.required]),
    v_consignment_b: new FormControl('',[Validators.required]),
    v_consignment_h: new FormControl('',[Validators.required]),
    v_weight: new FormControl('',[Validators.required]),
    v_first_hub: new FormControl('',[Validators.required]),
    v_last_hub: new FormControl('',[Validators.required]),
    v_consignment_status: new FormControl('',[Validators.required]),
    v_hub_route_id: new FormControl('',[Validators.required]),
    v_edit_item_name:new FormControl()
  
  })
  get f() {
    return this.consignmentdata.controls;
  }


  ngOnInit(): void {
    this.closeform = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );    

let url='Consignment/get_data/';
this.allapi.GetDataById(url,1).subscribe(promise=>
  {
    this.hub_list_1=JSON.parse(promise.hub_list_1).Table;
    this.hub_list_2=JSON.parse(promise.hub_list_2).Table;
    this.consignment_list=JSON.parse(promise.consignment_list).Table; 
    this.order_item_list=JSON.parse(promise.order_item_list).Table; 
  })
  }

  save_data()
  {
    var data={
      "consignment_id":this.consignment_id,
      "consignment_l":parseInt(this.consignment_l),
      "consignment_b":parseInt(this.consignment_b),
      "consignment_h":parseInt(this.consignment_h),
      "weight":parseInt(this.weight),
      "first_hub_id":parseInt(this.first_hub_id),
      "last_hub_id":parseInt(this.last_hub_id),
      "hub_route_id":parseInt(this.hub_route_id),
      "consignment_status":this.consignment_status,
      "order_item_id":this.order_item_id,
      "language_id":1
    }
    let url='Consignment/save_consignment';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        if(promise.status=="Insert")
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: promise.message,
            showConfirmButton: false,
            timer: 2000
        })
       
        this.hub_list_1=JSON.parse(promise.hub_list_1).Table;
        this.hub_list_2=JSON.parse(promise.hub_list_2).Table; 
        this.consignment_list=JSON.parse(promise.consignment_list).Table; 
        this.order_item_list=JSON.parse(promise.order_item_list).Table; 
        this.screen=0;
        this.clear();
        }
        else if(promise.status=="Failed")
        {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: promise.message,
            showConfirmButton: false,
            timer: 2000
        })
        }
        else if(promise.status=="Validation")
        {
          this.validation_list=promise.validation_list;
        }
      
      })
  } 

  edit_data(ss:any)
  {
    var data={
      "consignment_id":ss.consignment_id,
      "language_id":1
          }
          let url='Consignment/consignment_get_edit_data/';
          this.allapi.PostData(url,data).subscribe(promise=>
            {
              this.edit_consignment_data=JSON.parse(promise.edit_consignment_data).Table;
              if(this.edit_consignment_data!="")
              {   
              this.edit_item_name=this.edit_consignment_data[0].item_name;
              }
             
            })

    this.consignment_id=ss.consignment_id;
    this.consignment_l=ss.consignment_l;
    this.consignment_b=ss.consignment_b;
    this.consignment_h=ss.consignment_h;
    this.weight=ss.weight;
    this.first_hub_id=ss.first_hub_id;
    this.last_hub_id=ss.last_hub_id;
    this.hub_route_id=ss.hub_route_id;
    this.consignment_status=ss.status;
    this.order_item_id=ss.order_item_id;
    this.editdata=true;
   this.order_item_list.forEach((ss:any) => {
    if(this.order_item_id==ss.order_item_id)
    {
     this.edit_item_name=ss.item_name;
    }
   });
    this.screen=1;
  }

  view_print(ss:any)
  {
    this.consignment_id=ss.consignment_id;
    var data={
"consignment_id":ss.consignment_id,
"language_id":1
    }
    let url='Consignment/consignment_print_data/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        if(promise.consignment_print_data!="")
        {   
          this.consignment_print_data_two= JSON.parse(promise.consignment_print_data_two).Table;  
          this.print_data=JSON.parse(promise.consignment_print_data).Table;
          this.customer_name=this.print_data[0].customer_name;
          this.address_line_1=this.print_data[0].address_line_1;
          this.address_line_2=this.print_data[0].address_line_2;
          this.city=this.print_data[0].city;
          this.state_name=this.print_data[0].state_name;
          this.pincode=this.print_data[0].pincode;
          this.land_mark=this.print_data[0].land_mark;
          this.mobile=this.print_data[0].mobile;
          this.email_id=this.print_data[0].email_id;
          this.store_name=this.print_data[0].store_name;
          this.pickup_location=this.print_data[0].pickup_location;
          this.first_hub=this.print_data[0].first_hub;
          this.last_hub=this.print_data[0].last_hub;
          this.payment_method=this.print_data[0].payment_method;
          this.weight=this.print_data[0].weight;
          this.closeform.show();
        }
       
      })
   
  }
  lable_print()
  {
    var data={
      "consignment_id":this.consignment_id,
      "language_id":1
          }
    let url='Consignment/consignment_print_update/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        if(promise.status=="Update")
        {  
          this.consignment_list=JSON.parse(promise.consignment_list).Table;    
          window.print();
        }
       
      })

   
  }
  clear()
  {
    this.consignment_id=0;
    this.consignment_l="";
    this.consignment_b="";
    this.consignment_h="";
    this.weight="";
    this.first_hub_id="";
    this.last_hub_id="";
    this.consignment_status="";
    this.hub_route_id="";
    this.order_item_id="";
    this.submitted = false;
  }
  back_screen(ss:any)
  {
    this.clear();
    this.screen=ss;
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
  
}
