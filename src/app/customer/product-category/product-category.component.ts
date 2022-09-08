import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  
  
  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute) { }
   itemlist:any;
   itemlist1:any;
    cat_list: any[] | undefined = undefined;
   result:any;
   catid:any;
   itemlist5:any;
   itemlist66:any;
   addcat_id:any;
   attributenamelist:any[] | undefined = undefined; 
   attributenamelist_1:any;
   addcategoryname="";
   filter_value="";
   base64='data:image/jpeg;base64,';
   imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
  ngOnInit(): void {
let url='itemsview/get_data_addcat/';
this.addcat_id=this.activateroute.snapshot.paramMap.get("addcatid");
     var data={
       "language_id":1,
       "additional_cat_id":parseInt(this.addcat_id),
       "orderby":""
     }
    
      this.allapi.PostData(url, data).subscribe(promise=>{
        this.addcategoryname=promise.addcategoryname;
          this.itemlist = [];
          this.itemlist = promise.itemslist;
          this.itemlist1 = promise.itemslist; 
          var attrlist=JSON.parse(promise.attributenamelist).Table;
          this.attributenamelist = this.groupBy(attrlist, "attributename");
          this.attributenamelist_1=this.attributenamelist;
          this.result = false;
      });
  }
 attribute_name_array:any;
 attribute_array:any;
  changevalue(ss:any) {
    this.itemlist5 = [];
      this.itemlist66 = [];
      var iid = 0; 
      if(this.attribute_name_array==undefined)
      {this.attribute_name_array=[];
      }
       if (this.attribute_name_array.length > 0 ) {
        this.attribute_name_array.forEach((element: any, index: any) => {
          if (element.attributename_id == ss.attributename_id && element.attributevalue_id==ss.attributevalue_id)
           delete this.attribute_name_array[index];
        });       
      } 
if(ss.in_check==true)
{
  this.attribute_name_array.push({'attributename_id':ss.attributename_id,'attributevalue_id':ss.attributevalue_id})
}   
var cnt=this.attribute_name_array;
this.attribute_array=this.attribute_name_array;
      if (this.attribute_array.length>0) { 
        let url='itemsview/show_items/';
                 var data = {
              "additional_cat_id": parseInt(this.addcat_id),
              'list': this.attribute_array,
              "orderby": this.filter_value,
              "language_id":1
          }
          this.allapi.PostData(url, data).subscribe(promise=> {
            if(promise.itemslist!=""|| promise.itemslist.length>0)
            {
              this.itemlist = promise.itemslist
            }
             else{
              this.itemlist = this.itemlist1;
             }
          });
      
    }
      else {
          this.itemlist = this.itemlist1;
      }  
  }

  viewproductdetails(_ss:any)
  {   
    window.location.replace("/app/home/itemdetails/" + _ss.itemid);
  }


  add_to_cart(_ss:any)
  { 
    var data = {
      "product_id": _ss.productid,
      "item_id": _ss.itemid,   
  }
      let requestFormUrl = 'Landing_Item_Details/add_to_cart/';
      this.allapi.PostData(requestFormUrl,data).subscribe(response => {
        if(response.msg_flg=='Failed')
        {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: response.message,
            showConfirmButton: false,
            timer: 3000
        });
        }
        else  if(response.msg_flg=='Insert')
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 3000
        });
        window.location.reload();
        }      
      
        
   });
    }  

    get_filter_item(ss:any)
    {
      let url='itemsview/get_filter_items/';
      var data = {
      "additional_cat_id": parseInt(this.addcat_id),
      'list': this.attribute_array,
      "orderby":this.filter_value,
      "language_id":1
}
this.allapi.PostData(url, data).subscribe(promise=> {
 if(promise.itemslist!=""|| promise.itemslist.length>0)
 {
   this.itemlist = promise.itemslist
 }
  else{
   this.itemlist = this.itemlist1;
  }
});
    }
    select_category(ss:any)
    {
    var sss=ss.additionalcat_id;
     }
    groupBy(list: any[], property: string | number) {
      return list.reduce((groups, item) => {
          const val = item[property];
          groups[val] = groups[val] || [];
          groups[val].push(item);
          return groups;
      }, {});
    }

    }


