import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-specification-map',
  templateUrl: './product-specification-map.component.html',
  styleUrls: ['./product-specification-map.component.css']
})
export class ProductSpecificationMapComponent implements OnInit {
form:FormGroup
//declarartion
submitted=false;
additionalcategorylist:any
attributelist:any
specificationlist:any
mastercatspeclist:any
additional_cat_id:any
specification_id:any
is_refiner="";
is_visible:any
attribute_name_id:any
masteritemspec_id=0;
customevalue:boolean=false;
search="";

ss:any
dd:any
total = 0;
page: number = 1;
count: number = 0;
tableSize: number = 7;
tableSizes: any = [3, 6, 9, 12];

  constructor(private httpClient: HttpClient,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private allapi: AllapiService,) { 
        this.form = formBuilder.group({
            additionalcategory:new FormControl('', [Validators.required],),
            specification:new FormControl('',[Validators.required]),
            attribute:new FormControl('',[Validators.required,]),
            refiner: new FormControl('',[Validators.required]),
           
          });
    }
    // onCheckboxChange(e:any) {
 
   
    //     if (e.target.checked) {
    //       this.customevalue=true;
    //     } else {
    //       this.customevalue=false;
    //     }
    //   }

    get f(){
        return this.form.controls;
      }
  ngOnInit(): void {
    var sid = 1;
    let geturl='Master_Category_Specification/getdata/'
            this.allapi.GetDataById(geturl, sid).subscribe(promise=> {
                 this.additionalcategorylist = promise.additionalcategorylist;
                this.attributelist = promise.attributelist;
                this.specificationlist = promise.specificationlist;
                this.mastercatspeclist = promise.mastercatspeclist;
            });
  }
//get attribute list
  getattribute_edit(sub:any) {
    var data =
    {
        "additional_cat_id": parseInt(this.additional_cat_id),
        "specification_id": parseInt(this.specification_id),
        "language_id": 1,
    }
    let saveurl='Master_Category_Specification/getattributelist_edit/'
    this.allapi.PostData(saveurl, data).subscribe(promise=> {
        this.attributelist = promise.attributelist;
    });

}
//getspecification
getspecification(ss:any,dd:any) {
    var data = {
        "additional_cat_id": parseInt(ss),
        "flag": dd,
        "language_id": 1
    }
    console.log(data);
    let getspecurl='Master_Category_Specification/getspecification/'
    this.allapi.PostData(getspecurl, data).subscribe(promise=> {
       this.specificationlist = promise.specificationlist;
    this.mastercatspeclist = promise.mastercatspeclist;
    })
}

//getattribute
getattribute(ss:any, dd:any) {
    var data = {
        "additional_cat_id": parseInt(this.additional_cat_id),
        "specification_id": parseInt(ss),
        "flag": dd,
        "language_id": 1,
    }
    let getatturl='Master_Category_Specification/getattributelist/'
    this.allapi.PostData(getatturl, data).subscribe(promise=>{
        this.attributelist = promise.attributelist;
        this.mastercatspeclist = promise.mastercatspeclist;
    })
  }
  //save mapping
savedata() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    var refiner =false;
    if(this.is_refiner=="true")
    {
     refiner =true;
    }

  var isvisible = Boolean(this.is_visible);
  if (this.additional_cat_id == undefined) {
      this.additional_cat_id = 0;
  }
  if (this.specification_id == undefined) {
      this.specification_id = 0;
  }
  if (this.attribute_name_id == undefined) {
      this.attribute_name_id = null;
  }

  // if (this.myform.$valid) {
      var data = {
          "masteritemspec_id": this.masteritemspec_id,
          "additional_cat_id": parseInt(this.additional_cat_id),
          "specification_id": parseInt(this.specification_id),
          "attribute_name_id": parseInt(this.attribute_name_id),
          "language_id": 1,
          "is_refiner": refiner,
          "is_visible": isvisible
         
      }
      let saveurl='Master_Category_Specification/savemasterspecification/'
      this.allapi.PostData(saveurl, data).subscribe(promise=>{
          console.log(promise)
          if (promise.msg_flg == "Update") {
              this.is_visible = true;
              this.mastercatspeclist = promise.mastercatspeclist;
              this.submitted=false;
              this.form.reset();

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
                  title: (promise.msg_flg),
                  showConfirmButton: false,
                  timer: 3000
              })
          }


      })
  
}

//edit
editmasterspecification(ss:any) {
  
    this.masteritemspec_id = ss.masteritemspec_id;
    this.additional_cat_id = ss.additionalcatid;
      
    this.getspecification(this.additional_cat_id, 'edit');
    this.specification_id = ss.specificationid;
    this.getattribute(this.specification_id, 'edit');
    this.attribute_name_id = ss.attributenameid;
    this.mastercatspeclist = this.mastercatspeclist;
  };

  //editmasterspecification_delete
editmasterspecification_delete(ss:any) {
    var data = {
        "specification_id": ss.specificationid,
        "attribute_name_id": ss.attributenameid,
        "in_language_id":1,
    }
    let url='Master_Category_Specification/editmasterspecification/'
    this.allapi.PostData(url, data).subscribe(promise=> {
        if (promise.msg_flg == "Success") {
            this.deletesubsubcat(ss)
        }
        else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: ' This Specification/Attribute Already Mapped with Other Product',
                showConfirmButton: false,
                timer: 3000
            })
        }
  
    });
  }

//deletesuvcast
deletesubsubcat(ss:any) {
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
                "cat_specid": ss.categoryspecid,
                "additional_cat_id": ss.additionalcatid,
                "language_id": 1,
            }
            let deleteurl='Master_Category_Specification/deletemasterspecification/'
            this.allapi.PostData(deleteurl, data).subscribe(promise=>{
                if (promise.msg_flg == "Delete") {
                    this.mastercatspeclist = promise.mastercatspeclist;
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
  


Clear()
{
    this.additional_cat_id="";
    this.specification_id="";
    this.attribute_name_id="";
    this.is_refiner="";
    this.masteritemspec_id=0;
}

onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
}
