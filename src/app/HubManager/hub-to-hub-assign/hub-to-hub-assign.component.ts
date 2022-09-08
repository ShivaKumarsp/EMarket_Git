
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { ReturnOrderRequestComponent } from 'src/app/Vendor/return-order-request/return-order-request.component';
import Swal from 'sweetalert2';
 declare var window:any;
 import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-hub-to-hub-assign',
  templateUrl: './hub-to-hub-assign.component.html',
  styleUrls: ['./hub-to-hub-assign.component.css']
})
export class HubToHubAssignComponent implements OnInit {
  @ViewChild('invoice') invoiceElement!: ElementRef;
  
 
  constructor(private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }
    
    form = new FormGroup({
      deliveryExecutive: new FormControl('',[Validators.required]),
      v_order_by: new FormControl(''),
      v_ischeck: new FormControl(''),
      hubvehicle_id:new FormControl(''),
      route_details:new FormControl(''),
    });
    form1 = new FormGroup({
      deliveryExecutive1: new FormControl('',[Validators.required]),
      v_order_by1: new FormControl(''),
      v_ischeck1: new FormControl(''),
      hubvehicle_id1:new FormControl(''),
   
    });
    
    showlist=0;
    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [3, 6, 9, 12];
    search="";
    submitted=false;
    submitted1=false;
   
    hub_vehicle_id1="";
    delivery_executive_id="";
    delivery_executive_id1="";
    route_id="";
    executive_list_dd:any;
    hub_vehicle_list_dd:any
    hub_to_hub_list:any;
    hub_to_hub_list_temp:any;
    hub_transport_route:any;
  
 
    vehicle_type="";
    order_by="";
    formModel: any;
    formModel1: any;
    total_weight=0;
    total_vol_weight=0;
    pickup_volumetric_weight=0;
    count_weight=0;
    count_vol_weight=0;
    hub_vehicle_id="";
    show_weight=false;
    consignment_list:any;
    consignment_receive:any;
    consignmentid1:any;
    templist:any;
    templist1:any;
    hut_to_hub_array:any;
    hut_to_hub_array_temp:any;
    consignment_fc_hub:any;
    own_vehicle=0;
    batch_print_details:any;
    consignment_hub_fc:any;
    pickup_from_fc_view:any;
    drop_to_fc_view:any;
    hub_to_hub_print_list:any;
    assign_pickup_from_pt_to_hub:any;
    public_vehicle_dd:any;

    pt_to_hub_array:any;
    pt_to_hub_array_temp:any;
  
  ngOnInit(): void {
    
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("openformModal")
    );
    
 
    let url='Assign_Hub_to_Hub/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.hub_to_hub_list=JSON.parse(promise.hub_to_hub_list).Table;   
        this.hub_to_hub_list_temp =JSON.parse(promise.hub_to_hub_list).Table;   
        this.executive_list_dd=JSON.parse(promise.executive_list_dd).Table;  
        this.hub_vehicle_list_dd=JSON.parse(promise.hub_vehicle_list_dd).Table;  
        this.hub_transport_route=JSON.parse(promise.hub_transport_route).Table; 
        this.batch_print_details=JSON.parse(promise.batch_print_details).Table;

// Receive Hub to Hub
this.assign_pickup_from_pt_to_hub=JSON.parse(promise.assign_pickup_from_pt_to_hub).Table;
//this.public_vehicle_dd=JSON.parse(promise.public_vehicle_dd).Table;

// consignment 1
        this.consignment_list = [];
        this.hub_to_hub_list.forEach((dev:any)=> {
            if (this.consignment_list.length === 0) {
              this.consignment_list.push({last_hub_id: dev.last_hub_id,hub_name:dev.hub_name,address:dev.address,pincode:dev.pincode,contact_no:dev.contact_no,email:dev.email,is_check:dev.is_check});
            } else if (this.consignment_list.length > 0) {
                var intcount = 0;
                this.consignment_list.forEach((emp:any)=> {
                    if (emp.last_hub_id === dev.last_hub_id) {
                        intcount += 1;
                    }
                });
                if (intcount === 0) {
                  this.consignment_list.push({last_hub_id: dev.last_hub_id,hub_name:dev.hub_name,address:dev.address,pincode:dev.pincode,contact_no:dev.contact_no,email:dev.email,is_check:dev.is_check});
                }
            }
        });
        this.consignment_list.forEach((ddd:any)=> {
          this.templist = [];
          this.hub_to_hub_list.forEach((dd:any)=> {
              if (dd.last_hub_id === ddd.last_hub_id) {
                this.templist.push(dd);
              }
          });
          ddd.hub_details_list = this.templist;
      });


