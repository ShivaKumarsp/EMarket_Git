
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
 declare var window:any;

@Component({
  selector: 'app-assign-item-from-vendor',
  templateUrl: './assign-item-from-vendor.component.html',
  styleUrls: ['./assign-item-from-vendor.component.css']
})
export class AssignItemFromVendorComponent implements OnInit {

 
  constructor(private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }
    
    form = new FormGroup({
      deliveryExecutive: new FormControl('',[Validators.required]),
      v_order_by: new FormControl(''),
      v_ischeck: new FormControl(''),
      selectOpt:new FormControl(''),
    });
    errormessage="";
    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [3, 6, 9, 12];
    search="";
    submitted=false;
   
    listitm=false;
    page1: number = 1;
    count1: number = 0;
    tableSize1: number = 5;
    tableSizes1: any = [3, 6, 9, 12];
    search1="";

    page2: number = 1;
    count2: number = 0;
    tableSize2: number = 5;
    tableSizes2: any = [3, 6, 9, 12];
    search2="";
    page_name="";
    getpage:any;
    delivery_executive_id="";
    delivery_exe_dd:any;
    consignment_list:any;
    consignment_list_new:any;
    consignment_list_temp:any;
    consignment_list_new_temp:any;
    consignment_array:any;
    consignment_array_check:any;
    consignment_array_new:any;
    consignment_array_temp:any;
    consignment_generared_list:any;
    consignment_store_list:any;
    vehicle_type="";
    order_by="";
    formModel: any;
    total_weight=0;
    total_vol_weight=0;
    pickup_volumetric_weight=0;
    count_weight=0;
    count_vol_weight=0;
    consignment_string="";
      con_count=0;
  store_list:any;
  get_data_list:any;
  de_message="";
  selected_id="";
  //validation
  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getpage=localStorage.getItem('fc_page');
    this.page_name=this.getpage;

    this.formModel = new window.bootstrap.Modal(
      document.getElementById("allconsignment")
    );

