import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;
@Component({
  selector: 'app-master-city',
  templateUrl: './master-city.component.html',
  styleUrls: ['./master-city.component.css']
})
export class MasterCityComponent implements OnInit {


  constructor(private allapi:AllapiService) { }
   citydata = new FormGroup({
    v_country_id: new FormControl('',[Validators.required]),
    v_state_id: new FormControl('',[Validators.required]),
    v_city: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]+$")]),
     });
 //validation
 get f(){
  return this.citydata.controls;
}

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  search="";
  closeform:any;
  submitted=false;
  add_status=true;
  country_id="";
  state_id="";
  city_id=0;
  city_name='';
  country_list_dd:any;
  state_list_dd:any;
  city_list:any;

   ngOnInit(): void {
    this.closeform = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );

    let url='Master_Country/get_data_city/';
this.allapi.GetDataById(url,1).subscribe(promise=>
  {
    this.country_list_dd=JSON.parse(promise.country_list_dd).Table;
    this.city_list=JSON.parse(promise.city_list).Table;
  })
  }

  get_state(ss:any)
  {

    var data={
      "country_id":parseInt(ss),
      "language_id":1,

    }
    let url='Master_Country/get_state/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.state_list_dd=JSON.parse(promise.state_list_dd).Table;

      })
  }

  save_city()
  {
    this.submitted = true;

    if(this.citydata.value.v_city.trim() ==''){
      this.citydata.controls['v_city'].setErrors({'required': true})
    }
    if (this.citydata.invalid) {
      return;
    }

    var data={
      "city_id":this.city_id,
      "state_id":this.state_id,
     "country_id":this.country_id,
    "city_name":this.city_name.trim(),
    "activeflg":true,
    "language_id":1,

    }
    let url='Master_Country/save_city/';
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
        this.submitted=false;
        this.citydata.reset();
        this.add_status=true;
        this.country_list_dd=JSON.parse(promise.country_list_dd).Table;
        this.city_list=JSON.parse(promise.city_list).Table;
        this.closeform.hide();
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

      })
  }
  edit_city(ss:any)
  {
    this.add_status=false;
    this.country_id=ss.country_id;
    this.get_state(this.country_id);
    this.state_id=ss.state_id;
    this.city_id=ss.city_id;
    this.city_name=ss.city_name;
    this.closeform.show();
    }
    delete_city(ss:any) {

      Swal.fire({
          title: 'Are you sure?',
          text: "Do You want Delete This!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {

              var data = {
                "city_id":ss.city_id,
                  "language_id": 1
              }
              let url='Master_Country/delete_city';
              this.allapi.PostData(url, data).subscribe(promise=> {

                  if (promise.status == "Delete") {
                    this.country_list_dd=JSON.parse(promise.country_list_dd).Table;
                    this.city_list=JSON.parse(promise.city_list).Table;
                      Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Deleted Successfully',
                          showConfirmButton: false,
                          timer: 3000
                      });

                  }
                  else if(promise.status == "Failed"){
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
      })

    };
    public openModal(){
      this.add_status=true;
        this.submitted=false;
     this.country_id="";
     this.state_id="";
     this.city_id=0;
      this.city_name="";
      this.closeform.show();
    }

    Clear()
    {
      this.add_status=true;
      this.country_id="";
     this.state_id="";
     this.city_id=0;
      this.city_name="";
      this.submitted=false;
      this.citydata.reset();
    }

    onTableDataChange(event: any) {
      this.page = event;
      this.ngOnInit();
    }
}
