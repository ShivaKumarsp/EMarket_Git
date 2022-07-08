import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-public-landing-category',
  templateUrl: './public-landing-category.component.html',
  styleUrls: ['./public-landing-category.component.css']
})
export class PublicLandingCategoryComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService) { }
   itemlist:any;
   itemlist1:any;
    cat_list: any[] | undefined = undefined;
   attributevaluelist:any;
   attributevaluelist1:any;
   result:any;
   catid:any;
   itemlist5:any;
   itemlist66:any;
   categoryname="";
   
  ngOnInit(): void {
  
let url='Public_ItemsView/getdata/';
this.catid=sessionStorage.getItem('category_id')
     var data={
       "language_id":1,
       "category_id":parseInt(this.catid)
     }    
      this.allapi.PostData(url, data).subscribe(promise=>{
        this.categoryname=promise.categoryname;
          this.itemlist = [];
          this.itemlist = promise.itemslist;
          this.itemlist1 = promise.itemslist;
          let list =JSON.parse(promise.sub_add_cat_list).Table; 
          this.cat_list = this.groupBy(list, "mscname");
         

          this.result = false;
      });

  }

 
  changevalue() {
    this.itemlist5 = [];
      this.itemlist66 = [];
      var iid = 0;
    
      this.attributevaluelist.forEach((dd:any) => {        
            if (dd.in_check == true) {             
                this.itemlist66.push({
                    attribute_name_id: dd.in_attribute_name_id,
                    attribute_value_id: dd.in_attributevalue_id
                });
            }       
              
      });

     
   

      if (this.itemlist66.length>0) {
        let url='Public_ItemsView/show_items/';
        this.catid=sessionStorage.getItem('category_id')
          var data = {
              "additional_cat_id": parseInt( this.catid),
              'list': this.itemlist66,
          }
          this.allapi.PostData(url, data).subscribe(promise=> {
              this.itemlist = promise.itemslist
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
  gotocat(ss:any)
  {
    window.location.replace("publicproductcategory/" + ss);   
  }

  add_to_cart(_ss:any)
  {    
      
    }  
    select_category(ss:any)
    {
      //landingcategory
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


