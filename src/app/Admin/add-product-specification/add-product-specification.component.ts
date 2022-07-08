import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product-specification',
  templateUrl: './add-product-specification.component.html',
  styleUrls: ['./add-product-specification.component.css']
})
export class AddProductSpecificationComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute) { }
  product_specification_list:any;
  productid:any;
  additional_cat_specification_list:any;
  attribute_value_list:any;
  attribute_value_list_out:any=[];
  additional_cat_spec_list:any;
  productname="";
  attributevalue_id1="";
  attribute_name_list:any;
  additional_cat_array:any;
  ipAddress="";
  apitype="";
  edit_product=false;
  edit:boolean=false;
  btn_dissable:boolean=true;
  productspecificationid="";
  specificationid="";
  attributenameid="";
  attributevalue_id="";
  attributename="";
  spec_name="";
  attr_name="";
  att_val_id="";
  product_spec = new FormGroup({
    attributevalue_id:new FormControl(''),
 
  });  

  additional_cat_spec_list_new: any[] | undefined = undefined;
  attribute_value_list_new: any[] | undefined = undefined;
  
  public objectValues(obj:any) {
    return Object.values(obj);
  }

  ngOnInit(): void {   
    this.getIPAddress();
   
    this.productid=this.activateroute.snapshot.paramMap.get("productid");
      
      
      var data = {
          "language_id": 1,
          "product_id":parseInt(this.productid)
      }
let url='Product_Specification/get_specification_data/';
      this.allapi.PostData(url, data).subscribe(promise=> {
          this.edit_product=promise.check_edit;
          this.productname = promise.product_name;
          this.product_specification_list = promise.product_specification_list;

          this.attribute_name_list=promise.attribute_name_list;
          this.attribute_value_list = promise.attribute_value_list;

      
          this.attribute_value_list_new = this.groupBy(this.attribute_value_list, "attributename_id");
     
          this.additional_cat_spec_list = [];
          this.additional_cat_spec_list_new = [];
          
          this.attribute_name_list.forEach((ss:any)=>
          {
            this.additional_cat_spec_list.push({ 'specificationid': ss.specificationid, 'specificationname': ss.specificationname, 'attributename_id': ss.attributename_id, 'attributename': ss.attributename, 'attributevalue_id': "" })
          }); 
     
          this.additional_cat_spec_list_new = this.groupBy(this.additional_cat_spec_list, "specificationname");
      });
  
  }
  
 save_attribute() {
    this.btn_dissable=false;
    this.additional_cat_array = [];
    var count1 = this.additional_cat_spec_list.length;
    this.additional_cat_spec_list.forEach((ss:any)=>
    {
      if (ss.attributevalue_id !== 0) {

        this.additional_cat_array.push({ 'specification_id': ss.specificationid, 'specification_name': ss.specificationname, 'attributename_id': ss.attributename_id, 'attribute_name': ss.attributename, 'attributevalue_id': parseInt(ss.attributevalue_id) })
    }
    })
   
    var count2 = this.attribute_value_list_out.length;
    
   
    if (count1 == count2) {
        var data = {
            'additional_cat_array': this.attribute_value_list_out,
            "product_id":parseInt(this.productid),
            "language_id": 1,
            "ipAddress":this.ipAddress,
            "apitype":"Web"
        }
        let url='Product_Specification/save_productspecification/'
        this.allapi.PostData(url, data).subscribe(promise=> {
            if (promise.msg_flg == "Update") {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: promise.message,
                    showConfirmButton: false,
                    timer: 3000
                })
                this.product_specification_list = promise.product_specification_list;
                window.location.reload();
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
                    title: promise.message,
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        });
    }
    else{
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Please Select All Mandatory Field',
            showConfirmButton: false,
            timer: 3000
        })
    }
    this.btn_dissable=true;
};

edit_specification(ss:any) {
  this.edit = true;
  this.productspecificationid = ss.productspecification_id;
  this.specificationid = ss.specificationid;  
  this.product_specification_list.forEach((aa:any)=>
    {
       if(aa.specificationid==this.specificationid)
        {
          this.spec_name=aa.specificationname;
        }
    }) 
  this.attributenameid = ss.attributename_id;
  this.attributevalue_id = ss.attributevalue_id;
  this.attributename = ss.attributename;
  this.attribute_value_list = this.attribute_value_list;
};



changevalue(e:any, ss:any)
{
    if(this.attribute_value_list_out.length>0 || this.attribute_value_list_out!="")
    {
        this.attribute_value_list_out.forEach((element:any,index:any)=>{
            if(element.attributename_id==ss) delete this.attribute_value_list_out[index];
         });
    }   

    this.attribute_value_list.forEach((ss:any)=>
        {
if(ss.attributevalue_id==parseInt(e.target.value))
{
this.attribute_value_list_out.push({ 'specification_id': ss.specificationid, 'specification_name': ss.specificationname, 'attributename_id': ss.attributename_id, 'attribute_name': ss.attributename, 'attributevalue_id': parseInt(ss.attributevalue_id) })
;
}
        })
   console.log(this.attribute_value_list_out)
}
changevalue_edit(e:any, ss:any)
{

  this.att_val_id=e.target.value
}
update_attribute () {
 
  var data = {
      "product_id":parseInt(this.productid),
      "specification_id": this.specificationid,
      "attributename_id": this.attributenameid,
      "attributevalue_id": parseInt(this.att_val_id),
      "product_specification_id": parseInt(this.productspecificationid),
      "language_id": 1
  }
  let url='All_Product/update_attribute/';
  this.allapi.PostData(url, data).subscribe(promise=> {
      if (promise.status == "Update") {
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Specification Update Successfully.',
              showConfirmButton: false,
              timer: 3000
          })
          this.product_specification_list = promise.product_specification_list;
          this.edit = false;
          this.edit_product=true;
      }
      else if (promise.status == "Failed") {
          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Somthing Wrong, Please Try Again',
              showConfirmButton: false,
              timer: 3000
          })
          this.edit = false;
          this.edit_product=true;
      }

  });
}

groupBy(list: any[], property: string | number) {
  return list.reduce((groups, item) => {
      const val = item[property];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
  }, {});
}
getIPAddress()
{  
  this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
    this.ipAddress = res.ip;
 
  });
}
onTableDataChange(event: any) {
  this.page = event;
  this.ngOnInit();
}
}
