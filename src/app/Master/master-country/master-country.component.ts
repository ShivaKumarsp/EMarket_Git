import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;


@Component({
  selector: 'app-master-country',
  templateUrl: './master-country.component.html',
  styleUrls: ['./master-country.component.css']
})
export class MasterCountryComponent implements OnInit {

 
  constructor(private allapi:AllapiService) { }

   countrydata = new FormGroup({
    v_country: new FormControl('',[Validators.required]),
     });
 //validation
 get f(){
  return this.countrydata.controls;
}

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  search="";
  closeform:any;
  submitted=false;
  add_status=true;
  country_id=0;
  country_name='';
  country_list:any;

   ngOnInit(): void {
    this.closeform = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );

    let url='Master_Country/get_data_country/';
this.allapi.GetDataById(url,1).subscribe(promise=>
  {
    this.country_list=JSON.parse(promise.country_list).Table;
 
  })
  } 

  save_country()
  {
    this.submitted = true;
    if (this.countrydata.invalid) {
      return;
    }
   
    var data={
     "country_id":this.country_id,
    "country_name":this.country_name,
    "activeflg":true,
    "language_id":1,
    
    }
    let url='Master_Country/save_country/';
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
        this.country_id=0;
        this.country_name='';
        this.country_list=JSON.parse(promise.country_list).Table;       
        this.closeform.hide();
        this.add_status=true;
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
  edit_country(ss:any)
  {
    this.add_status=false;
    this.country_id=ss.country_id;
    this.country_name=ss.country_name;
    this.closeform.show();
    }
    delete_country(ss:any) {

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
                "country_id":ss.country_id,
                  "language_id": 1
              }
              let url='Master_Country/delete_country/';
              this.allapi.PostData(url, data).subscribe(promise=> {
    
                  if (promise.status == "Delete") {
                    this.country_list=JSON.parse(promise.country_list).Table;
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
     this.country_id=0;
      this.country_name="";     
      this.closeform.show();
    }

    Clear()
    {
      this.add_status=true;
      this.country_id=0;
      this.country_name='';
      this.submitted=false;
      this.countrydata.reset();
    }

    onTableDataChange(event: any) {
      this.page = event;
      this.ngOnInit();
    }
}