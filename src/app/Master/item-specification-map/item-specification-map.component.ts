import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-specification-map',
  templateUrl: './item-specification-map.component.html',
  styleUrls: ['./item-specification-map.component.css']
})
export class ItemSpecificationMapComponent implements OnInit {
  form:FormGroup
  additionalcategorylist:any
  attributelist:any
  specificationlist:any
  itemcategoryspecificationlist:any
  master_item_spec_id=""
  additional_cat_id=""
  specification_id=""
  attribute_name_id=""
  is_refiners:any
  submitted=false
  isrefiner:any
  is_visible:any
  masteritemspec_id=0;

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
    get f(){
        return this.form.controls;
      }

    ngOnInit(): void {
        var sid = 1; 
        let geturl='Item_Specification_Mapping/getdata/'    
        this.allapi.GetDataById(geturl, sid).subscribe(promise=> {
            this.additionalcategorylist = promise.additionalcategorylist;
            this.attributelist = promise.attributelist;
            this.specificationlist = promise.specificationlist;
            this.itemcategoryspecificationlist = promise.itemcategoryspecificationlist;
           /* this.itemcatspeclist = promise.itemcatspeclist;*/
    
    
        });
        //delete 
    
      }
//getspecification
getspecification(ss:any) {
    var data = {
        "additional_cat_id": parseInt(ss),
        "language_id": 1,
    }
    let geturl='Item_Specification_Mapping/getspecification/'
    this.allapi.PostData(geturl, data).subscribe(promise=> {
        this.itemcategoryspecificationlist = promise.itemcategoryspecificationlist;
        this.specificationlist=promise.specificationlist;
  
  
    })
  }
      
    //edit
    edititemspecification(ss:any) {
          this.master_item_spec_id = ss.itemspecid
      this.additional_cat_id = ss.additionalcatid;
      this.specification_id = ss.specificationid;
      this.attribute_name_id = ss.attributenameid;
      this.getattribute(ss);  
   
      this.is_refiners = ss.isrefiner;
      if (this.is_refiners == true) {
          this.is_refiners = 1;
          this.isrefiner(1);
      }
      else {
          this.is_refiners = 0;
          this.isrefiner(0);
      }
      location.reload();
  }

  //
  getattribute(sub:any) {
  var sid = 1;
  var data =
  {
      "additional_cat_id": parseInt(this.additional_cat_id),
      "specification_id": parseInt(this.specification_id),
      "language_id": sid,
  }
 let attributeurl='Item_Specification_Mapping/getattributelist/'
  this.allapi.PostData(attributeurl, data).subscribe(promise=> {
      this.attributelist = promise.attributelist;
  });
  }

  



   
  
  deleteitemspecification(ss:any) {
    var data = {
        "master_item_spec_id": ss.itemspecid
    }
    let url='Item_Specification_Mapping/deleteitemspecification/';
    this.allapi.PostData(url, data).subscribe(promise=> {
        if (promise.msg_flg == "Delete") {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: ' Deleted Successfully.',
                showConfirmButton: false,
                timer: 3000
            })
        }
        else if (promise.msg_flg == "Failed") {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: ' Sub Sub category Not Deleted, Please Try Again',
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
    location.reload();
}

 //save
 savedata() 
 {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    var refiner =false;
    if(this.is_refiners=="true")
    {
     refiner =true;
    }
     var refiner = Boolean(this.is_refiners);
     var isvisible = Boolean(this.is_visible);

     var data = {
         "master_item_spec_id":Number(this.master_item_spec_id) ,
         "additional_cat_id": parseInt(this.additional_cat_id),
         "specification_id": parseInt(this.specification_id),
         "attribute_name_id": parseInt(this.attribute_name_id),
         "is_refiners": refiner,
         "language_id": 1,
         "is_visible": isvisible,

     }
     let saveurl='Item_Specification_Mapping/saveitemspecification/'
     this.allapi.PostData(saveurl, data).subscribe(promise=> {
         if (promise.msg_flg == "Update") {
             this.is_visible = true;
             this.submitted=false;
             this.form.reset();
             this.itemcategoryspecificationlist = promise.itemcategoryspecificationlist;
              this.specificationlist=promise.specificationlist;
            
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
    // location.reload();
 }
 onTableDataChange(event: any) {
  this.page = event;
  this.ngOnInit();
}
page: number = 1;
count: number = 0;
tableSize: number = 7;
tableSizes: any = [3, 6, 9, 12];

Clear()
{
    this.additional_cat_id="";
    this.specification_id="";
    this.attribute_name_id="";
    this.is_refiners="";
    this.masteritemspec_id=0;
}
}
