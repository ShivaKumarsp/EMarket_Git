import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Editor} from 'ngx-editor';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-itemfeatures',
  templateUrl: './itemfeatures.component.html',
  styleUrls: ['./itemfeatures.component.css']
})
export class ItemfeaturesComponent implements OnInit, OnDestroy {
  constructor(private httpClient: HttpClient,
     private formBuilder: FormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute) { }
  
  //declaration
 public itemname="";
 public item_title="";
 public itemid:any;
 public item_header="";
 public item_subheader="";
 public description="";
 public index=0;
 public filename="";
 documentListOtherDetails:any;
 window:any;
 public language_id=0;
 feature_list:any;
 item_name="";
 ifid=0;
 editData = "";
 html:any = this.editData;
 editor: Editor = new Editor;
 editorConfig:any
  ngOnInit(): void {
    this.itemid=this.activateroute.snapshot.paramMap.get("itemid");
    this.editor = new Editor();
    this.editorConfig = {
      "toolbar":[
        ["link","unlink","video"],["bold"]
        
      ]
    }
    var data = {  
      "language_id": 1,
      "item_id":parseInt(this.itemid)
    }
    let url='Vendor_Add_Item/getdata_feature/';
    this.allapi.PostData(url,data).subscribe(promise =>{
      this.feature_list=promise.feature_list;
      if(this.feature_list!="")
      {
        this.html = this.feature_list[0].v_description;
        this.ifid = this.feature_list[0].ifid;
      }   
       this.item_name = promise.ret_item_name;

              
    })  
  }

  
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  forms = new FormGroup({
    itemid:new FormControl(),
    name: new FormControl(),
    topic: new FormControl(),
    msg: new FormControl(),

  });
  getFormData(){
    var data = {
      itemid:this.forms.value.itemid,
      details:this.forms.value.msg,
    }

  }


  saveifeatures() {

    var data = {
      "if_id":this.ifid,
      "item_id": parseInt(this.itemid),
      "item_title": "",
      "item_header": "",
      "item_subheader": "",
      "description": this.forms.value.msg,
      "language_id": 1,
    
    }
    console.log(data);
    let url = 'Vendor_Add_Item/save_itemfeatures/';
    this.allapi.PostData(url,data).subscribe(promise => {
    
      if (promise.msg_flg == "Update") {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 5000
        });
        this.feature_list=promise.feature_list;
      if(this.feature_list!="")
      {
        this.html = this.feature_list[0].v_description;
        this.ifid = this.feature_list[0].ifid;
      }   
              this.item_name = promise.item_name;
      }
      else if (promise.msg_flg == "Failed") {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.message,
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


  encode(str:string){
    const observable = new Observable
  }

  itemName:string='Iphone 64GB'

}
