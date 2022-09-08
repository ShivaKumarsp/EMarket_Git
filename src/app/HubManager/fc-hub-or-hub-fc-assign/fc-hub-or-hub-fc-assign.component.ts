
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
 declare var window:any;
@Component({
  selector: 'app-fc-hub-or-hub-fc-assign',
  templateUrl: './fc-hub-or-hub-fc-assign.component.html',
  styleUrls: ['./fc-hub-or-hub-fc-assign.component.css']
})
export class FcHubOrHubFcAssignComponent implements OnInit {

  
 
  constructor(private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }
    
    formvalid = new FormGroup({
      deliveryExecutive: new FormControl('',[Validators.required]),
      v_ischeck: new FormControl(''),
      hubvehicle_id:new FormControl(''),
      selectOpt:new FormControl(''),
    });
    
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

    delivery_executive_id="";
    delivery_exe_dd:any;
    hub_vehicle_list_dd:any
    consignment_fc_hub_list:any;
    consignment_hub_fc_list:any;
    consignment_fc_hub_list_temp:any;
    consignment_hub_fc_list_temp:any;
 
    vehicle_type="";
    order_by="";
    formModel: any;
    formModel1: any;
    total_weight=0;
    total_vol_weight=0;
    pickup_volumetric_weight=0;
    count_weight=0;
    count_vol_weight=0;
    count_weight1=0;
    count_vol_weight1=0;
    hub_vehicle_id="";
    show_weight=false;
    consignmentid:any;
    consignmentid1:any;
    templist:any;
    templist1:any;
    consignment_array_one:any;
    consignment_array_one_temp:any;
    consignment_array_one_temp_new:any;
    consignment_fc_hub:any;
    own_vehicle=0;
    consignment_array_two:any;
    consignment_array_two_temp:any;
    consignment_array_two_temp_new:any;
    consignment_hub_fc:any;
    pickup_from_fc_view:any;
    drop_to_fc_view:any;
    facilitation_list:any;
    get_data_list:any;
    consignment_string="";
con_count=0
consignment_string1="";
con_count1=0
errormessage="";
errormessage1="";

  //validation
  get f(){
    return this.formvalid.controls;
  }

  ngOnInit(): void {
    
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("formModal_from_fc")
    );
    this.formModel1 = new window.bootstrap.Modal(
      document.getElementById("formModal_to_fc")
    );
 
    let url='Assign_FcHub_HubFc/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.delivery_exe_dd=JSON.parse(promise.executive_list_dd).Table;     
        this.hub_vehicle_list_dd=JSON.parse(promise.hub_vehicle_list_dd).Table;  
        this.consignment_fc_hub_list=promise.consignment_fc_hub_list; 
        this.consignment_hub_fc_list=promise.consignment_hub_fc_list; 

        this.consignment_fc_hub_list_temp=promise.consignment_fc_hub_list; 
        this.consignment_hub_fc_list_temp=promise.consignment_hub_fc_list; 

