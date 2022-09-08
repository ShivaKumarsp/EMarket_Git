import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-master-state',
  templateUrl: './master-state.component.html',
  styleUrls: ['./master-state.component.css']
})
export class MasterStateComponent implements OnInit {

  constructor(private allapi:AllapiService) { }
   statedata = new FormGroup({
    v_country_id: new FormControl('',[Validators.required]),
    v_state: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]+$")]),
     });
 //validation
 get f(){
  return this.statedata.controls;
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
  state_id=0;
  state_name='';
  country_list_dd:any;
  state_list:any;

   ngOnInit(): void {
    this.closeform = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );

    let url='Master_Country/get_data_state/';
this.allapi.GetDataById(url,1).subscribe(promise=>
  {
    this.country_list_dd=JSON.parse(promise.country_list_dd).Table;
    this.state_list=JSON.parse(promise.state_list).Table;
  })
  }

  save_state()
  {
    this.submitted = true;
    if(this.statedata.value.v_state.trim() ==''){
      this.statedata.controls['v_state'].setErrors({'required': true})
    }
    if (this.statedata.invalid) {
      return;
    }

    var data={
      "state_id":this.state_id,
     "country_id":this.country_id,
    "state_name":this.state_name.trim(),
    "activeflg":true,
    "language_id":1,

    }
    let url='Master_Country/save_state/';
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
        this.statedata.reset();
        this.add_status=true;
        this.country_list_dd=JSON.parse(promise.country_list_dd).Table;
        this.state_list=JSON.parse(promise.state_list).Table;
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
  edit_state(ss:any)
  {
    this.add_status=false;
    this.country_id=ss.country_id;
    this.state_id=ss.state_id;
    this.state_name=ss.state_name;
    this.closeform.show();
    }
    delete_state(ss:any) {

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
                "state_id":ss.state_id,
                  "language_id": 1
              }
              let url='Master_Country/delete_state/';
              this.allapi.PostData(url, data).subscribe(promise=> {

                  if (promise.status == "Delete") {
                    this.country_list_dd=JSON.parse(promise.country_list_dd).Table;
                    this.state_list=JSON.parse(promise.state_list).Table;
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
     this.state_id=0;
      this.state_name="";
      this.closeform.show();
    }

    Clear()
    {
      this.add_status=true;
      this.country_id="";
      this.state_id=0;
       this.state_name="";
      this.submitted=false;
      this.statedata.reset();
    }

    onTableDataChange(event: any) {
      this.page = event;
      this.ngOnInit();
    }
}
