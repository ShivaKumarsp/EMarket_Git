import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2';
import { FooterComponent } from 'src/app/component/footer/footer.component';
import { HeaderComponent } from 'src/app/component/header/header.component';
import { LandingItemDetailsComponent } from '../landing-item-details/landing-item-details.component';
import { InterfaceService } from 'src/app/AllPageService/interface.service';
import { Guid } from 'guid-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
declare var window: any;


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
 
  toastr: any;
  formModel: any;
  matMenu:any;
  constructor( private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private footer:FooterComponent,
   private header:HeaderComponent,
   public Interface:InterfaceService,
   public spinner:NgxSpinnerService) { }  

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: true,
      navSpeed: 700,
      navText: ['&#8249', '&#8250;'],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 1
        },
        740: {
          items: 1
        },
        940: {
          items: 1
        }
      },
      nav: true
    }
    
  
      SliderSetting: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: true,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
          0: {
            items: 1
          },
          400: {
            items: 2
          },
          740: {
            items: 3
          },
          940: {
            items: 4
          }
        },
        nav: true
      }
   


     
   short_view_detail: any;
   product_list:any;
   category_list:any=[];
   product123:any;
   module_list:any;
   itemslist_1:any;
   itemslist_2:any;
   subcategory_list:any;
   addcategory_list:any;
   banner_list:any;
   urlcheck:any;
   guid:any;
   base64="data:image/jpeg;base64,";
   imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
   
  ngOnInit(): void {  
  
    const userRole = localStorage.getItem('Role');
   this.urlcheck= this.router.routerState.snapshot.url.split('/');
 if(this.urlcheck[1]!='app')
 {
  window.location.replace("/app/home");
 }
 if(userRole=='SuperAdmin'||userRole=='Vendor')
 {  
  window.location.replace("/app/admindashboard");
 }
 if(userRole=='Vendor')
 {  
  window.location.replace("/app/vendordashboard");
 }
 if(userRole=='Delivery')
 {  
    window.location.replace("/app/accept_delivery");
 }
 else if(userRole=="HubManager"){

  window.location.replace('/app/hub_consignment_list');
 }
 else if(userRole=="FacilitationCenter"){

  window.location.replace('/app/assign_item_from_vendor');
 }


 this.spinner.show();
      let requestFormUrl='Landing/getdata/';
    this.allapi.GetDataById_login(requestFormUrl,1).subscribe(response => {      
      this.product_list =response.product_list;
      this.category_list = response.category_list;     
      this.itemslist_1 = JSON.parse(response.itemslist_1).Table;    
      this.itemslist_2 = JSON.parse(response.itemslist_2).Table;  
      this.banner_list = JSON.parse(response.banner_list).Table; 
    }); 
    this.spinner.hide(); 

     }
  
  viewproductdetails(_ss:any)
  {
    sessionStorage.setItem('itemid', _ss.itemid);
    window.location.replace("/home/itemdetails");
  }
  
  short_view(ss:any) {
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("exampleModal")         
    );    
    this.formModel.show(); 
            this.short_view_detail = ss;
        }


        get_category_page(ss:any)
        {          sessionStorage.setItem('category_id', ss.mcid);
          window.location.replace("/app/landingcategory");          
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
get_subcategory(ss:any)
{
  var data={
    "mc_id":ss.mcid,
    "language_id":1
  }
  let url='Landing/get_subcategory/';
  this.allapi.PostData_login(url,data).subscribe(response => {      
  
    this.subcategory_list = JSON.parse(response.subcategory_list).Table;
    console.log( this.subcategory_list)
  });  
}
 
get_addcategory(ss:any,aa:any)
{
  var data={
    "mc_id":ss.mcid,
    "msc_id":aa.mscid,
    "language_id":1
  }
  let url='Landing/get_addcategory/';
  this.allapi.PostData_login(url,data).subscribe(response => {      
  
    this.addcategory_list = JSON.parse(response.addcategory_list).Table;
console.log( this.addcategory_list)
  });  
}


}
