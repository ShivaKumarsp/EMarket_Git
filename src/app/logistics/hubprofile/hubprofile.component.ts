import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { json } from '@rxweb/reactive-form-validators';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hubprofile',
  templateUrl: './hubprofile.component.html',
  styleUrls: ['./hubprofile.component.css']
})
export class HubprofileComponent implements OnInit {
  constructor( private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder: FormBuilder) { }
 
  hform= new FormGroup(
    {
      hub_id:new FormControl(''),
      hname:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9_ ]*$")]),
      email:new FormControl('',[Validators.required,Validators.email]),
      contact:new FormControl('',[Validators.required,Validators.minLength(10)]),
      Address:new FormControl('',[Validators.required,Validators.minLength(5)]),
      hcity:new FormControl('',[Validators.required]),
      hstate:new FormControl('',[Validators.required]),
      hpin:new FormControl('',[Validators.required]),
      delpin:new FormControl(''),
      hcountry:new FormControl('',[Validators.required]),
      htype:new FormControl(''),
      Phub:new FormControl('')
    }

  );

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  search="";
  submitted=false;

  
  showadd=false;
  hub_id=0;
  country_id="";
  state_id="";
  city_id="";
  pincode="";
  hub_name="";
  email="";
  contact_no="";
  address="";

  hublist:any
  state_list:any
  country_list:any
  city_list:any;

  ngOnInit(): void {
   
    let gethub='Managehub/get/'
    this.allapi.GetDataById(gethub,1).subscribe(promise=>{
    
      this.country_list=JSON.parse(promise.countrylist).Table   
      this.hublist=JSON.parse(promise.hublist).Table;
    
  })
};

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
 
 
  save_data()
  {

    this.submitted=true;
    if(this.hform.invalid)
    {
      return
    }
var data={

"hub_id":this.hub_id,
"hub_name":this.hub_name,
"email":this.email,
"contact_no":parseInt(this.contact_no),
"address":this.address,
"pincode":parseInt(this.pincode),
"hub_city":parseInt(this.city_id),
"hub_state":parseInt(this.state_id),
"hub_country":parseInt(this.country_id),
"language_id":1
}
let url='Managehub/save_hub/';
this.allapi.PostData(url,data).subscribe(promise=>
  {
    if (promise.msg_flg == "Save") {
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'updated Successfully',
          showConfirmButton: false,
          timer: 3000
      })
      this.hub_id=0;
      window.location.reload();
    }
    else if(promise.status=="Failed")
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Not updated, Please Try Again',
        showConfirmButton: false,
        timer: 3000
    })  

    }
    else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Not updated, Please Try Again',
        showConfirmButton: false,
        timer: 3000
    })
    }
  })
  }
  edit_data(ss:any)
  {
  
    this.hub_id=ss.in_hub_id;
    this.hub_name=ss.in_hub_name;
    this.email=ss.in_email;
    this.contact_no=ss.in_contact_no;
    this.address=ss.in_address;
    this.pincode=ss.in_pincode;
    this.city_id=ss.in_hub_city;
    this.state_id=ss.in_hub_state;
    this.country_id=ss.in_hub_country;

    this.get_state(this.country_id);
    this.get_city_new(this.country_id,this.state_id)
    this.showadd=true;
  }
  show_add()
  {
    this.showadd=true;
    this.hub_id=0;
    this.submitted=false;
    this.hform.reset();
  }
    showlist()
    {
      this.showadd=false;
      this.hub_id=0;
      this.submitted=false;
      this.hform.reset();
    }
    clear()
    {
      this.hub_id=0;
      this.submitted=false;
      this.hform.reset();
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
