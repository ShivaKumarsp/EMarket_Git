import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-specification-map',
  templateUrl: './category-specification-map.component.html',
  styleUrls: ['./category-specification-map.component.css']
})
export class CategorySpecificationMapComponent implements OnInit {
form: FormGroup;
//declarations
additionalcategorylist:any
mastercatspeclist:any
additional_cat_id=""
specification_id=""
cat_spe_map_id=0
total = 0;
page: number = 1;
count: number = 0;
tableSize: number = 7;
tableSizes: any = [3, 6, 9, 12];

specificationlist:any
submitted=""
search="";
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private allapi: AllapiService,) { 
        this.form = formBuilder.group({
            acname:new FormControl('',[Validators.required]),
            Specification:new FormControl('',[Validators.required]),
            v_search:new FormControl(),
        });

    }

    get f(){
        return this.form.controls;
      }
      onTableDataChange(event: any) {
        this.page = event;
        this.ngOnInit();
      }

    //save
    savedata() {
      if (this.additional_cat_id == undefined) {
          this.additional_cat_id = "";
      }
      if (this.specification_id == undefined) {
          this.specification_id = "";
      }

      // if (this.myform.$valid) {
          var data = {
              "cat_spe_map_id": this.cat_spe_map_id,
              "additional_cat_id": Number(this.additional_cat_id),
              "specification_id": Number(this.specification_id),
              "language_id": 1,
          }
          let url='Map_Category_Specification/savemappedspecification/';
          this.allapi.PostData(url, data).subscribe(promise=> {
              if (promise.msg_flg == "Update") {
                  this.mastercatspeclist =JSON.parse(promise.mastercatspeclist).Table;
                  this.getspecification(Number(this.additional_cat_id), 'list');
                  this.specification_id = "";
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: ' added Successfully.',
                      showConfirmButton: false,
                      timer: 1000
                  })

              }
              else if (promise.msg_flg == "Failed") {
                  Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: ' Not added, Please Try Again',
                      showConfirmButton: false,
                      timer: 1000
                  })
              }
              else {
                  Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: (promise.messageflg),
                      showConfirmButton: false,
                      timer: 1000
                  })
              }


          })



      // }
      // else {
      //     .submitted = true;
      // }


  }

getspecification(ss:any, dd:any) {

    var data = {
        "additional_cat_id": parseInt(ss),
        "flag": dd,
        "language_id": 1,
    }
    let url='Map_Category_Specification/getspecification/';
    this.allapi.PostData(url, data).subscribe(promise=>{
        this.mastercatspeclist =JSON.parse(promise.mastercatspeclist).Table;
        this.specificationlist = promise.specificationlist;

    })
}
editcatspecification(ss:any) {
 alert(1)
  this.cat_spe_map_id = ss.categoryspecid;
  this.additional_cat_id = ss.additionalcatid;
  this.getspecification(this.additional_cat_id, 'edit')
  this.specification_id = ss.specificationid;
  //this.mastercatspeclist = promise.mastercatspeclist;
};

deletecatspecification(ss:any) {

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
              "cat_spe_map_id": ss.categoryspecid,
              "language_id": 1
          }
          let url='Map_Category_Specification/deletecatspecification/'
          this.allapi.PostData(url, data).subscribe(promise=> {

              if (promise.msg_flg == "Delete") {
                this.mastercatspeclist =JSON.parse(promise.mastercatspeclist).Table;
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
                      title: 'Somthing Wrong Please Try Later',
                      showConfirmButton: false,
                      timer: 3000
                  })
              }
          })

      }
  })

};

interacted(field:any) {
    return this.submitted || field.$dirty;
};
  ngOnInit(): void {
    var sid = 1;
    let geturl='Map_Category_Specification/getdata/';
    this.allapi.GetDataById(geturl, sid).subscribe(promise=>{
        console.log(promise)
        this.additionalcategorylist =JSON.parse(promise.additionalcategorylist).Table;
        this.mastercatspeclist =JSON.parse(promise.mastercatspeclist).Table;
    });
  }
clear()
{this.additional_cat_id="";
this.specification_id="";
this.cat_spe_map_id=0;
}
}
