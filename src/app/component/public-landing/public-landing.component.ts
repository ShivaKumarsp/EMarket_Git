import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { AuthService } from 'src/app/service/authService/auth.service';
declare var window: any;

@Component({
  selector: 'app-public-landing',
  templateUrl: './public-landing.component.html',
  styleUrls: ['./public-landing.component.css']
})
export class PublicLandingComponent implements OnInit {
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
    slides = [
      {id: 1, img: "assets/img/hero-bg-2.jpg"},
      {id: 2, img: "assets/img/hero-bg-2.jpg"},
      {id: 3, img: "assets/img/hero-bg.jpg"}
    ];
    
  constructor( private httpClient: HttpClient,
    private router: Router,
    private allapi:AllapiService,
    private authService:AuthService,
    private formBuilder:FormBuilder) { }
 homemenu=false;
 product_list:any;
 category_list:any;
 formModel:any;

 ngOnInit(): void {
   
  let requestFormUrl='Landing/getdata/'; 
this.allapi.GetDataById_login(requestFormUrl,1).subscribe(response => {   
  this.product_list =JSON.parse(response.product_list).Table;
    this.category_list = JSON.parse(response.category_list).Table;

});  
}

add_to_cart(ss: any){

}

view_page(ss:any)
{
  sessionStorage.setItem('itemid',ss.itemid);
   window.location.replace("/singleitemdetails")
  // this.router.navigate(["/app/home/itemdetails"]);
}
short_view(ss:any) {
  this.formModel = new window.bootstrap.Modal(
    document.getElementById("exampleModal")         
  ); 
}

get_category_page(ss:any)
{
  sessionStorage.setItem('category_id', ss.mcid);
  window.location.replace("publiccategory");
  
}
}
