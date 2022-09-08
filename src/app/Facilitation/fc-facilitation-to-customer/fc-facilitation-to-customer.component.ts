import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-fc-facilitation-to-customer',
  templateUrl: './fc-facilitation-to-customer.component.html',
  styleUrls: ['./fc-facilitation-to-customer.component.css']
})
export class FcFacilitationToCustomerComponent implements OnInit {

  
  
  constructor(private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }

    form = new FormGroup({
      deliveryExecutive: new FormControl('',[Validators.required]),
      v_order_by:new FormControl()
    });

    submitted=false;
    listitm=false;
    delivery_executive_id="";
    delivery_exe_dd:any;
    consignment_array:any;
    consignment_generared_list:any;

    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [3, 6, 9, 12];
    search="";
    page_name="";
    getpage:any;
    page1: number = 1;
    count1: number = 0;
    tableSize1: number = 5;
    tableSizes1: any = [3, 6, 9, 12];
    search1="";

  formModel:any;
  editModel:any;
  fc_to_cs_consignment_list:any;

  consignment_l=0;
  consignment_b=0;
  consignment_h=0;
  weight=0;
  totalweight=0;
  hub_route_details:any;
  
  total_weight=0;
  total_vol_weight=0;
  count_weight=0;
  count_vol_weight=0;
  pickup_volumetric_weight=0;
  order_by="";
  vehicle_type="";
  fc_to_cs_consignment_list_new:any;
  de_message="";