        this.facilitation_list=JSON.parse(promise.facilitation_list).Table;

// consignment 1
        this.consignmentid = [];
        this.consignment_fc_hub_list.forEach((dev:any)=> {
            if (this.consignmentid.length === 0) {
              this.consignmentid.push({ first_facilitation_id: dev.first_facilitation_id,address:dev.address,is_check:dev.is_check});
            } else if (this.consignmentid.length > 0) {
                var intcount = 0;
                this.consignmentid.forEach((emp:any)=> {
                    if (emp.first_facilitation_id === dev.first_facilitation_id) {
                        intcount += 1;
                    }
                });
                if (intcount === 0) {
                  this.consignmentid.push({ first_facilitation_id: dev.first_facilitation_id,address:dev.address,is_check:dev.is_check});
                }
            }
        });
        this.consignmentid.forEach((ddd:any)=> {
          this.templist = [];
          this.consignment_fc_hub_list.forEach((dd:any)=> {
              if (dd.first_facilitation_id === ddd.first_facilitation_id) {
                this.templist.push(dd);
              }
          });
          ddd.plannerdetails = this.templist;
      });

// consignment 2
this.consignmentid1 = [];
this.consignment_hub_fc_list.forEach((dev:any)=> {
    if (this.consignmentid1.length === 0) {
      this.consignmentid1.push({last_facilitation_id:dev.last_facilitation_id, address:dev.address,is_check:dev.is_check});
    } else if (this.consignmentid1.length > 0) {
        var intcount = 0;
        this.consignmentid1.forEach((emp:any)=> {
            if (emp.last_facilitation_id === dev.last_facilitation_id) {
                intcount += 1;
            }
        });
        if (intcount === 0) {
          this.consignmentid1.push({last_facilitation_id:dev.last_facilitation_id, address:dev.address,is_check:dev.is_check});
        }
    }
});
this.consignmentid1.forEach((ddd:any)=> {
  this.templist1 = [];
  this.consignment_hub_fc_list.forEach((dd:any)=> {
      if (dd.last_facilitation_id === ddd.last_facilitation_id) {
        this.templist1.push(dd);
      }
  });
  ddd.plannerdetails1 = this.templist1;
});



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
      
       })
  }
  change_consignment_list(ss:any)
  {
    this.formvalid.controls["hubvehicle_id"].setValidators(null);
    this.formvalid.controls["hubvehicle_id"].updateValueAndValidity();

    this.hub_vehicle_id="";
    this.vehicle_type="";
    if(ss>0)
    {  
    this.delivery_exe_dd.forEach((aa:any)=>
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
      this.formvalid.controls["hubvehicle_id"].setValidators([Validators.required]);
      this.formvalid.controls["hubvehicle_id"].updateValueAndValidity();
    }
    else{
      this.formvalid.controls["hubvehicle_id"].setValidators(null);
      this.formvalid.controls["hubvehicle_id"].updateValueAndValidity();
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
    view_consignment_from_fc(ss:any)
    {
      this.pickup_from_fc_view=[];
      this.consignment_fc_hub_list.forEach((con:any)=>
      {
        if(ss.first_facilitation_id==con.first_facilitation_id)
        {
          this.pickup_from_fc_view.push(con);
        }
      })
      this.formModel.show();
   
    }
    view_consignment_to_fc(ss:any)
    {
      this.drop_to_fc_view=[];
      this.consignment_hub_fc_list.forEach((con:any)=>
      {
        if(ss.last_facilitation_id==con.last_facilitation_id)
        {
          this.drop_to_fc_view.push(con);
        }
      })
      this.formModel1.show();
   
    }
  
    get_data()
    {
      this.count_weight=0; 
      this.count_vol_weight=0;   
      this.count_weight1=0; 
      this.count_vol_weight1=0;  
     this.get_data_list=[];
       this.formvalid.value.selectOpt.forEach((wtime:any,i:any) => {    
        this.get_data_list.push({'facilitation_id':parseInt(wtime)})
       });
       var cnt=0;
       this.get_data_list.forEach((ss:any)=>
       {
        cnt=cnt+parseInt(ss.facilitation_id)
       })
if(cnt>0)
{
      var data={
       'get_data_list': this.get_data_list,
       "language_id":1
      }
       let url='Assign_FcHub_HubFc/facilitation_wise_data/';
       this.allapi.PostData(url,data).subscribe(promise=>
         {
          this.consignment_fc_hub_list=promise.consignment_fc_hub_list;  
          this.consignment_hub_fc_list=promise.consignment_hub_fc_list;           
              
          // consignment 1
        this.consignmentid = [];
        this.consignment_fc_hub_list.forEach((dev:any)=> {
            if (this.consignmentid.length === 0) {
              this.consignmentid.push({ batch_id: dev.batch_id,address:dev.address,is_check:dev.is_check});
            } else if (this.consignmentid.length > 0) {
                var intcount = 0;
                this.consignmentid.forEach((emp:any)=> {
                    if (emp.batch_id === dev.batch_id) {
                        intcount += 1;
                    }
                });
                if (intcount === 0) {
                  this.consignmentid.push({ batch_id: dev.batch_id,address:dev.address,is_check:dev.is_check});
                }
            }
        });
        this.consignmentid.forEach((ddd:any)=> {
          this.templist = [];
          this.consignment_fc_hub_list.forEach((dd:any)=> {
              if (dd.batch_id === ddd.batch_id) {
                this.templist.push(dd);
              }
          });
          ddd.plannerdetails = this.templist;
      });

// consignment 2
this.consignmentid1 = [];
this.consignment_hub_fc_list.forEach((dev:any)=> {
    if (this.consignmentid1.length === 0) {
      this.consignmentid1.push({last_facilitation_id:dev.last_facilitation_id, address:dev.address,is_check:dev.is_check});
    } else if (this.consignmentid1.length > 0) {
        var intcount = 0;
        this.consignmentid1.forEach((emp:any)=> {
            if (emp.last_facilitation_id === dev.last_facilitation_id) {
                intcount += 1;
            }
        });
        if (intcount === 0) {
          this.consignmentid1.push({last_facilitation_id:dev.last_facilitation_id, address:dev.address,is_check:dev.is_check});
        }
    }
});
this.consignmentid1.forEach((ddd:any)=> {
  this.templist1 = [];
  this.consignment_hub_fc_list.forEach((dd:any)=> {
      if (dd.last_facilitation_id === ddd.last_facilitation_id) {
        this.templist1.push(dd);
      }
  });
  ddd.plannerdetails1 = this.templist1;
});

          })
        }
        else{
          this.consignment_fc_hub_list=this.consignment_fc_hub_list_temp;
          this.consignment_hub_fc_list=this.consignment_hub_fc_list_temp; 
          // consignment 1
        this.consignmentid = [];
        this.consignment_fc_hub_list.forEach((dev:any)=> {
            if (this.consignmentid.length === 0) {
              this.consignmentid.push({ batch_id: dev.batch_id,address:dev.address,is_check:dev.is_check});
            } else if (this.consignmentid.length > 0) {
                var intcount = 0;
                this.consignmentid.forEach((emp:any)=> {
                    if (emp.batch_id === dev.batch_id) {
                        intcount += 1;
                    }
                });
                if (intcount === 0) {
                  this.consignmentid.push({ batch_id: dev.batch_id,address:dev.address,is_check:dev.is_check});
                }
            }
        });
        this.consignmentid.forEach((ddd:any)=> {
          this.templist = [];
          this.consignment_fc_hub_list.forEach((dd:any)=> {
              if (dd.batch_id === ddd.batch_id) {
                this.templist.push(dd);
              }
          });
          ddd.plannerdetails = this.templist;
      });

// consignment 2
this.consignmentid1 = [];
this.consignment_hub_fc_list.forEach((dev:any)=> {
    if (this.consignmentid1.length === 0) {
      this.consignmentid1.push({last_facilitation_id:dev.last_facilitation_id, address:dev.address,is_check:dev.is_check});
    } else if (this.consignmentid1.length > 0) {
        var intcount = 0;
        this.consignmentid1.forEach((emp:any)=> {
            if (emp.last_facilitation_id === dev.last_facilitation_id) {
                intcount += 1;
            }
        });
        if (intcount === 0) {
          this.consignmentid1.push({last_facilitation_id:dev.last_facilitation_id, address:dev.address,is_check:dev.is_check});
        }
    }
});
this.consignmentid1.forEach((ddd:any)=> {
  this.templist1 = [];
  this.consignment_hub_fc_list.forEach((dd:any)=> {
      if (dd.last_facilitation_id === ddd.last_facilitation_id) {
        this.templist1.push(dd);
      }
  });
  ddd.plannerdetails1 = this.templist1;
});

        }
    }


    closeModal(){
      this.formModel.hide();
    }
    click_change(ss:any)
    {  
      if(this.consignment_array_one!="" && this.consignment_array_one!=undefined)
      {
      if(ss.is_check==true)
        {
          this.consignment_array_one.push({first_facilitation_id:ss.first_facilitation_id})
        }
        else if(ss.is_check==false)
        {       
            this.consignment_array_one.forEach((value: { first_facilitation_id: any; },index: any)=>{
                if(value.first_facilitation_id==ss.first_facilitation_id) this.consignment_array_one.splice(index,1);
            });
          
        }
       
      }
      else{
        if(ss.is_check==true)
        {
          this.consignment_array_one=[];
          this.consignment_array_one.push({first_facilitation_id:ss.first_facilitation_id})
        }
      }
      
      if(this.consignment_array_one!="")
      {
       this.count_weight=0;
       this.count_vol_weight=0;
       this.consignment_array_one.forEach((ss:any)=>
       {
        this.consignment_fc_hub_list.forEach((aa:any)=>
        {
          if(ss.first_facilitation_id==aa.first_facilitation_id)
          {
            this.count_weight=this.count_weight+aa.weight;
            this.count_vol_weight=this.count_vol_weight+aa.volumetric_weight;
          }
       
        })
      
       })
     }
 
     if(this.consignment_array_one=="")
     {
          this.count_weight=0; 
          this.count_vol_weight=0;     
    }

    
    }

    click_change_two(ss:any)
    {  
      if(this.consignment_array_two!="" && this.consignment_array_two!=undefined)
      {
      if(ss.is_check==true)
        {
          this.consignment_array_two.push({last_facilitation_id:ss.last_facilitation_id,consignment_id:ss.consignment_id,
            tracking_id:ss.tracking_id})
        }
        else if(ss.is_check==false)
        {       
            this.consignment_array_two.forEach((value: { last_facilitation_id: any; },index: any)=>{
                if(value.last_facilitation_id==ss.last_facilitation_id) this.consignment_array_two.splice(index,1);
            });
          
        }
       
      }
      else{
        if(ss.is_check==true)
        {
          this.consignment_array_two=[];
          this.consignment_array_two.push({last_facilitation_id:ss.last_facilitation_id,consignment_id:ss.consignment_id,
            tracking_id:ss.tracking_id})
        }
      }
      
      if(this.consignment_array_two!="")
      {
       this.count_weight=0;
       this.count_vol_weight=0;
       this.consignment_array_two.forEach((ss:any)=>
       {
        this.consignment_hub_fc_list.forEach((aa:any)=>
        {
          if(ss.last_facilitation_id==aa.last_facilitation_id)
          {
            this.count_weight1=this.count_weight+aa.weight;
            this.count_vol_weight1=this.count_vol_weight+aa.volumetric_weight;
          }
       
        })
      
       })
     }
 
     if(this.consignment_array_two=="")
     {
          this.count_weight1=0; 
          this.count_vol_weight1=0;     
    }

    }

   
  onLogClick()
  {
    this.submitted=true;
    if(this.formvalid.invalid)
    {
      return;
    }
    var checkcount=0;
    if(this.consignment_fc_hub_list!="" && this.consignment_fc_hub_list!=null && this.consignment_fc_hub_list.length>0)
    {
    if(this.consignment_array_one==""||this.consignment_array_one==null)
    {
      checkcount=1;
    }
  }
  var checkcount1=0;
  if(this.consignment_hub_fc_list!="" && this.consignment_hub_fc_list!=null && this.consignment_hub_fc_list.length>0)
  {
  if(this.consignment_array_two==""||this.consignment_array_two==null)
  {
    checkcount1=1;
  }
}

if(checkcount==1 && checkcount1==1)
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





if(this.consignment_array_one!=undefined && this.consignment_array_one!="" && this.consignment_array_one!=null)
{
    this.consignment_array_one_temp=[];
    this.consignment_array_one_temp_new=[];
    this.consignment_array_one.forEach((one:any)=>
    {
      this.consignment_fc_hub_list.forEach((two:any)=>
    {
      if(one.first_facilitation_id==two.first_facilitation_id)
      {
        this.consignment_array_one_temp.push({first_facilitation_id:two.first_facilitation_id, consignment_id:two.consignment_id,
        tracking_id:two.tracking_id})
        this.consignment_array_one_temp_new.push({consignment_id:two.consignment_id,
          volumetric_weight:two.volumetric_weight,weight:two.weight})
      }
    })
    })
  }

  if(this.consignment_array_two!=undefined && this.consignment_array_two!="" && this.consignment_array_two!=null)
  {
    this.consignment_array_two_temp=[];
    this.consignment_array_two_temp_new=[];
this.consignment_array_two.forEach((one:any)=>
{
  this.consignment_hub_fc_list.forEach((two:any)=>
{
  if(one.last_facilitation_id==two.last_facilitation_id)
  {
    this.consignment_array_two_temp.push({consignment_id:two.consignment_id,
    tracking_id:two.tracking_id});
    this.consignment_array_two_temp_new.push({consignment_id:two.consignment_id,
      volumetric_weight:two.volumetric_weight,weight:two.weight})
  }
})
})
  }

  // check consignment 1
  this.consignment_string="";
this.con_count=0;
if(this.consignment_array_one_temp_new!=undefined)
{
this.consignment_array_one_temp_new.forEach((ss:any)=>
{   
if(ss.volumetric_weight>=this.pickup_volumetric_weight)
{
 this.con_count=this.con_count+1;
 this.consignment_string=this.consignment_string+","+ss.consignment_id;
}
}) 
if(this.con_count>0)
{


this.errormessage=this.consignment_string+' This Consignment Valumetric Is To High, Please Reduce Valumetricm or Select High Valumetric Vehicle';
Swal.fire({
 position: 'center',
 icon: 'warning',
 title: this.consignment_string+' This Consignment Valumetric Is To High, Please Reduce Valumetricm or Select High Valumetric Vehicle (Pickup From Facilitation Grid)',
 showConfirmButton: false,
 timer: 5000
})

return
}
}


 // check consignment 2
 this.consignment_string1="";
 this.con_count1=0;
 if(this.consignment_array_two_temp_new!=undefined)
{
 this.consignment_array_two_temp_new.forEach((ss:any)=>
 {   
 if(ss.volumetric_weight>=this.pickup_volumetric_weight)
 {
  this.con_count1=this.con_count1+1;
  this.consignment_string1=this.consignment_string1+","+ss.consignment_id;
 }
 }) 
 if(this.con_count1>0)
 {
 

 this.errormessage1=this.consignment_string1+' This Consignment Valumetric Is To High, Please Reduce Valumetricm or Select High Valumetric Vehicle';
 Swal.fire({
  position: 'center',
  icon: 'warning',
  title: this.consignment_string1+' This Consignment Valumetric Is To High, Please Reduce Valumetricm or Select High Valumetric Vehicle (Hub To Facilitation Grid)',
  showConfirmButton: false,
  timer: 5000
 })
 
 return
 }
}

 


  if(this.hub_vehicle_id=="")
  {
    this.hub_vehicle_id="0";
  }

    var data={
'consignment_array_fc_hub':this.consignment_array_one_temp,
'consignment_array_hub_fc':this.consignment_array_two_temp,
"delivery_executive_id":parseInt(this.delivery_executive_id),
"hub_vehicle_id":parseInt(this.hub_vehicle_id),
"language_id":1
    }
    let url='Assign_FcHub_HubFc/save_fchub_hubfc/';
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
          this.submitted=false;
          this.formvalid.reset();


          this.delivery_exe_dd=JSON.parse(promise.executive_list_dd).Table;     
          this.hub_vehicle_list_dd=JSON.parse(promise.hub_vehicle_list_dd).Table;  
          this.consignment_fc_hub_list=promise.consignment_fc_hub_list; 
          this.consignment_hub_fc_list=promise.consignment_hub_fc_list;   
          this.consignment_fc_hub_list_temp=promise.consignment_fc_hub_list; 
          this.consignment_hub_fc_list_temp=promise.consignment_hub_fc_list; 
          this.facilitation_list=JSON.parse(promise.facilitation_list).Table;
  // consignment 1
          this.consignmentid = [];
          this.consignment_fc_hub_list.forEach((dev:any)=> {
              if (this.consignmentid.length === 0) {
                this.consignmentid.push({ batch_id: dev.batch_id,address:dev.address,is_check:dev.is_check});
              } else if (this.consignmentid.length > 0) {
                  var intcount = 0;
                  this.consignmentid.forEach((emp:any)=> {
                      if (emp.batch_id === dev.batch_id) {
                          intcount += 1;
                      }
                  });
                  if (intcount === 0) {
                    this.consignmentid.push({ batch_id: dev.batch_id,address:dev.address,is_check:dev.is_check});
                  }
              }
          });
          this.consignmentid.forEach((ddd:any)=> {
            this.templist = [];
            this.consignment_fc_hub_list.forEach((dd:any)=> {
                if (dd.batch_id === ddd.batch_id) {
                  this.templist.push(dd);
                }
            });
            ddd.plannerdetails = this.templist;
        });
  
  // consignment 2
  this.consignmentid1 = [];
  this.consignment_hub_fc_list.forEach((dev:any)=> {
      if (this.consignmentid1.length === 0) {
        this.consignmentid1.push({ last_facilitation_id: dev.last_facilitation_id,address:dev.address,is_check:dev.is_check});
      } else if (this.consignmentid1.length > 0) {
          var intcount = 0;
          this.consignmentid1.forEach((emp:any)=> {
              if (emp.last_facilitation_id === dev.last_facilitation_id) {
                  intcount += 1;
              }
          });
          if (intcount === 0) {
            this.consignmentid1.push({ last_facilitation_id: dev.last_facilitation_id,address:dev.address,is_check:dev.is_check});
          }
      }
  });
  this.consignmentid1.forEach((ddd:any)=> {
    this.templist1 = [];
    this.consignment_hub_fc_list.forEach((dd:any)=> {
        if (dd.last_facilitation_id === ddd.last_facilitation_id) {
          this.templist1.push(dd);
        }
    });
    ddd.plannerdetails1 = this.templist1;
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



  onTableDataChange(event: any) {
    this.page = event;
  
  }

  onTableDataChange1(event: any) {
    this.page1 = event;
  }
  onTableDataChange2(event: any) {
    this.page2 = event;
  }




}

