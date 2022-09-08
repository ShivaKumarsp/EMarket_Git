import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-specification-attributename-map',
  templateUrl: './specification-attributename-map.component.html',
  styleUrls: ['./specification-attributename-map.component.css']
})
export class SpecificationAttributenameMapComponent implements OnInit {

  //form:FormGroup
  submitted = false;
specification_dd:any
specification_attribute_list:any
attribute_name_dd:any;
specification_id="";
attribute_name_id="";
spe_attr_id=0
total = 0;
page: number = 1;
count: number = 0;
tableSize: number = 7;
tableSizes: any = [3, 6, 9, 12];
search="";
specattr = new FormGroup({
  specname: new FormControl('',[Validators.required]),
  attribute: new FormControl('',[Validators.required]),
});

  constructor(private httpClient: HttpClient,
     private formBuilder: FormBuilder,
    private allapi: AllapiService) { }
    get f(){
        return this.specattr.controls;
      }
      // get f(): { [key: string]: AbstractControl } {
      //   return this.specattr.controls;
      // }

      // get specname() {
      //   return this.specattr.get('specname')!;
      // }
    
      // get attribute() {
      //   return this.specattr.get('attribute')!;
      // }
      
  ngOnInit(): void {
        var sid = 1;
    let geturl='Map_Specification_Attribute/get_data/'
            this.allapi.GetDataById(geturl, sid).subscribe(promise=> {
               this.specification_dd =JSON.parse(promise.specification_dd).Table;
                this.specification_attribute_list =JSON.parse(promise.specification_attribute_list).Table;
           
            });
  }

  get_attribute_name(ss:any)
  {
    var data={
"specification_id":parseInt(ss),
"language_id":1
    }
    let geturl='Map_Specification_Attribute/get_attribute_name/'
    this.allapi.PostData(geturl, data).subscribe(promise=> {
      this.attribute_name_dd =JSON.parse(promise.attribute_name_dd).Table;   
      this.specification_attribute_list =JSON.parse(promise.specification_attribute_list).Table;
   });
  }

  savedata()
  {
    this.submitted = true;
    if (this.specattr.invalid) {
      return;
    }

    
var data={
  "spe_attr_id":this.spe_attr_id,
  "specification_id":parseInt(this.specification_id),
  "attribute_name_id":parseInt(this.attribute_name_id),
  "language_id":1
}
let geturl='Map_Specification_Attribute/save_data/'
this.allapi.PostData(geturl, data).subscribe(promise=> {
  if(promise.status=="Insert")
  {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: promise.message,
      showConfirmButton: false,
      timer: 1000
  })
  this.submitted=false;
  this.specattr.reset();
  this.specification_attribute_list =JSON.parse(promise.specification_attribute_list).Table;
  this.attribute_name_dd =JSON.parse(promise.attribute_name_dd).Table; 
  } 
  else if(promise.status=="Update")
  {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: promise.message,
      showConfirmButton: false,
      timer: 1000
  })
  this.submitted=false;
  this.specattr.reset();
  this.specification_attribute_list =JSON.parse(promise.specification_attribute_list).Table;
  this.attribute_name_dd =JSON.parse(promise.attribute_name_dd).Table;

  }
  else if(promise.status=="Failed")
  {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: promise.message,
      showConfirmButton: false,
      timer: 1000
  })
  }
  
});
  }

  edit_spec_attribute(ss:any) {
    this.specification_id=ss.specificationid,
    this.get_attribute_name_edit(this.specification_id,ss.attributename_id);
    this.attribute_name_id=ss.attributename_id,
    this.spe_attr_id=ss.spe_attrid
  };

  get_attribute_name_edit(ss:any, attr:any)
  {
    var data={
"specification_id":parseInt(ss),
"attribute_name_id":parseInt(attr),
"language_id":1
    }
    let geturl='Map_Specification_Attribute/get_attribute_name_edit/'
    this.allapi.PostData(geturl, data).subscribe(promise=> {
      this.attribute_name_dd =JSON.parse(promise.attribute_name_dd).Table;   

   });
  }

  delete_spec_attribute(ss:any)
  {
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

        var data={
          "spe_attr_id":parseInt(ss.spe_attrid),
          "specification_id":parseInt(ss.specificationid),
          "attribute_name_id":parseInt(ss.attributename_id),
          "language_id":1
        }
        let geturl='Map_Specification_Attribute/delete_spec_attribute/'
          this.allapi.PostData(geturl, data).subscribe(promise=> {

              if (promise.msg_flg == "Delete") {
                this.attribute_name_id="";
      this.specification_attribute_list =JSON.parse(promise.specification_attribute_list).Table;
      this.attribute_name_dd =JSON.parse(promise.attribute_name_dd).Table; 
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Deleted Successfully',
                      showConfirmButton: false,
                      timer: 3000
                  });

              }
              else { 
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

  

  }
 

onTableDataChange(event: any) {
  this.page = event;
  this.ngOnInit();
}
Clear()
{
  this.spe_attr_id=0;
  this.attribute_name_id="";
  this.specification_id="";
  this.submitted=false;
  this.specattr.reset();
}
}

