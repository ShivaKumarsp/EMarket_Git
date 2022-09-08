import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Validators, Editor, Toolbar } from 'ngx-editor';

import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-features',
  templateUrl: './product-features.component.html',
  styleUrls: ['./product-features.component.css']
})
export class ProductFeaturesComponent implements OnInit, OnDestroy {
  editor: Editor = new Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  productname: any;
  datatypelist: any;
  editData = "";
  pfid=0;
  feature_list:any;
  html:any = this.editData;
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private allapi:AllapiService,
    private activateroute:ActivatedRoute) { }
    productid:any;


  ngOnInit(): void {

    this.productid=this.activateroute.snapshot.paramMap.get("productid");
    var data = {

      "language_id": 1,
      "product_id":parseInt(this.productid)
    }
    let url='product_features/Get_productfeatures';
    this.allapi.PostData(url,data).subscribe(promise =>{
      this.feature_list=promise.feature_list;
      if(this.feature_list!="")
      {
        this.html = this.feature_list[0].v_description;
        this.pfid = this.feature_list[0].pfid;
      }

        this.datatypelist = promise.datatypelist;
        this.productname = promise.product_name;


    })


  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  forms = new FormGroup({
    productid:new FormControl(),
    name: new FormControl(),
    topic: new FormControl(),
    msg: new FormControl(),

  });
  getFormData(){

    var data = {
      productid:this.forms.value.productid,
      details:this.forms.value.msg,
    }
  }
  savepfeatures() {

    var data = {
   "pf_id":this.pfid,
      "product_id":parseInt(this.productid),
      "product_title": "",
      "product_header": "",
      "product_subheader": "",
      "description": this.forms.value.msg,
      "language_id": 1,

    }

    let url = 'product_features/save_productfeatures/';
    this.allapi.PostData(url,data).subscribe(promise => {

      if (promise.msg_flg == "Update") {
        // this.forms = new FormGroup({
        //            name: new FormControl(''),
        //   topic: new FormControl(''),
        //   msg: new FormControl(''),

        // });
        this.feature_list=promise.feature_list;
        if(this.feature_list!="")
        {
          this.html = this.feature_list[0].v_description;
          this.pfid = this.feature_list[0].pfid;
        }

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message_flg,
          showConfirmButton: false,
          timer: 3000
        });

      }
      else if (promise.msg_flg == "Failed") {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.message_flg,
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

}