    this.consignment_list_new=[];
    let url='Assign_Consignment/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.consignment_store_list=JSON.parse(promise.consignment_store_list).Table;
        this.consignment_list=promise.consignment_list
        this.consignment_list_new=promise.consignment_list;
        this.consignment_list_temp=promise.consignment_list;
        this.delivery_exe_dd=JSON.parse(promise.executive_list).Table;       
        this.consignment_generared_list=JSON.parse(promise.consignment_generared_list).Table;
        this.store_list=JSON.parse(promise.store_list).Table;
        if(this.delivery_exe_dd=="")
        {
          this.de_message='None of DE Available for Assignment';
        }
       
       })
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
    let url='Assign_Consignment/change_order_by/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.consignment_list=promise.consignment_list
        this.consignment_list_new=promise.consignment_list; 
       })
  }
  change_consignment_list_old(ss:any)
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
    this.consignment_list_new=[];
   this.consignment_list.forEach((ss:any)=>
   {   
     if(ss.volumetric_weight<=this.pickup_volumetric_weight)
     {
       this.consignment_list_new.push(ss)
     }
   })  
}
else{

  this.consignment_list_new=[];
   this.consignment_list.forEach((ss:any)=>
   {
       this.consignment_list_new.push(ss)
     
   })
}


    }
  change_consignment_list(ss:any)
    {
      this.errormessage="";
      this.vehicle_type="";
      // if(ss>0)
      // {  
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

    //   this.consignment_list_new=[];
    //  this.consignment_list.forEach((ss:any)=>
    //  {   
    //    if(ss.volumetric_weight<=this.pickup_volumetric_weight)
    //    {
    //      this.consignment_list_new.push(ss)
    //    }
    //  })  
  //}
  // else{
  
  //   this.consignment_list_new=[];
  //    this.consignment_list.forEach((ss:any)=>
  //    {
  //        this.consignment_list_new.push(ss)
       
  //    })
  // } 
 }
 get_data()
 {
  this.get_data_list=[];
  console.log(this.form.value.selectOpt)
    this.form.value.selectOpt.forEach((wtime:any,i:any) => {    
     this.get_data_list.push({'store_id':parseInt(wtime)})
    });
   var data={
    'get_data_list': this.get_data_list,
    "language_id":1
   }
    let url='Assign_Consignment/get_storewise_consignment_data/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        if(promise.consignment_list.length>0&& promise.consignment_list!="")
        {
        this.consignment_list=promise.consignment_list;
        this.consignment_list_new=promise.consignment_list;
        }
        else{
          this.consignment_list=this.consignment_list_temp;
          this.consignment_list_new=this.consignment_list_temp;
        }
       
       })
 }

    view_consignment(aa:any)
    {
      if(this.vehicle_type!="")
      {
        if(this.vehicle_type=="Two Wheeler")
        {
          this.consignment_list_new=[];
         this.consignment_list.forEach((ss:any)=>
         {
           if(ss.volumetric_weight<=2 && ss.store_id==aa.store_id)
           {
             this.consignment_list_new.push(ss)
           }
      
         })
        }
        if(this.vehicle_type=="Three Wheeler")
        {
          this.consignment_list_new=[];
         this.consignment_list.forEach((ss:any)=>
         {
        if(ss.volumetric_weight>2 && ss.volumetric_weight<5 && ss.store_id==aa.store_id)
           {
             this.consignment_list_new.push(ss)
           }
         })
        }
        if(this.vehicle_type=="Four Wheeler")
        {
          this.consignment_list_new=[];
         this.consignment_list.forEach((ss:any)=>
         {
           if(ss.volumetric_weight>5 && ss.store_id==aa.store_id)
           {
             this.consignment_list_new.push(ss)
           }
         })
        }
      }
      else{
        this.consignment_list_new=[];
        this.consignment_list.forEach((ss:any)=>
        {
          if(ss.store_id==aa.store_id)
          {
            this.consignment_list_new.push(ss)
          }
        })
      }
  
      this.formModel.show();
    }
    closeModal(){
      this.formModel.hide();
    }
    click_change(ss:any)
    {  this.delivery_executive_id="";
      this.errormessage="";
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

   
  onLogClick()
  {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    
    this.consignment_string="";
    this.con_count=0;
  this.consignment_array.forEach((ss:any)=>
  {   
    if(ss.volumetric_weight>=this.pickup_volumetric_weight)
    {
     this.con_count=this.con_count+1;
     this.consignment_string=this.consignment_string+","+ss.consignment_id;
    }
  }) 
  if(this.con_count>0)
  {
  
   this.delivery_executive_id="";
   this.errormessage=this.consignment_string+' This Consignment Valume(Dimension) Is To High, Please Reduce Valume(Dimension) or Select High Valume(Dimension) Vehicle';
   Swal.fire({
     position: 'center',
     icon: 'warning',
     title: this.consignment_string+' This Consignment Valume(Dimension) Is To High, Please Reduce Valume(Dimension) or Select High Valume(Dimension) Vehicle',
     showConfirmButton: false,
     timer: 5000
   })
   
   return
  }





    //this.consignment_array_new=[];
    // this.consignment_store_list.forEach((ss:any)=>
    // {
    //   if(ss.is_check==true)
    //   {
    //     this.consignment_array_new.push({store_id:ss.store_id,vendor_id:ss.vendor_id})
    //   }
    // })
   
    // if(this.consignment_array_new=="")
    // {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'warning',
    //     title: 'Select Atleast One Checkbox',
    //     showConfirmButton: false,
    //     timer: 3000
    //   })
    //   return
    // }
   

    if(this.consignment_array=="" || this.consignment_array==undefined)
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

    // this.consignment_array_new.forEach((first:any)=>
    // {
    //   this.consignment_array_temp=[];
    //   if(this.vehicle_type=="Two Wheeler")
    //   {        
    //    this.consignment_list.forEach((ss:any)=>
    //    {
    //      if(ss.volumetric_weight<=2)
    //      {
	  // this.consignment_array_temp.push({consignment_id:ss.consignment_id,store_id:ss.store_id,vendor_id:ss.vendor_id,tracking_id:ss.tracking_id})
    //      }
    
    //    })
    //   }
    //   if(this.vehicle_type=="Three Wheeler")
    //   {
       
    //    this.consignment_list.forEach((ss:any)=>
    //    {
    //   if(ss.volumetric_weight<5)
    //      {
    //       this.consignment_array_temp.push({consignment_id:ss.consignment_id,store_id:ss.store_id,vendor_id:ss.vendor_id,tracking_id:ss.tracking_id})
    //      }
    //    })
    //   }
    //   if(this.vehicle_type=="Four Wheeler")
    //   {
      
    //    this.consignment_list.forEach((ss:any)=>
    //    {
    //      if(ss.volumetric_weight>5 &&)
    //      {
    //       this.consignment_array_temp.push({consignment_id:ss.consignment_id,store_id:ss.store_id,vendor_id:ss.vendor_id,tracking_id:ss.tracking_id})

    //      }
    //    })
    //   }

    // })
   // this.consignment_array=[];
   // this.consignment_array=this.consignment_array_temp;
    var data={
      'consignment_array':this.consignment_array,
      "delivery_executive_id":this.delivery_executive_id,
      "language_id":1
          }
          let url='Assign_Consignment/assign_consignment/';
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
                this.consignment_store_list=JSON.parse(promise.consignment_store_list).Table;
                this.consignment_list=promise.consignment_list
                this.consignment_list_new=promise.consignment_list;
                this.consignment_list_temp=promise.consignment_list;
                this.delivery_exe_dd=JSON.parse(promise.executive_list).Table;       
                this.consignment_generared_list=JSON.parse(promise.consignment_generared_list).Table;
                if(this.delivery_exe_dd=="")
        {
          this.de_message='None of DE Available for Assignment';
        }
                this.consignment_array=[];
                this.delivery_executive_id="";
                this.count_weight=0; 
                this.count_vol_weight=0;  
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

  onTableDataChange(event: any) {
    this.page = event;
  
  }

  onTableDataChange1(event: any) {
    this.page1 = event;
  }
  onTableDataChange2(event: any) {
    this.page2 = event;
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



}