      // consignment 2
      this.consignment_receive = [];
      this.assign_pickup_from_pt_to_hub.forEach((dev:any)=> {
          if (this.consignment_receive.length === 0) {
            this.consignment_receive.push({batch_id: dev.batch_id,transport_registration_no:dev.transport_registration_no,transport_mode_name:dev.transport_mode_name,is_check:dev.is_check});
          } else if (this.consignment_receive.length > 0) {
              var intcount = 0;
              this.consignment_receive.forEach((emp:any)=> {
                  if (emp.batch_id === dev.batch_id) {
                      intcount += 1;
                  }
              });
              if (intcount === 0) {
                this.consignment_receive.push({batch_id: dev.batch_id,transport_registration_no:dev.transport_registration_no,transport_mode_name:dev.transport_mode_name,is_check:dev.is_check});
              }
          }
      });
      this.consignment_receive.forEach((ddd:any)=> {
        this.templist = [];
        this.assign_pickup_from_pt_to_hub.forEach((dd:any)=> {
            if (dd.batch_id === ddd.batch_id) {
              this.templist.push(dd);
            }
        });
        ddd.hub_receive_details = this.templist;
    });




       })
  }


  change_consignment_list(ss:any)
  {
    this.form.controls["hubvehicle_id"].setValidators(null);
    this.form.controls["hubvehicle_id"].updateValueAndValidity();

    this.hub_vehicle_id="";
    this.vehicle_type="";
    if(ss>0)
    {  
    this.executive_list_dd.forEach((aa:any)=>
    {
    if(aa.delivery_executive_id==ss)
    {   
    this.vehicle_type=aa.vehicle_type;
    if(this.vehicle_type!=null)
    {
      this.show_weight=true;
    }
    else{
      this.show_weight=false;
    }
this.own_vehicle=aa.own_vehicle;
    this.total_weight=aa.max_weight;
    this.total_vol_weight=aa.max_volumetric_weight;
    this.pickup_volumetric_weight=aa.pickup_volumetric_weight;

    if(this.own_vehicle==0)
    {
      this.form.controls["hubvehicle_id"].setValidators([Validators.required]);
      this.form.controls["hubvehicle_id"].updateValueAndValidity();
    }
    else{
      this.form.controls["hubvehicle_id"].setValidators(null);
      this.form.controls["hubvehicle_id"].updateValueAndValidity();
    }
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
  

}
else{

  // this.consignment_list_new=[];
  //  this.consignment_list.forEach((ss:any)=>
  //  {
  //      this.consignment_list_new.push(ss)
     
  //  })
}


    }

    get_vehicle_details(ss:any)
    {
      this.total_weight=0;
      this.total_vol_weight=0;
      this.pickup_volumetric_weight=0;

      this.hub_vehicle_list_dd.forEach((aa:any)=>
      {
      if(aa.hub_vehicle_id==ss)
      {   
      
      this.show_weight=true; 
      this.total_weight=aa.max_weight;
      this.total_vol_weight=aa.max_volumetric_weight;
      this.pickup_volumetric_weight=aa.pickup_volumetric_weight;
     }
    })

    }

    change_route_data(ss:any)
    {
  
      if(ss=="")
      {
        ss=0;
      }
   
      var data={
        "route_id":parseInt(ss),
        "language_id":1
      }
      let url='Assign_Hub_to_Hub/get_route_data/';
      this.allapi.PostData(url,data).subscribe(promise=>
        {
          this.hub_to_hub_list=JSON.parse(promise.hub_to_hub_list).Table;     
           
  // consignment 1
  if(this.hub_to_hub_list==""){
    this.hub_to_hub_list=this.hub_to_hub_list_temp
  }
          this.consignment_list = [];
          this.hub_to_hub_list.forEach((dev:any)=> {
              if (this.consignment_list.length === 0) {
                this.consignment_list.push({last_hub_id: dev.last_hub_id,hub_name:dev.hub_name,address:dev.address,pincode:dev.pincode,contact_no:dev.contact_no,email:dev.email,is_check:dev.is_check});
              } else if (this.consignment_list.length > 0) {
                  var intcount = 0;
                  this.consignment_list.forEach((emp:any)=> {
                      if (emp.last_hub_id === dev.last_hub_id) {
                          intcount += 1;
                      }
                  });
                  if (intcount === 0) {
                    this.consignment_list.push({last_hub_id: dev.last_hub_id,hub_name:dev.hub_name,address:dev.address,pincode:dev.pincode,contact_no:dev.contact_no,email:dev.email,is_check:dev.is_check});
                  }
              }
          });
          this.consignment_list.forEach((ddd:any)=> {
            this.templist = [];
            this.hub_to_hub_list.forEach((dd:any)=> {
                if (dd.last_hub_id === ddd.last_hub_id) {
                  this.templist.push(dd);
                }
            });
            ddd.hub_details_list = this.templist;
        });
      
         })

    }
  

    click_change(ss:any)
    {  
      if(this.hut_to_hub_array!="" && this.hut_to_hub_array!=undefined)
      {
      if(ss.is_check==true)
        {
          this.hut_to_hub_array.push({last_hub_id:ss.last_hub_id})
        }
        else if(ss.is_check==false)
        {       
            this.hut_to_hub_array.forEach((value: { last_hub_id: any; },index: any)=>{
                if(value.last_hub_id==ss.last_hub_id) this.hut_to_hub_array.splice(index,1);
            });
          
        }
       
      }
      else{
        if(ss.is_check==true)
        {
          this.hut_to_hub_array=[];
          this.hut_to_hub_array.push({last_hub_id:ss.last_hub_id})
        }
      }
      
    }

    assign_data()
  {
    this.submitted=true;
    if(this.form.invalid)
    {
      return;
    }
    if(this.hub_to_hub_list!="" && this.hub_to_hub_list!=null && this.hub_to_hub_list.length>0)
    {
    if(this.hut_to_hub_array==""||this.hut_to_hub_array==null)
    {
      Swal.fire({
        position:'center',
         icon:'warning',
         title:'Please Select Atleast One Pickup Checkbox',
         showConfirmButton:false,
         timer:3000
      })
      return;
    }
  }


if(this.hut_to_hub_array!=undefined && this.hut_to_hub_array!="" && this.hut_to_hub_array!=null)
{
    this.hut_to_hub_array_temp=[];
    this.hut_to_hub_array.forEach((one:any)=>
    {
      this.hub_to_hub_list.forEach((two:any)=>
    {
      if(one.last_hub_id==two.last_hub_id)
      {
        this.hut_to_hub_array_temp.push({consignment_id:two.consignment_id,
        tracking_id:two.tracking_id,last_facilitation_id:two.last_facilitation_id,last_hub_id:two.last_hub_id})
      }
    })
    })
  }



  if(this.hub_vehicle_id=="")
  {
    this.hub_vehicle_id="0";
  }

    var data={
'hu_to_hub_array':this.hut_to_hub_array_temp,
"delivery_executive_id":parseInt(this.delivery_executive_id),
"hub_vehicle_id":parseInt(this.hub_vehicle_id),
"hub_route_id":parseInt(this.route_id),
"language_id":1
    }
    let url='Assign_Hub_to_Hub/save_hub_to_hub/';
    this.allapi.PostData(url, data).subscribe(promise=>
      {
        if(promise.status=="Insert")
        {
          Swal.fire({
            position:'center',
             icon:'success',
             title:promise.message,
             showConfirmButton:false,
             timer:3000
          });
          this.delivery_executive_id="";
          this.delivery_executive_id1="";
          this.submitted=false;
          this.form.reset();
        

          this.hub_to_hub_list=JSON.parse(promise.hub_to_hub_list).Table;   
          this.hub_to_hub_list_temp =JSON.parse(promise.hub_to_hub_list).Table;   
          this.executive_list_dd=JSON.parse(promise.executive_list_dd).Table;  
          this.hub_vehicle_list_dd=JSON.parse(promise.hub_vehicle_list_dd).Table;  
          this.hub_transport_route=JSON.parse(promise.hub_transport_route).Table; 
          this.batch_print_details=JSON.parse(promise.batch_print_details).Table;
     // Receive Hub to Hub
         this.assign_pickup_from_pt_to_hub=JSON.parse(promise.assign_pickup_from_pt_to_hub).Table;
  
  // consignment 1
  this.consignment_list = [];
  this.hub_to_hub_list.forEach((dev:any)=> {
      if (this.consignment_list.length === 0) {
        this.consignment_list.push({last_hub_id: dev.last_hub_id,hub_name:dev.hub_name,address:dev.address,pincode:dev.pincode,contact_no:dev.contact_no,email:dev.email,is_check:dev.is_check});
      } else if (this.consignment_list.length > 0) {
          var intcount = 0;
          this.consignment_list.forEach((emp:any)=> {
              if (emp.last_hub_id === dev.last_hub_id) {
                  intcount += 1;
              }
          });
          if (intcount === 0) {
            this.consignment_list.push({last_hub_id: dev.last_hub_id,hub_name:dev.hub_name,address:dev.address,pincode:dev.pincode,contact_no:dev.contact_no,email:dev.email,is_check:dev.is_check});
          }
      }
  });
  this.consignment_list.forEach((ddd:any)=> {
    this.templist = [];
    this.hub_to_hub_list.forEach((dd:any)=> {
        if (dd.last_hub_id === ddd.last_hub_id) {
          this.templist.push(dd);
        }
    });
    ddd.hub_details_list = this.templist;
});
  
  // consignment 2
  this.consignment_receive = [];
  this.assign_pickup_from_pt_to_hub.forEach((dev:any)=> {
      if (this.consignment_receive.length === 0) {
        this.consignment_receive.push({batch_id: dev.batch_id,transport_registration_no:dev.transport_registration_no,transport_mode_name:dev.transport_mode_name,is_check:dev.is_check});
      } else if (this.consignment_receive.length > 0) {
          var intcount = 0;
          this.consignment_receive.forEach((emp:any)=> {
              if (emp.batch_id === dev.batch_id) {
                  intcount += 1;
              }
          });
          if (intcount === 0) {
            this.consignment_receive.push({batch_id: dev.batch_id,transport_registration_no:dev.transport_registration_no,transport_mode_name:dev.transport_mode_name,is_check:dev.is_check});
          }
      }
  });
  this.consignment_receive.forEach((ddd:any)=> {
    this.templist = [];
    this.assign_pickup_from_pt_to_hub.forEach((dd:any)=> {
        if (dd.batch_id === ddd.batch_id) {
          this.templist.push(dd);
        }
    });
    ddd.hub_receive_details = this.templist;
});



        }
        if(promise.status=="Failed")
        {
           Swal.fire({
            position:'center',
             icon:'warning',
             title:promise.message,
             showConfirmButton:false,
             timer:3000
          });
        }
      })
  }
  

  // Second Section

  change_consignment_list_two(ss:any)
  {
    this.form1.controls["hubvehicle_id1"].setValidators(null);
    this.form1.controls["hubvehicle_id1"].updateValueAndValidity();

    this.hub_vehicle_id="";
    this.vehicle_type="";
    if(ss>0)
    {  
    this.executive_list_dd.forEach((aa:any)=>
    {
    if(aa.delivery_executive_id==ss)
    {   
    this.vehicle_type=aa.vehicle_type;
    if(this.vehicle_type!=null)
    {
      this.show_weight=true;
    }
    else{
      this.show_weight=false;
    }
this.own_vehicle=aa.own_vehicle;
    this.total_weight=aa.max_weight;
    this.total_vol_weight=aa.max_volumetric_weight;
    this.pickup_volumetric_weight=aa.pickup_volumetric_weight;

    if(this.own_vehicle==0)
    {
      this.form1.controls["hubvehicle_id1"].setValidators([Validators.required]);
      this.form1.controls["hubvehicle_id1"].updateValueAndValidity();
    }
    else{
      this.form1.controls["hubvehicle_id1"].setValidators(null);
      this.form1.controls["hubvehicle_id1"].updateValueAndValidity();
    }
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
  

}
else{

  // this.consignment_list_new=[];
  //  this.consignment_list.forEach((ss:any)=>
  //  {
  //      this.consignment_list_new.push(ss)
     
  //  })
}


    }

    get_vehicle_details_two(ss:any)
    {
      this.total_weight=0;
      this.total_vol_weight=0;
      this.pickup_volumetric_weight=0;

      this.hub_vehicle_list_dd.forEach((aa:any)=>
      {
      if(aa.hub_vehicle_id==ss)
      {   
      
      this.show_weight=true; 
      this.total_weight=aa.max_weight;
      this.total_vol_weight=aa.max_volumetric_weight;
      this.pickup_volumetric_weight=aa.pickup_volumetric_weight;
     }
    })

    }

  click_change_two(ss:any)
  {  
    if(this.pt_to_hub_array!="" && this.pt_to_hub_array!=undefined)
    {
    if(ss.is_check==true)
      {
        this.pt_to_hub_array.push({batch_id:ss.batch_id})
      }
      else if(ss.is_check==false)
      {       
          this.pt_to_hub_array.forEach((value: { batch_id: any; },index: any)=>{
              if(value.batch_id==ss.batch_id) this.pt_to_hub_array.splice(index,1);
          });
        
      }
     
    }
    else{
      if(ss.is_check==true)
      {
        this.pt_to_hub_array=[];
        this.pt_to_hub_array.push({batch_id:ss.batch_id})
      }
    }
    
  }

  assign_pickpfrom_pt()
  {
    this.submitted1=true;
    if(this.form1.invalid)
    {
      return;
    }
    if(this.consignment_receive!="" && this.consignment_receive!=null && this.consignment_receive.length>0)
    {
    if(this.pt_to_hub_array==""||this.pt_to_hub_array==null)
    {
      Swal.fire({
        position:'center',
         icon:'warning',
         title:'Please Select Atleast One Pickup Checkbox',
         showConfirmButton:false,
         timer:3000
      })
      return;
    }
  }


if(this.pt_to_hub_array!=undefined && this.pt_to_hub_array!="" && this.pt_to_hub_array!=null)
{
    this.pt_to_hub_array_temp=[];
    this.pt_to_hub_array.forEach((one:any)=>
    {
      this.assign_pickup_from_pt_to_hub.forEach((two:any)=>
    {
      if(one.batch_id==two.batch_id)
      {
        this.pt_to_hub_array_temp.push({consignment_id:two.consignment_id, batch_id:two.batch_id})
      }
    })
    })
  }



  if(this.hub_vehicle_id1=="")
  {
    this.hub_vehicle_id1="0";
  }

    var data={
'pt_to_hub_array':this.pt_to_hub_array_temp,
"delivery_executive_id":parseInt(this.delivery_executive_id1),
"hub_vehicle_id":parseInt(this.hub_vehicle_id1),
"language_id":1
    }
    let url='Assign_Hub_to_Hub/assign_pickup_from_pt_to_hub/';
    this.allapi.PostData(url, data).subscribe(promise=>
      {
        if(promise.status=="Insert")
        {
          Swal.fire({
            position:'center',
             icon:'success',
             title:promise.message,
             showConfirmButton:false,
             timer:3000
          });
          this.delivery_executive_id="";
          this.delivery_executive_id1="";
          this.submitted1=false;
          this.form1.reset();
       
      
          this.hub_to_hub_list=JSON.parse(promise.hub_to_hub_list).Table;   
          this.hub_to_hub_list_temp =JSON.parse(promise.hub_to_hub_list).Table;   
          this.executive_list_dd=JSON.parse(promise.executive_list_dd).Table;  
          this.hub_vehicle_list_dd=JSON.parse(promise.hub_vehicle_list_dd).Table;  
          this.hub_transport_route=JSON.parse(promise.hub_transport_route).Table; 
          this.batch_print_details=JSON.parse(promise.batch_print_details).Table;
     // Receive Hub to Hub
         this.assign_pickup_from_pt_to_hub=JSON.parse(promise.assign_pickup_from_pt_to_hub).Table;
  
  // consignment 1
  this.consignment_list = [];
  this.hub_to_hub_list.forEach((dev:any)=> {
      if (this.consignment_list.length === 0) {
        this.consignment_list.push({last_hub_id: dev.last_hub_id,hub_name:dev.hub_name,address:dev.address,pincode:dev.pincode,contact_no:dev.contact_no,email:dev.email,is_check:dev.is_check});
      } else if (this.consignment_list.length > 0) {
          var intcount = 0;
          this.consignment_list.forEach((emp:any)=> {
              if (emp.last_hub_id === dev.last_hub_id) {
                  intcount += 1;
              }
          });
          if (intcount === 0) {
            this.consignment_list.push({last_hub_id: dev.last_hub_id,hub_name:dev.hub_name,address:dev.address,pincode:dev.pincode,contact_no:dev.contact_no,email:dev.email,is_check:dev.is_check});
          }
      }
  });
  this.consignment_list.forEach((ddd:any)=> {
    this.templist = [];
    this.hub_to_hub_list.forEach((dd:any)=> {
        if (dd.last_hub_id === ddd.last_hub_id) {
          this.templist.push(dd);
        }
    });
    ddd.hub_details_list = this.templist;
});
  
  // consignment 2
  this.consignment_receive = [];
  this.assign_pickup_from_pt_to_hub.forEach((dev:any)=> {
      if (this.consignment_receive.length === 0) {
        this.consignment_receive.push({batch_id: dev.batch_id,transport_registration_no:dev.transport_registration_no,transport_mode_name:dev.transport_mode_name,is_check:dev.is_check});
      } else if (this.consignment_receive.length > 0) {
          var intcount = 0;
          this.consignment_receive.forEach((emp:any)=> {
              if (emp.batch_id === dev.batch_id) {
                  intcount += 1;
              }
          });
          if (intcount === 0) {
            this.consignment_receive.push({batch_id: dev.batch_id,transport_registration_no:dev.transport_registration_no,transport_mode_name:dev.transport_mode_name,is_check:dev.is_check});
          }
      }
  });
  this.consignment_receive.forEach((ddd:any)=> {
    this.templist = [];
    this.assign_pickup_from_pt_to_hub.forEach((dd:any)=> {
        if (dd.batch_id === ddd.batch_id) {
          this.templist.push(dd);
        }
    });
    ddd.hub_receive_details = this.templist;
});

 



        }
        if(promise.status=="Failed")
        {
           Swal.fire({
            position:'center',
             icon:'warning',
             title:promise.message,
             showConfirmButton:false,
             timer:3000
          });
        }
      })
  }

  view_data(ss: any) {
   
   
    var data = {
      "batch_id":ss.batch_id,
      "language_id": 1,
    };
    let url = 'Assign_Hub_to_Hub/hub_to_hub_print_data/';
    this.allapi.PostData(url, data).subscribe((promise) => {
      this.hub_to_hub_print_list=JSON.parse(promise.hub_to_hub_print_list).Table;
      if (this.hub_to_hub_print_list != '') {
        
        this.formModel.show();
      }
    });
  }
lable_print()
{
  html2canvas(this.invoiceElement.nativeElement, { scale: 1 }).then(
    (canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight =
        (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4');
      PDF.addImage(
        imageGeneratedFromTemplate,
        'PNG',
        0,
        5,
        fileWidth,
        generatedImageHeight
      );
      PDF.html(this.invoiceElement.nativeElement.innerHTML);
      PDF.save('download.pdf');

    }
  );
}

change_consignment(ss:any)
{
  this.showlist=ss;
}

  onTableDataChange(event: any) {
    this.page = event;
  
  }


  //validation
  get f(){
    return this.form.controls;
  }
  get g(){
    return this.form1.controls;
  }

}

