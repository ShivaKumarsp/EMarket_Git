import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-master-vehicle-type',
  templateUrl: './master-vehicle-type.component.html',
  styleUrls: ['./master-vehicle-type.component.css']
})
export class MasterVehicleTypeComponent implements OnInit {

  
  //patterns
 pincodepat="/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/"
 panpat="/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/"
 emailpat="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/"
 phonepat="/^[6-9][0-9]{9}$/"
 userProfileImage:String="https://cdn-icons-png.flaticon.com/512/149/149071.png";
 submitted = false;

  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService,
   private formBuilder: FormBuilder,
   private spinner:NgxSpinnerService) {}

    vehiclevalid = new FormGroup({   
    v_vehicle_type: new FormControl('',[Validators.required]),    
    v_vehicle_type_details: new FormControl('',[Validators.required]), 
    v_max_weight: new FormControl('',[Validators.required]), 
    v_max_volumetric_length: new FormControl('',[Validators.required]), 
    v_max_volumetric_breadth: new FormControl('',[Validators.required]), 
    v_max_volumetric_height: new FormControl('',[Validators.required]), 
    v_pickup_type: new FormControl('',[Validators.required]), 
    v_pickup_volumetric_length: new FormControl('',[Validators.required]), 
    v_pickup_volumetric_breadth: new FormControl('',[Validators.required]), 
    v_pickup_volumetric_heigth: new FormControl('',[Validators.required])
  });

 
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  search="";
  vehicle_type_id=0;
  vehicle_type="";
  vehicle_type_details="";
  max_weight="";
  max_volumetric_length="";
  max_volumetric_breadth="";
  max_volumetric_height="";
  pickup_type="";
  pickup_volumetric_length="";
  pickup_volumetric_breadth="";
  pickup_volumetric_heigth="";
  vehicle_type_list:any;
  validation_list:any;

  ngOnInit(): void { 

 let url='Master_Vehicle_Type/get_data/';
      var sid = 1;
      this.allapi.GetDataById(url, sid).subscribe(promise=> {
            
         this.vehicle_type_list=JSON.parse(promise.vehicle_type_list).Table;

      });
      this.spinner.hide();
  }

  save()
  {
    this.submitted=true;
    if(this.vehiclevalid.invalid)
    {
      return;
    }
var data={
  "vehicle_type_id":this.vehicle_type_id,
  "vehicle_type":this.vehicle_type,
  "vehicle_type_details":this.vehicle_type_details,
  "max_weight":this.max_weight, 
  "max_volumetric_length":this.max_volumetric_length,
  "max_volumetric_breadth":this.max_volumetric_breadth,
  "max_volumetric_height":this.max_volumetric_height,
  "pickup_type":this.pickup_type, 
  "pickup_volumetric_length":this.pickup_volumetric_length,
  "pickup_volumetric_breadth":this.pickup_volumetric_breadth, 
  "pickup_volumetric_heigth":this.pickup_volumetric_heigth
}
let url='Master_Vehicle_Type/save_vehicle_type/';
this.allapi.PostData(url, data).subscribe(promise=>
  {
    if(promise.status=="Insert")
    {
      this.vehicle_type_list=JSON.parse(promise.vehicle_type_list).Table;
      Swal.fire({
          position:'center',
          icon:'success',
          title:promise.message,
          showConfirmButton:false,
          timer:3000
      })
      this.submitted=false;
      this.vehicle_type_id=0;
      this.vehiclevalid.reset();
    }
    if(promise.status=="Validation")
    {
      this.validation_list=promise.validation_list;
      Swal.fire({
          position:'center',
          icon:'warning',
          title:'Please Enter All Mandatory Filed',
          showConfirmButton:false,
          timer:3000
      })
 
    }
    if(promise.status=="Failed")
    {
 
      Swal.fire({
          position:'center',
          icon:'warning',
          title:promise.message,
          showConfirmButton:false,
          timer:3000
      })
 
    }
  })
  }
  edit(ss:any)
  {
    this.vehicle_type_id=ss.vehicle_type_id;
    this.vehicle_type=ss.vehicle_type;
   this.vehicle_type_details=ss.vehicle_type_details;
    this.max_weight=ss.max_weight;
   this.max_volumetric_length=ss.max_volumetric_length;
    this.max_volumetric_breadth=ss.max_volumetric_breadth;
    this.max_volumetric_height=ss.max_volumetric_height;
   this.pickup_type=ss.pickup_type;
    this.pickup_volumetric_length=ss.pickup_volumetric_length;
    this.pickup_volumetric_breadth=ss.pickup_volumetric_breadth;
    this.pickup_volumetric_heigth=ss.pickup_volumetric_heigth;
  }
  clear()
  {
    this.submitted=false;
    this.vehiclevalid.reset();
  }

   
get f() {
  return this.vehiclevalid.controls;
}

keyPressSpace(event:any) {
  if(event.target.selectionStart===0 && event.code==='Space')
  {
    event.preventDefault();       
  }
}
keyPressSpace1(event:any) {
  if(event.code==='Space')
  {
    event.preventDefault();       
  }
}

keyPressnumber(event:any) {
  var inp = String.fromCharCode(event.keyCode);
  if (/[0-9.0-9]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

onTableDataChange(event: any) {
  this.page = event;

}

}
