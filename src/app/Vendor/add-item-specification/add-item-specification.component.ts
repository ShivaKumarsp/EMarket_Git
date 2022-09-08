import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { required } from '@rxweb/reactive-form-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-item-specification',
  templateUrl: './add-item-specification.component.html',
  styleUrls: ['./add-item-specification.component.css']
})
export class AddItemSpecificationComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  search="";
  forkeyvalue: any;
  rdata: any;
  add_spec = new FormGroup({
    itemname: new FormControl(''),
  });

  public objectValues(obj: any) {
    return Object.values(obj);
  }
  public objectKeys(obj: any) {
    return Object.keys(obj);
  }
  constructor(private httpClient: HttpClient,
     private router: Router,
    private allapi: AllapiService,
    private activateroute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private spinner:NgxSpinnerService) {
  }




  attribute_select = new FormGroup({
    att_select_val_id:new FormControl(''),
    customedata:new FormControl(),
    v_search:new FormControl()
  });
  groupedSection:any
  itemname: any;
  att_value="";
  itemid:any;
  product_specification_list: any;
  attribute_value_list: any;
  item_specification_list: any;
  product_spec_list: any;
  item_array: any;
  item_array_remove: any;
  specificationname="";
  specificationid="";
  attributename="";
  attributenameid=0
  attributevalueid:any;
  enablecuston:any;
  custon_data="";
  attribute_value_list_out: any=[];
  //
  attribute_value_list_new: any[]|undefined=undefined;
  additional_cat_spec_list: any;
  additional_cat_spec_list_new: any[]|undefined=undefined;
  attribute_name_list: any;
  edititem=false;
  edititem_edit=false;
  edititem1=false;
  itemspecification_id=0;
  submitted=false;
  get f() {
    return this.attribute_select.controls;
  }

  ngOnInit(): void {
    this.itemid=this.activateroute.snapshot.paramMap.get("itemid");

    let url1 = 'Vendor_Add_Item/get_specification_data/';

    var data1 = {
      "language_id": 1,
      "item_id": parseInt(this.itemid)
    }
    this.allapi.PostData(url1, data1).subscribe(data2 => {
    this.edititem=data2.edititem;
      this.itemname = data2.ret_item_name;
      this.item_specification_list = data2.item_specification_list;
      this.attribute_value_list = data2.attribute_value_list;
      this.product_specification_list = data2.product_specification_list;
      this.additional_cat_spec_list = [];
      this.additional_cat_spec_list_new = [];
      this.product_specification_list.forEach((ss:any)=>
      {
        this.additional_cat_spec_list.push({ 'specificationid': ss.specificationid, 'specificationname': ss.specificationname, 'attributename_id': ss.attributename_id, 'attributename': ss.attributename,'enablevalue':ss.enablecustom_value, 'attributevalue_id': "" })
      });

      this.groupedSection=this.groupBy(this.additional_cat_spec_list,'specificationname')

      this.additional_cat_spec_list_new = this.groupBy(this.additional_cat_spec_list, "specificationname");

      this.attribute_value_list_new = this.groupBy(this.attribute_value_list, "attributename_id");
    })
  }

  // Edit Form will store the data
  save_attribute() {
    // this.submitted=true;
    // if(this.attribute_select.invalid)
    // {
    //   return
    // }
    this.spinner.show();
    this.item_array = [];
    var count1 = this.product_specification_list.length;
    this.item_array=[];
    this.attribute_value_list_out.forEach((ss: any) => {
      this.item_array.push(ss)
    })
    console.log('count',count1)
    console.log('this.item_array.length',this.item_array.length)
    console.log('this.item_array',this.item_array)
    if (count1 == this.item_array.length) {
      let url = 'Vendor_Add_Item/save_itemspecification/';
      var data = {
        'item_array': this.item_array,
        "item_id": parseInt(this.itemid),
        "language_id": 1,
      }
      this.allapi.PostData(url, data).subscribe(data2 => {
        console.log('data',data);
        console.log(data2)
        if (data2.msg_flg == "Update") {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Item Specification Saved Successfully.',
            showConfirmButton: false,
            timer: 3000
          })
          this.edititem=data2.edititem;
          this.itemname = data2.ret_item_name;
          this.item_specification_list = data2.item_specification_list;
          this.attribute_value_list = data2.attribute_value_list;
          this.product_specification_list = data2.product_specification_list;
          this.additional_cat_spec_list = [];
          this.additional_cat_spec_list_new = [];
          this.product_specification_list.forEach((ss:any)=>
          {
            this.additional_cat_spec_list.push({ 'specificationid': ss.specificationid, 'specificationname': ss.specificationname, 'attributename_id': ss.attributename_id, 'attributename': ss.attributename,'enablevalue':ss.enablecustom_value, 'attributevalue_id': "" })
          });

          this.groupedSection=this.groupBy(this.additional_cat_spec_list,'specificationname')

          this.additional_cat_spec_list_new = this.groupBy(this.additional_cat_spec_list, "specificationname");

          this.attribute_value_list_new = this.groupBy(this.attribute_value_list, "attributename_id");

        }
        else if (data2.msg_flg == "Failed") {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Item Specification Not Saved, Please Try Again',
            showConfirmButton: false,
            timer: 3000
          })
        }
        else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: (data2.msg_flg),
            showConfirmButton: false,
            timer: 3000
          })
        }
      });
    }
    else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please Select All Mandatory Field.',
        showConfirmButton: false,
        timer: 3000
      })
    }
    this.spinner.hide();
  };

   changevalue(e: any, attributeid: any,enb:any, specificationid:any) {

    if (this.attribute_value_list_out.length > 0 || this.attribute_value_list_out != "" ) {
      this.attribute_value_list_out.forEach((element: any, index: any) => {
        if (element.attribute_name_id == attributeid) delete this.attribute_value_list_out[index];
      });
    }
    if(enb==false)
    {
      if(e.target.value!="")
      {
        this.attribute_value_list_out.push({'specification_id':specificationid,
        'attribute_name_id':attributeid,'attribute_value_id':parseInt(e.target.value), 'attribute_value':"",'enable_custom_value':false})
      }

    }
    else if(enb==true)
    {
      if(e.target.value!="")
    {
      this.attribute_value_list_out.push({'specification_id':specificationid,
      'attribute_name_id':attributeid,'attribute_value_id':0, 'attribute_value':e.target.value,'enable_custom_value':true})
    }

    }

  }
 attribute_value_list_edit:any;
  edit_specification(ss:any)
  {
    this.edititem1=true;
    this.attribute_value_list_edit=[];
      this.attribute_value_list.forEach((dd:any)=>{
   if(dd.attributename_id==ss.attributename_id)
   {
    this.attribute_value_list_edit.push(dd)
   }
    })
    this.edititem_edit=true;

    this.attribute_select.patchValue({
      att_select_val_id: ss.attributevalue_id
      });

this.specificationname=ss.specificationname;
this.specificationid=ss.specificationid;
this.attributename=ss.attributename;
this.attributenameid=ss.attributename_id;
this.attributevalueid=ss.attributevalue_id;
this.enablecuston=ss.enable_value;
this.custon_data=ss.attributevalue;
this.itemspecification_id=ss.itemspecification_id
  }


  changeeditvalue(specificationid:any,attributenameid:any,enablecuston:any,e: any)
  {
       if(enablecuston==false)
    {
      this.attributevalueid=parseInt(e.target.value);
    }
    else if(enablecuston==true && this.custon_data!="")
    {
      this.custon_data="";
      this.custon_data=e.target.value;
    }

  }
  update_attribute()
  { this.spinner.show();
    if(this.enablecuston==true)
    {
      if(this.custon_data=="")
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Please  Enter Value',
          showConfirmButton: false,
          timer: 3000
        })
        return
      }
    }
    if(this.enablecuston==false)
    {
     if(this.attributevalueid=="")
    {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Please Select Or Enter Value',
      showConfirmButton: false,
      timer: 3000
    })
    return
  }
}

    var data={
      "item_specification_id":this.itemspecification_id,
      "item_id": parseInt(this.itemid),
    "specification_id":this.specificationid,
   "attribute_name_id": this.attributenameid,
   "attribute_value_id": this.attributevalueid,
   "attribute_value": this.custon_data,
   "enable_custom_value": this.enablecuston,
   "language_id":1
    }
    let url = 'Vendor_Add_Item/update_itemspecification/';
    this.allapi.PostData(url, data).subscribe(data2 => {
      if (data2.msg_flg == "Update") {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Item Specification Updated Successfully.',
          showConfirmButton: false,
          timer: 3000
        })
        this.item_specification_list = data2.item_specification_list;
        this.product_spec_list = [];
        this.edititem=true;
        this.edititem_edit=false;
        this.edititem1=false;
      }
      else if (data2.msg_flg == "Failed") {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Item Specification Not Updated, Please Try Again',
          showConfirmButton: false,
          timer: 3000
        })
      }
      else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: (data2.msg_flg),
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
    this.spinner.hide();
  }

  groupBy(list: any[], property: string | number) {
    return list.reduce((groups, item) => {
        const val = item[property];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
}


