import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HeaderComponent } from 'src/app/component/header/header.component';
import { LoginHomeComponent } from 'src/app/home/login-home/login-home.component';
import { CartService } from 'src/app/AllPageService/CartService/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var window: any;


export interface Employee {
  id: number,
  firstName: string,
  lastName: string,
  department: number,
  address: string,
  contactNumber: string
}

@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
  transform(value: Array<any>, field: string): Array<any> {
    const groupedObj = value.reduce((prev, cur)=> {
      (prev[cur[field]] = prev[cur[field]] || []).push(cur);
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
  }
}

@Component({
  selector: 'app-landing-item-details',
  templateUrl: './landing-item-details.component.html',
  styleUrls: ['./landing-item-details.component.css']
})

export class LandingItemDetailsComponent implements OnInit {
  router: any;
  constructor(private allapi:AllapiService,
    private activateroute:ActivatedRoute,
    private header:HeaderComponent,
    private loginmodel:LoginHomeComponent,
    private cartservice:CartService,
    private spinner:NgxSpinnerService
   ) { }

  

public cartcount=0;
public featurelist:any;
all_variant_attr_list:any;
public all_variant_attr_list_new:any;
public single_variant_attr:any;
public attributevalue="";
public itm_id=0;
public item_list:any;
public specification_list:any;
imagepath:any;
public gen="";
formModel:any;
public usrnme="";
 public test="";
 public userName="";
 public password="";
 public rememberMe="";
  roleid =0;
 templateformdata = {
  "UserName": "",
  "Password": "",
  "role": ""
  }
  check_session={
    userid:0,
    roleid:0,
  }
  public register = false;
  public otp = false;
  public login = true;
  public forget = false;
  public details = false;
  public role="";
  login_dto: any;
  module_list: any;
  page_list: any;
  templatesList: any;
  spe_details:any;
  edittemplatesList:any;
  det="";

  public rdata: any;
  public feature: any;
  specification:any;
  public listData: any;
  public groupBy:any;
  item:any;
  similar_item_list:any;

  all_product_variant_one:any;
  all_product_variant_two:any;
  all_product_variant_two1:any;
  multiple_image_list:any;
  rating_list:any;
  base64="data:image/jpeg;base64,";
  imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
  all_product_variant_one_new:any[] | undefined = undefined;
  all_product_variant_two_new:any[] | undefined = undefined;
  variant_name1="";
  variant_name2="";
  salt="";
  salt_token="";
  totalrating=0;
  public objectValues(obj:any) {
    return Object.values(obj);
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navText: ['', ''],
    navSpeed:700,
    responsive: {

      0: {

        items: 1

      }

    },

    nav: true

  }
  
  slides = [

    {id: 3, img: "assets/img/shirt-green.png" ,title:"Green", mrp:500,listing:399},
    {id: 1, img: "assets/img/shirt.png" , title:"Shirt", mrp:500,listing:399},
    {id: 2, img: "assets/img/shirt-black.png", title:"Black Shirt", mrp:500,listing:399},
    {id: 4, img: "assets/img/shirt-red.png",title:"Red Shirt", mrp:500,listing:399}

  ];

ngOnInit(): void {
 // alert(this.activateroute.snapshot.paramMap.get("itemid"));

//let item=sessionStorage.getItem('itemid');
this.item=this.activateroute.snapshot.paramMap.get("itemid");

  var data = {
    "language_id": 1,
    "item_id": parseInt(this.item),
   
  }

    let requestFormUrl='Landing_Item_Details/get_data/';
    this.allapi.PostData_login(requestFormUrl,data).subscribe(response => {   
      this.similar_item_list=JSON.parse(response.similar_item_list).Table;
      this.specification_list = response.specification_list;
      this.multiple_image_list = response.multiple_image_list;
      this.rating_list = response.rating_list;
      var rating=0;
      var totalrating=0;
      if(this.rating_list!="")
      {       
        this.rating_list.forEach((ss:any)=>
        {
          rating=rating+ss.rating_number;
        })
       
        totalrating=(rating*5)/(this.rating_list.length*5);
        //totalrating=(rating/(this.rating_list.length*5))*100;
      }
      this.totalrating=totalrating;
      if(response.featurelist!=="" || response.featurelist!==null)
      {
        this.featurelist = response.featurelist;
      }      
      this.all_variant_attr_list = response.all_variant_attr_list;

let aa= this.groupBy = (array:any, key:any) => { 

  return array.reduce((result:any, currentValue:any) => {

    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

this.rdata= aa(this.all_variant_attr_list, 'attributename');

this.all_variant_attr_list = this.groupBy3(response.all_variant_attr_list, "attributename");
this.edittemplatesList=this.all_variant_attr_list  
      this.all_variant_attr_list_new = response.all_variant_attr_list;
      this.single_variant_attr = response.single_variant_attr;

      if (this.single_variant_attr != null && this.single_variant_attr != "") {
        this.attributevalue = this.single_variant_attr[0].attributevalue;
        this.itm_id = this.single_variant_attr[0].itemid;
      }     
      this.spe_details = [];
     
      var spec=this.specification_list[0].specificationname;

      if (response.item_list != "") {
          this.item_list = response.item_list[0]; 
          this.imagepath= this.item_list.imagepath;      
          this.specification= aa(this.specification_list, 'specificationname');
          this.gen = 'active';        
        }
        this.specification_list.forEach((aa:any) => {
          if (spec == aa.specificationname) {
          this.spe_details.push(aa);
          }
      });

    //   this.all_product_variant_one=response.all_product_variant_one; 
    //   this.all_product_variant_two=response.all_product_variant_two;
    //   var attrid=0;
    //   this.all_product_variant_one.forEach((ss:any)=>
    //   {
    //  if(attrid==0)
    // {
    // attrid=ss.attribute_value_id;
    // }
    //   });

    //   this.all_product_variant_two1=[];
    //   this.all_product_variant_two.forEach((ss1:any)=>
    //   {
    //     if(attrid==ss1.attribute_value_id)
    //     {
    //     this.all_product_variant_two1.push(ss1);
    //     }
    //   });

    //   this.all_product_variant_one_new = this.groupBy3(this.all_product_variant_one, "attributename");
    //   this.all_product_variant_two_new = this.groupBy3(this.all_product_variant_two1, "attributename");

    });
  }

  get_item_details(ss:any)
  {
    var data = {
      "language_id": 1,
      "item_id": parseInt(ss),
     
    }
  
      let requestFormUrl='Landing_Item_Details/get_data/';
      this.allapi.PostData(requestFormUrl,data).subscribe(response => {   
        this.similar_item_list=JSON.parse(response.similar_item_list).Table;
        this.specification_list = response.specification_list;
        this.all_product_variant_one=response.all_product_variant_one; 
        this.rating_list = response.rating_list;
        this.all_product_variant_two=response.all_product_variant_two;
        // if(response.cartlist!=="" || response.cartlist!==null)
        // {
        //   this.cartcount = response.cartlist.length;
        // }
        if(response.featurelist!=="" || response.featurelist!==null)
        {
          this.featurelist = response.featurelist;
        }      
        this.all_variant_attr_list = response.all_variant_attr_list;
  
  let aa= this.groupBy = (array:any, key:any) => {
  
    return array.reduce((result:any, currentValue:any) => {
  
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };
  
  this.rdata= aa(this.all_variant_attr_list, 'attributename');
 
  this.all_variant_attr_list = this.groupBy3(response.all_variant_attr_list, "attributename");
  this.edittemplatesList=this.all_variant_attr_list
      
       
  
        this.all_variant_attr_list_new = response.all_variant_attr_list;
        this.single_variant_attr = response.single_variant_attr;
  
        if (this.single_variant_attr != null && this.single_variant_attr != "") {
          this.attributevalue = this.single_variant_attr[0].attributevalue;
          this.itm_id = this.single_variant_attr[0].itemid;
        }     
        this.spe_details = [];
       
        var spec=this.specification_list[0].specificationname;
  
        if (response.item_list != "") {
            this.item_list = response.item_list[0];   
            this.imagepath= this.item_list.imagepath;           
            this.specification= aa(this.specification_list, 'specificationname');
            this.gen = 'active';        
          }
          this.specification_list.forEach((aa:any) => {
            if (spec == aa.specificationname) {
            this.spe_details.push(aa);
            }
        });    
  
  
      });
  }
  change_relatedvalue(ss:any) {
      
     var data = {
       "language_id": 1,
       "item_id": parseInt(ss.itemid)      
     }
   
       let requestFormUrl='Landing_Item_Details/get_data/';
       this.allapi.PostData_login(requestFormUrl,data).subscribe(response => {   
        this.similar_item_list=JSON.parse(response.similar_item_list).Table;
        this.specification_list = response.specification_list;
        this.all_product_variant_one=response.all_product_variant_one; 
        this.rating_list = response.rating_list;
        this.all_product_variant_two=response.all_product_variant_two;
        // if(response.cartlist!=="" || response.cartlist!==null)
        // {
        //   this.cartcount = response.cartlist.length;
        // }
        if(response.featurelist!=="" || response.featurelist!==null)
        {
          this.featurelist = response.featurelist;
        }      
        this.all_variant_attr_list = response.all_variant_attr_list;
  
  let aa= this.groupBy = (array:any, key:any) => {
  
    return array.reduce((result:any, currentValue:any) => {
  
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };
  
  this.rdata= aa(this.all_variant_attr_list, 'attributename');
  //this.feature= aa(this.featurelist, 'producttitle');
  
  this.all_variant_attr_list = this.groupBy3(response.all_variant_attr_list, "attributename");
  this.edittemplatesList=this.all_variant_attr_list
      
       
  
        this.all_variant_attr_list_new = response.all_variant_attr_list;
        this.single_variant_attr = response.single_variant_attr;
  
        if (this.single_variant_attr != null && this.single_variant_attr != "") {
          this.attributevalue = this.single_variant_attr[0].attributevalue;
          this.itm_id = this.single_variant_attr[0].itemid;
        }     
        this.spe_details = [];
       
        var spec=this.specification_list[0].specificationname;
  
        if (response.item_list != "") {
            this.item_list = response.item_list[0];   
            this.imagepath= this.item_list.imagepath;           
            this.specification= aa(this.specification_list, 'specificationname');
            this.gen = 'active';        
          }
          this.specification_list.forEach((aa:any) => {
            if (spec == aa.specificationname) {
            this.spe_details.push(aa);
            }
        });
  
  
      });

  }

get_specification_details (ss:any) {
  
  this.spe_details = [];
   
      this.gen = 'active';
        this.det = '';
    
 
    this.specification_list.forEach((aa:any) => {
      if (ss == aa.specificationname) {
      this.spe_details.push(aa);
      }
  });
 
  
}

change_image(ss:any)
{
  this.imagepath=ss.image_url;

}

add_to_cart_old(_ss:any)
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
      window.location.reload();
      }
 });
  }  
  }

  add_to_cart(_ss:any)
  {
    let userid=Number(localStorage.getItem('userid'));
    if(userid==0)
    {  

    }   
    else{
     
    }    
    var data = {
      "product_id": _ss.productid,
      "item_id": _ss.itemid,
      "session_cart":localStorage.getItem('v_cart')  
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
    
  
    single_checkout_old(_ss:any)
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
        this.spinner.show();
        var data = {
          "product_id": _ss.productid,
          "item_id": _ss.itemid      
      }
      let url='Landing_Item_Details/single_checkout/';
      this.allapi.PostData(url, data).subscribe(promise=>
        {
if(promise.msg_flg=='Insert')
{ 
  // this.router.navigate(["/app/direct_cart"]);
  window.location.replace('app/direct_cart');
  this.spinner.hide();
}
else 
{
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Failed To Add Try Again',
    showConfirmButton: false,
    timer: 3000
});
}
        }) 
  
      }  
      this.spinner.hide();
      }

      single_checkout(_ss:any)
      {
     
        let userid=Number(localStorage.getItem('userid'));
               if(userid==0)
        {  
          var data = {
            "product_id": _ss.productid,
            "item_id": _ss.itemid,
            "session_cart":localStorage.getItem('v_cart')  
          }
            let requestFormUrl = 'Landing_Item_Details/single_public_checkout/';
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
              else if(response.msg_flg=='Insert')
              {
                window.location.replace('/app/public_direct_cart')           
              }                
         });
        }   
        else{
          var data1 = {
            "product_id": _ss.productid,
            "item_id": _ss.itemid
          }
            let requestFormUrl1 = 'Landing_Item_Details/single_checkout/';
            this.allapi.PostData_userid(requestFormUrl1,data1).subscribe(response => {
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
              else if(response.msg_flg=='Insert')
              {
                window.location.replace('/app/direct_cart')
           
              }
              
            
              
         });
        }    
       
        } 

    userLogin = () => {   
      alert(123)   
      this.templateformdata.UserName = this.userName;
      this.templateformdata.Password = this.password;  
      this.templateformdata.role ='Customer';  
      // this.templateformdata.role = String(sessionStorage.getItem('rolename'));  
      let requestFormUrl = 'Account/login';
         this.allapi.PostData(requestFormUrl,this.templateformdata).subscribe(response => {
         if (response.code == 200) { 
               //sessionStorage.setItem('userName', response.entity.username);
               sessionStorage.setItem('idToken', response.entity.token); 
          sessionStorage.setItem('log_id', response.entity.log_id); 
          sessionStorage.setItem('roleid', response.entity.roleid);
          sessionStorage.setItem('userid', response.entity.userId);
          sessionStorage.setItem('setUser', JSON.stringify(response.entity));
          //this.authService.setSecureToken(response.entity.token);
  
         
            this.role = response.entity.role;
            sessionStorage.setItem('role', this.role);
           // this.usrnme=response.username;
           this.formModel = new window.bootstrap.Modal(
            document.getElementById("LoginModal")         
          );    
          this.formModel.hide(); 
         
            let requestFormUrl = 'Account/getmodule/';
            let roleid= Number(sessionStorage.getItem('roleid'));
          let userid=Number(sessionStorage.getItem('userid'));
          this.check_session.roleid=roleid;
           this.check_session.userid=userid;
             this.allapi.PostData(requestFormUrl,this.check_session).subscribe(response => {
            
            this.module_list = response.getmodulelist;
            this.page_list = response.getpagelist;
            this.cartcount = response.cartlist.length;
            window.location.replace("home/ItemDetails");
        })           
       
    
           
        }
         else {
         // this.spinner.hide();
          //this.toastr.errorToaser(response.error);
        }
      });
    }
  
    backtomain()
    {
      window.location.replace("/app/home");
    }
 
  
  groupBy5 = (xs: any[], key: string) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
  }

  groupBy3(list: any[], property: string | number) {
    return list.reduce((groups, item) => {
        const val = item[property];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
}

 

}
