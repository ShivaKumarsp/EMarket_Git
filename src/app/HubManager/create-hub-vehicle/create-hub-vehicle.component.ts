import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-hub-vehicle',
  templateUrl: './create-hub-vehicle.component.html',
  styleUrls: ['./create-hub-vehicle.component.css']
})
export class CreateHubVehicleComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService,
   private formBuilder: FormBuilder,
   private spinner:NgxSpinnerService) { }

  vehiclevalid=new FormGroup({
    v_vehicle_type:new  FormControl('',[Validators.required]),
    v_vehicle_reg_number:new  FormControl('',[Validators.required,Validators.minLength(3)]),
    v_vehicle_details:new  FormControl('',[Validators.required,Validators.minLength(3)]),
    
    v_is_belong:new FormControl('',[Validators.required]),
    v_hub:new FormControl(),
  })
  search="";
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  submitted=false;
  hub_vehicle_id=0;
  vehicle_type_id="";
vehicle_reg_number="";
vehicle_details="";

hub_vehicle_list:any;
validation_list:any;
vehicle_type_list:any;
belongs_to="";
hub_or_fc_list:any;
hub_id="";
  ngOnInit(): void {
    let url='UserCreation/get_vehicle_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.hub_vehicle_list=JSON.parse(promise.hub_vehicle_list).Table;
        this.vehicle_type_list=JSON.parse(promise.vehicle_type_list).Table;
   
      })
  }
 
  change_fc(ss:any)
  {
if(ss=='FC')
{
 
  this.vehiclevalid.controls["v_hub"].setValidators([Validators.required]);
  this.vehiclevalid.controls["v_hub"].updateValueAndValidity();
}
if(ss=='HUB')
{
  this.hub_id="0";
  this.vehiclevalid.controls["v_hub"].setValidators(null);
  this.vehiclevalid.controls["v_hub"].updateValueAndValidity();
}
if(ss=='FC')
    {
      var data={
      "hub_type":ss,
      "language_id":1
      }
      let url='UserCreation/get_hub/';
      this.allapi.PostData(url,data).subscribe(promise=>
        {
          this.hub_or_fc_list=JSON.parse(promise.hub_or_fc_list).Table;
        })
    }

  }
  save()
  {
  

    this.submitted=true;
   
    if(this.vehiclevalid.invalid)
    {
      return;
    }
    if(this.hub_id=="")
    {
      this.hub_id="0";
    }
    var data={
      "hub_vehicle_id":this.hub_vehicle_id,
      "vehicle_type_id":this.vehicle_type_id,
      "vehicle_reg_number":this.vehicle_reg_number,
      "vehicle_details":this.vehicle_details,
     
      "is_active":true,
      "belongs_to":this.belongs_to,
      "hub_id":parseInt(this.hub_id),
      "language_id":1
    }
    let url='UserCreation/save_vehicle_data/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        if(promise.status=="Insert")
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: promise.message,
            showConfirmButton: false,
            timer: 3000
        });
        this.hub_vehicle_list=JSON.parse(promise.hub_vehicle_list).Table;
           this.vehicle_type_list=JSON.parse(promise.vehicle_type_list).Table;
        this.submitted=false;
        this.hub_vehicle_id=0;
        this.vehiclevalid.reset();
        }
        else if(promise.status=="Validadtion")
        {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: promise.message,
            showConfirmButton: false,
            timer: 3000
        });
        this.validation_list=promise.validation_list;
        }
        else if(promise.status=="Failed")
        {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: promise.message,
            showConfirmButton: false,
            timer: 3000
        });
        }
      })
  }
  edit(ss:any)
  {
    this.hub_vehicle_id=ss.hub_vehicle_id;
   this.vehicle_type_id=ss.vehicle_type_id;
   this.vehicle_reg_number=ss.vehicle_reg_number;
    this.vehicle_details=ss.vehicle_details;
 
    this.belongs_to=ss.belongs_to;
    this.hub_id=ss.hub_id;
    this.change_fc(this.belongs_to);

  }

  clear()
  {
    this.hub_vehicle_id=0;
    this.submitted=false;
    this.vehiclevalid.reset();
  }
  onTableDataChange(event: any) {
    this.page = event;
  }

  get f(){
    return this.vehiclevalid.controls;
  }
  keyPressSpace(event:any) {
    if( event.code==='Space')
    {
      event.preventDefault();       
    }
  }
  keyPressSpace1(event:any) {
    if(event.target.selectionStart===0 && event.code==='Space')
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

}
