import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { HeaderComponent } from 'src/app/component/header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing-category',
  templateUrl: './landing-category.component.html',
  styleUrls: ['./landing-category.component.css']
})
export class LandingCategoryComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService,
   private header:HeaderComponent) { }
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
let url='itemsview/getdata/';
this.catid=sessionStorage.getItem('category_id')
     var data={
       "language_id":1,
       "category_id":parseInt(this.catid)
     }    
      this.allapi.PostData_login(url, data).subscribe(promise=>{
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
        let url='itemsview/show_items/';
        this.catid=sessionStorage.getItem('category_id')
          var data = {
              "additional_cat_id": parseInt( this.catid),
              'list': this.itemlist66,
          }
          this.allapi.PostData_login(url, data).subscribe(promise=> {
              this.itemlist = promise.itemslist
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
    let userid=Number(localStorage.getItem('userid'));
    if(userid==0)
    {  
      let url='Account/set_salt/';
      this.allapi.GetDataById_login(url,1).subscribe(response=>
      {
        let salt=response.entity.salt;
        let salt_token=response.entity.salt_token;
        let userrole="Customer";
        this.header.click_login_from_landing(userrole,salt,salt_token);     
        //
      })

    }   
    else{
      var data = {
        "product_id": _ss.productid,
        "item_id": _ss.itemid      
    }
    
      let requestFormUrl = 'Landing_Item_Details/add_to_cart/';
      this.allapi.PostData_userid(requestFormUrl,data).subscribe(response => {
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
        //this.cartservice.addtoCart(response.cartlist.length)
        //this.header.cartcount=response.cartlist.length;
        window.location.reload();
        }
        
      
        
   });
    }  
    }
    
    select_category(ss:any)
    {
      //landingcategory
    var sss=ss.additionalcat_id;
    alert(sss)
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



    