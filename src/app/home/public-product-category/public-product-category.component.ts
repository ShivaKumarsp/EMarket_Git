import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-public-product-category',
  templateUrl: './public-product-category.component.html',
  styleUrls: ['./public-product-category.component.css']
})
export class PublicProductCategoryComponent implements OnInit {
  
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
  ngOnInit(): void {
let url='Public_ItemsView/get_data_addcat/';
this.addcat_id=this.activateroute.snapshot.paramMap.get("addcatid");
     var data={
       "language_id":1,
       "additional_cat_id":parseInt(this.addcat_id)
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
      
       
        let url='Public_ItemsView/show_items/';
                 var data = {
              "additional_cat_id": parseInt(this.addcat_id),
              'list': this.attribute_array,
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
   
    window.location.replace("singleitemdetails/" + _ss.itemid);
  }


  add_to_cart(_ss:any)
  { 
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