   //validation
   get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getpage=localStorage.getItem('fc_page');
   this.page_name=this.getpage;

let url='Fc_Consignment/get_data_fc_cs/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.fc_to_cs_consignment_list=JSON.parse(promise.fc_to_cs_consignment_list).Table;
        this.fc_to_cs_consignment_list_new=JSON.parse(promise.fc_to_cs_consignment_list).Table;
        this.delivery_exe_dd=JSON.parse(promise.executive_list).Table;
        if(this.delivery_exe_dd=="")
        {
          this.de_message='None of DE Available for Assignment';
        }
      })
  }
 
  assig_fc_customer()
  {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.consignment_array=[];
    this.fc_to_cs_consignment_list.forEach((ss:any)=>
    {
      if(ss.is_check==true)
      {
        this.consignment_array.push({consignment_id:ss.consignment_id,customer_id:ss.customer_id,tracking_id:ss.tracking_id,first_hub_id:ss.first_hub_id,last_hub_id:ss.last_hub_id,
          first_facilitation_id:ss.first_facilitation_id,last_facilitation_id:ss.last_facilitation_id})
      }
    })
   
    if(this.consignment_array=="")
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Select Atleast One Checkbox',
        showConfirmButton: false,
        timer: 3000
      })
      return
    }
    var data={
      'consignment_array':this.consignment_array,
      "delivery_executive_id":this.delivery_executive_id,
      "language_id":1
          }
          let url='Fc_Consignment/assign_delivery_to_customer/';
          this.allapi.PostData(url,data).subscribe(promise=>
            {
              if(promise.status=="Update")
              {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Assign Successfully',
                  showConfirmButton: false,
                  timer: 3000
                })
                this.fc_to_cs_consignment_list=JSON.parse(promise.fc_to_cs_consignment_list).Table;
                this.fc_to_cs_consignment_list_new=JSON.parse(promise.fc_to_cs_consignment_list).Table;
                this.delivery_exe_dd=JSON.parse(promise.executive_list).Table;
                if(this.delivery_exe_dd=="")
        {
          this.de_message='None of DE Available for Assignment';
        }
                this.consignment_array=[];
                this.submitted=false;
                this.form.reset();
              }
      
              else if(promise.status=="Failed")
              {
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Failed To Assign',
                  showConfirmButton: false,
                  timer: 3000
                })
              }
         
             })
  }

  get_route_data(ss:any){
    var data={
"consignment_id":parseInt(ss.consignment_id),
"language_id":1
    }
    let url='Hub_Consignment/get_route_data/';
    this.allapi.PostData(url,data).subscribe(promise=>
    {
      this.hub_route_details=JSON.parse(promise.hub_route_details).Table;
     this.consignment_l=ss.consignment_l;
    this.consignment_b=ss.consignment_b;
    this.consignment_h=ss.consignment_h;
    this.weight=ss.weight;
    this.totalweight=((this.consignment_l*this.consignment_b*this.consignment_h)/6000);
    this.formModel.show();
  })
  }

  change_consignment_list(ss:any)
  {
    this.vehicle_type="";
    if(ss>0)
    {  
    this.delivery_exe_dd.forEach((aa:any)=>
    {
    if(aa.delivery_executive_id==ss)
    {   
    this.vehicle_type=aa.vehicle_type;
    this.total_weight=aa.max_weight;
    this.total_vol_weight=aa.max_volumetric_weight;
    this.pickup_volumetric_weight=aa.pickup_volumetric_weight;
   }
  })
  // if(this.vehicle_type=="Two Wheeler")
  // {
    this.fc_to_cs_consignment_list_new=[];
   this.fc_to_cs_consignment_list.forEach((ss:any)=>
   {
     if(ss.volumetric_weight<=this.pickup_volumetric_weight)
     {
       this.fc_to_cs_consignment_list_new.push(ss)
     }

   })
  //}
  // if(this.vehicle_type=="Three Wheeler")
  // {
  //   this.fc_to_cs_consignment_list_new=[];
  //  this.fc_to_cs_consignment_list.forEach((ss:any)=>
  //  {
  // if(ss.volumetric_weight<this.pickup_volumetric_weight)
  //    {
  //      this.fc_to_cs_consignment_list_new.push(ss)
  //    }
  //  })
  // }
  // if(this.vehicle_type=="Four Wheeler")
  // {
  //   this.fc_to_cs_consignment_list_new=[];
  //  this.fc_to_cs_consignment_list.forEach((ss:any)=>
  //  {
  //    if(ss.volumetric_weight>this.pickup_volumetric_weight)
  //    {
  //      this.fc_to_cs_consignment_list_new.push(ss)
  //    }
  //  })
  // }

}
else{

  this.fc_to_cs_consignment_list_new=[];
   this.fc_to_cs_consignment_list.forEach((ss:any)=>
   {
       this.fc_to_cs_consignment_list_new.push(ss)
     
   })
}


    }

    change_order_by(ss:any)
    {
      this.count_weight=0;
      this.count_vol_weight=0;
      this.delivery_executive_id="";
      var data={
        "order_by":ss,
        "language_id":1
      }
      let url='Fc_Consignment/fc_cs_change_order_by/';
      this.allapi.PostData(url,data).subscribe(promise=>
        {
          this.fc_to_cs_consignment_list=JSON.parse(promise.fc_to_cs_consignment_list).Table;
          this.fc_to_cs_consignment_list_new=JSON.parse(promise.fc_to_cs_consignment_list).Table;  
         })
    }


    redirect_to_page(ss:any)
    {
      localStorage.setItem('fc_page',ss);
  if(ss==1)
  {
    window.location.replace('app/fc_facilitation_to_hub');
  }
  else if(ss==2)
  {
    window.location.replace('app/fc_facilitation_to_customer');
  }
  else if(ss==3)
  {
    window.location.replace('app/assign_item_from_vendor');
  }
  else if(ss==4)
  {
    window.location.replace('app/fc_consignment_list');
  }
  else if(ss==5)
  {
    window.location.replace('app/fc_consignment_list');
  }
  else if(ss=='')
{
  window.location.replace('app/facilitation_consignment');
}
    }


  doSomething(){
    this.formModel.hide();
  }
  EditModal(id:any){
    this.editModel.show();
  }
  closeEdit(){
    this.editModel.hide();
  }

  onClick(ss:any)
  {
    if(ss==0)
    {
      this.listitm=true;
    }
    else if(ss==1)
    {
      this.listitm=false;
    }
  
  }

  click_change(ss:any)
  {  
    if(this.consignment_array!="" && this.consignment_array!=undefined)
    {
    if(ss.is_check==true)
      {
        this.consignment_array.push({consignment_id:ss.consignment_id,store_id:ss.store_id,vendor_id:ss.vendor_id,tracking_id:ss.tracking_id,volumetric_weight:ss.volumetric_weight,weight:ss.weight})
      }
      else if(ss.is_check==false)
      {       
          this.consignment_array.forEach((value: { consignment_id: any; },index: any)=>{
              if(value.consignment_id==ss.consignment_id) this.consignment_array.splice(index,1);
          });
        
      }
     
    }
    else{
      if(ss.is_check==true)
      {
        this.consignment_array=[];
        this.consignment_array.push({consignment_id:ss.consignment_id,store_id:ss.store_id,vendor_id:ss.vendor_id,tracking_id:ss.tracking_id,volumetric_weight:ss.volumetric_weight,weight:ss.weight})
      }
    }
  
    if(this.consignment_array!="")
   {
    this.count_weight=0;
    this.count_vol_weight=0;
    this.consignment_array.forEach((ss:any)=>
    {
      this.count_weight=this.count_weight+ss.weight;
      this.count_vol_weight=this.count_vol_weight+ss.volumetric_weight;
    })
  }

  if(this.consignment_array=="")
  {
       this.count_weight=0; 
       this.count_vol_weight=0;     
 }


  }




  
  onTableDataChange(event: any) {
    this.page = event;

  }
  
  onTableDataChange1(event: any) {
    this.page1 = event;

  }

}

