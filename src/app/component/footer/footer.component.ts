import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
@Injectable({
  providedIn:'root'
})
export class FooterComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService) { }
    category_list:any;
    category_list_footer:any;
   product_list:any;

   
  ngOnInit(): void {

    // let requestFormUrl='Landing/getdata_footer/';
    // this.allapi.GetDataById_login(requestFormUrl,1).subscribe(response => {  
    //   this.category_list = response.category_list;     
    // }); 
  }

  get_category_page(ss:any)
  {  
    sessionStorage.setItem('category_id', ss.mcid);
    window.location.replace("/app/landingcategory");          
  }

}
