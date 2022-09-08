import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { json } from '@rxweb/reactive-form-validators';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-master-facilitation',
  templateUrl: './master-facilitation.component.html',
  styleUrls: ['./master-facilitation.component.css']
})
export class MasterFacilitationComponent implements OnInit {
  constructor(private allapi:AllapiService) { }
 
  hform= new FormGroup(
    {
      hubid:new FormControl('',[Validators.required]),
      vemail:new FormControl('',[Validators.required]),
      contact:new FormControl('',[Validators.required,Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
      facilitationname:new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(3),Validators.maxLength(30)]),
      hcountry:new FormControl('',[Validators.required]),
      hstate:new FormControl('',[Validators.required]),
      hcity:new FormControl('',[Validators.required]),
      hpin:new FormControl('',[Validators.required]),
      Address:new FormControl('',[Validators.required])
    });

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  search="";

  screen:any=0
  screenBody:any=0
  submitted=false;

  facilitation_id=0;
  hub_id="";
  facilitation_name="";
  email="";
  contact_no="";
  address="";
  pincode="";
  city_id="";
  state_id="";
  country_id="";
  showadd=false;
  country_list:any;
facilitation_list:any;
state_list:any;
city_list:any;
pincode_list:any;
hub_list:any;

  ngOnInit(): void {
   
    let url='MasterFacilitation/get_data/'
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.country_list=JSON.parse(promise.country_list).Table;
        this.facilitation_list=JSON.parse(promise.facilitation_list).Table;
        this.hub_list=JSON.parse(promise.hub_list).Table;
      })
  }

  get_state(e:any)
  {
    var data={
      "language_id":1,
      "country_id":parseInt(e)
    }
    //console.log(data)
    let getstate='MasterFacilitation/get_state/'
    this.allapi.PostData(getstate,data).subscribe(promise=>{
      this.state_list=JSON.parse(promise.state_list).Table
    })
  }

  get_city(e:any,ss:any)
  {
    this.city_id="";
    var data={
      "language_id":1,
      "country_id":parseInt(e),
      "state_id":parseInt(ss)
    }
    let getstate='MasterFacilitation/get_city/'
    this.allapi.PostData(getstate,data).subscribe(promise=>{
    
      this.city_list=JSON.parse(promise.city_list).Table
    })
  }
  get_city_new(e:any,ss:any)
  {

    var data={
      "language_id":1,
      "country_id":parseInt(e),
      "state_id":parseInt(ss)
    }
    let getstate='MasterFacilitation/get_city/'
    this.allapi.PostData(getstate,data).subscribe(promise=>{
    
      this.city_list=JSON.parse(promise.city_list).Table
    })
  }
  get_pincode(countryid:any,stateid:any,cityid:any)
  {
    var data={
      "language_id":1,
      "country_id":parseInt(countryid),
      "state_id":parseInt(stateid),
      "city_id":parseInt(cityid)
    }
   
    let getstate='MasterFacilitation/get_pincode/'
    this.allapi.PostData(getstate,data).subscribe(promise=>{
        this.pincode_list=JSON.parse(promise.pincode_list).Table
    })
  }
 
  save_data()
  {
    this.submitted=true;
    if(this.hform.invalid)
    {
      return
    }
var data={
"facilitation_id":this.facilitation_id,
"hub_id":parseInt(this.hub_id),
"facilitation_name":this.facilitation_name,
"email":this.email,
"contact_no":parseInt(this.contact_no),
"address":this.address,
"pincode":parseInt(this.pincode),
"city_id":parseInt(this.city_id),
"state_id":parseInt(this.state_id),
"country_id":parseInt(this.country_id),
"language_id":1
}
let url='MasterFacilitation/save_facilitation/';
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
    })
    this.country_list=JSON.parse(promise.country_list).Table;
    this.facilitation_list=JSON.parse(promise.facilitation_list).Table;
    this.hub_list=JSON.parse(promise.hub_list).Table;
    this.facilitation_id=0;
    this.showadd=false;
    this.submitted=false;
    this.hform.reset();
    }
    else if(promise.status=="Update")
    {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: promise.message,
        showConfirmButton: false,
        timer: 3000
    })
    this.country_list=JSON.parse(promise.country_list).Table;
    this.facilitation_list=JSON.parse(promise.facilitation_list).Table;
    this.hub_list=JSON.parse(promise.hub_list).Table;
    this.facilitation_id=0;
    this.showadd=false;
    this.submitted=false;
    this.hform.reset();
    }
    else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: promise.message,
        showConfirmButton: false,
        timer: 3000
    })
    }
  })
  }
  edit_data(ss:any)
  {
   this.facilitation_id=ss.facilitation_id;
   this.hub_id=ss.hub_id;
    this.facilitation_name=ss.facilitation_name;
   this.email=ss.email;
    this.contact_no=ss.contact_no;
    this.address=ss.address;
    this.pincode=ss.pincode;
    this.city_id=ss.city_id;
    this.state_id=ss.state_id;
    this.country_id=ss.country_id;
    this.get_state(this.country_id);
    this.get_city_new(this.country_id,this.state_id)
    this.showadd=true;
  }
  show_add()
  {
    this.showadd=true;
    this.facilitation_id=0;
    this.submitted=false;
    this.hform.reset();
  }
    showlist()
    {
      this.showadd=false;
      this.facilitation_id=0;
      this.submitted=false;
      this.hform.reset();
    }
    clear()
    {
      this.facilitation_id=0;
      this.submitted=false;
      this.hform.reset();
    }
   
    stringify(e:any){
      return JSON.stringify(e)
    }
    //validation
    get f(){
      return this.hform.controls;
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

  onTableDataChange(event: any) {
      this.page = event;
     
    }
}
