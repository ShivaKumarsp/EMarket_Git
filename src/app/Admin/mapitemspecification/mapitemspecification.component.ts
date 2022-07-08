import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

declare var window:any;
@Component({
  selector: 'app-mapitemspecification',
  templateUrl: './mapitemspecification.component.html',
  styleUrls: ['./mapitemspecification.component.css']
})
export class MapitemspecificationComponent implements OnInit {

  //d
  additionalcategorylist:any;
  specificationlist:any;
  mastercatspeclist:any;
  public additional_cat_id=0;
  public specification_id=0;
  public cat_spe_map_id=0;
  
  
  
  //end d
  constructor(private httpClient: HttpClient,private allapi:AllapiService) {}
//validation

get f(){
  // console.log(this.form.value.productname)
  return this.saveform.controls;
  }
  formModel:any;
  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(document.getElementById("formodel"));
    var sid = 1;
    let url='Map_Category_Specification/getdata/';
    this.allapi.GetDataById(url,sid).subscribe(promise => {
        this.additionalcategorylist = promise.additionalcategorylist;
        this.specificationlist = promise.specificationlist;
        this.mastercatspeclist = promise.mastercatspeclist;
    });

  }
  selectadditionalcatid:any;
  selectspec_id:any;
  modalList:any;

  newArr:any=[]
  // modalspecList:any;
  // selectspecificationid:any;
  
  openModal(a:any){
    let uID = a.categoryspecid
    alert(JSON.stringify(a))
    const seen = new Set();
    const aList = this.mastercatspeclist.filter((el:any) => {
      const duplicate = seen.has(el.additionalcatid);
      seen.add(el.additionalcatid);
      return !duplicate;
      
    });
    // let res= aList.reduce(function(a:any,b:any){ 
    //   return (b.categoryspecid === a.categoryspecid ) || a; 
    // }, 0);
    var ids = aList.reduce((ids:any, thing:any) => {
      // if (thing.selected) {
      //   ids.push(thing.id);
      // }
      // return ids;
      console.log(1)
      //console.log(ids)
      
        console.log(thing)
      
     
    }, []);
    
    console.log(ids)
    // this.modalList = res
    // console.log(this.modalList)





    
      this.editform.patchValue({
        editAdditionalCategory:a.additionalcatid,
        editSpecificationName_id:a.specificationid,
        editid:uID,
      })
    
    this.formModel.show();
  }
  ListForEditSpec:any
  getEditSpec(e:any){
   
    let ss=e.target.value
    let dd = 'list'
    var data = {
        "additional_cat_id": parseInt(ss),
        "flag": dd,
        "language_id": 1,
    }
    let curl='Map_Category_Specification/getspecification/'
    this.allapi.PostData(curl,data).subscribe(promise=> {
        this.ListForEditSpec = promise.specificationlist;
    })
  }
  doSomething(){
    this.formModel.hide();
  }
  EditThis(a:any){
    
    this.openModal(a)
   
  }
  SaveEdit(){

  
    console.log(this.editform.value);
  
   // {editAdditionalCategory: '6', editAttributeName_id: null, editSpecificationName_id: '3', editrefiner: null, editvisibility: null}
  //   this.cat_spe_map_id = this.editform.value.categoryspecid;
  // this.additional_cat_id = this.editform.value.additionalcatid;
  // this.additionCatChange();
  // this.specification_id = this.editform.value.specificationid;
  // this.mastercatspeclist = this.mastercatspeclist;
//categoryspecid
    //test
    console.log(this.mastercatspeclist)
      this.mastercatspeclist.map((x:any,y:any)=>{
        console.log(x)
      })

    var data = {
      "cat_spe_map_id": Number(this.editform.value.editid),
      "additional_cat_id": Number(this.editform.value.editAdditionalCategory),
      "specification_id": Number(this.editform.value.editSpecificationName_id),
      "language_id": 1,
      

  }

  let saveurl='Map_Category_Specification/savemappedspecification/'
  this.allapi.PostData(saveurl,data).subscribe(promise=> {
    
      if (promise.msg_flg == "Update") {
          this.mastercatspeclist = promise.mastercatspeclist;
          this.additionCatChange();
          this.specification_id=0;


          Swal.fire({
              position: 'center',
              icon: 'success',
              title: ' added Successfully.',
              showConfirmButton: false,
              timer: 3000
          })

      }
      else if (promise.msg_flg == "Failed") {
          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: ' Not added, Please Try Again',
              showConfirmButton: false,
              timer: 3000
          })
      }
      else {
          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: (promise.messageflg),
              showConfirmButton: false,
              timer: 3000
          })
      }


  })

    //end test

  }
  
  formSave(){
  
    console.log(this.saveform.value);
    console.log(1);
    if (this.additional_cat_id == undefined) {
      this.additional_cat_id = 0;
    }
    if (this.specification_id == undefined) {
      this.specification_id = 0;
    }
        var data = {
            "cat_spe_map_id": Number(this.saveform.value.additionalCategory),
            "additional_cat_id": Number(this.saveform.value.additionalCategory),
            "specification_id": Number(this.saveform.value.specificationName_id),
            "language_id": 1,
        }
      
        let saveurl='Map_Category_Specification/savemappedspecification/'
        this.allapi.PostData(saveurl,data).subscribe(promise=> {
          
            if (promise.msg_flg == "Update") {
                this.mastercatspeclist = promise.mastercatspeclist;
                this.additionCatChange();
                this.specification_id=0;


                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: ' added Successfully.',
                    showConfirmButton: false,
                    timer: 3000
                })

            }
            else if (promise.msg_flg == "Failed") {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: ' Not added, Please Try Again',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
            else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: (promise.messageflg),
                    showConfirmButton: false,
                    timer: 3000
                })
            }


        })


  }
  saveform = new FormGroup({
    additionalCategory : new FormControl(),
    specificationName_id : new FormControl(),
    refiner : new FormControl(),
    visibility : new FormControl(),
    

  });

  editform = new FormGroup({
    editAdditionalCategory: new FormControl(),
    editAttributeName_id: new FormControl(),
    editSpecificationName_id : new FormControl(),
    editrefiner : new FormControl(),
    editvisibility : new FormControl(),
    editid:new FormControl(),
  });
 //on change dropdown
  additionCatChange() {
    let ss=this.saveform.value.additionalCategory
    let dd = 'list'
    var data = {
        "additional_cat_id": parseInt(ss),
        "flag": dd,
        "language_id": 1,
    }
    let curl='Map_Category_Specification/getspecification/'
    this.allapi.PostData(curl,data).subscribe(promise=> {
      // console.log(promise)
        this.mastercatspeclist = promise.mastercatspeclist;
        this.specificationlist = promise.specificationlist;
    })
}

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
              "language_id": 1,
          }
          let delurl='Map_Category_Specification/deletecatspecification/'
          this.allapi.PostData(delurl,data).subscribe(promise=>{
              if (promise.msg_flg == "Delete") {
                  this.mastercatspeclist = promise.mastercatspeclist;
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Deleted Successfully',
                      showConfirmButton: false,
                      timer: 3000
                  });

                  this.ngOnInit();

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


}

