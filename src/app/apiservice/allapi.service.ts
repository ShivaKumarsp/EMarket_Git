import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpUniversalService } from './http-universal.service';

@Injectable({
  providedIn: 'root'
})
export class AllapiService {  

  constructor(private HttpUniversalService:HttpUniversalService,
    private http : HttpClient,
    private route: Router) { }
    public jwtHelper: JwtHelperService = new JwtHelperService();
    
    token:any;

//login 
    PostData_login =(requestFormUrl:any, formdata: any)=>{
      return this.HttpUniversalService.HttpPost_login(requestFormUrl,formdata);
       }
       GetAllData_login = (requestFormUrl:any) => {
        return this.HttpUniversalService.httpget_login(requestFormUrl);
    }
    GetDataById_login = (requestFormUrl:any, id:any) =>{   
      console.log(requestFormUrl+id)
      return this.HttpUniversalService.httpgetByid_login(requestFormUrl+id);
    }
// only userid
    PostData_userid =(requestFormUrl:any, formdata: any)=>{
      var rolename=localStorage.getItem('rolename');
      if(rolename!="null" && rolename!='Public')
    {
    this.token=localStorage.getItem('idToken');
    if (this.token && this.jwtHelper.isTokenExpired(this.token)) {
     
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Session Expired, Please Login',
        showConfirmButton: false,
        timer: 3000
    })
    localStorage.clear();
        localStorage.setItem('Role',"Public");
        window.location.replace('/app/home')
    }
  } 
      return this.HttpUniversalService.Http_Post_userid(requestFormUrl,formdata);
       }

  //Others 
  GetAllData = (requestFormUrl:any) => {
  return this.HttpUniversalService.http_get(requestFormUrl);
}
GetDataById = (requestFormUrl:any, id:any) =>{  
  var rolename=localStorage.getItem('rolename');
   if(rolename!="null" && rolename!='Public')
{
this.token=localStorage.getItem('idToken');
if (this.token && this.jwtHelper.isTokenExpired(this.token)) {
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Session Expired, Please Login',
    showConfirmButton: false,
    timer: 3000
})
localStorage.clear();
    localStorage.setItem('Role',"Public");
    window.location.replace('/app/home')
}
} 
  console.log(requestFormUrl+id)
  return this.HttpUniversalService.http_getBy_id(requestFormUrl+id);
}

  PostData =(requestFormUrl:any, formdata: any)=>{
    var rolename=localStorage.getItem('rolename');
         if(rolename!="null" && rolename!='Public')
    {
    this.token=localStorage.getItem('idToken');
    if (this.token && this.jwtHelper.isTokenExpired(this.token)) {
        Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Session Expired, Please Login',
        showConfirmButton: false,
        timer: 3000
    })
    localStorage.clear();
        localStorage.setItem('Role',"Public");
        window.location.replace('/app/home')
    }
  }      
    return this.HttpUniversalService.Http_Post(requestFormUrl,formdata);
     }
   

  Get_Put = (requestFormUrl:any, id:any) =>{   
    return this.HttpUniversalService.http_put(requestFormUrl+id);
  }

  Get_Delete = (requestFormUrl:any, id:any) =>{   
    return this.HttpUniversalService.http_delete(requestFormUrl+id);
  }

  PostData1 =(requestFormUrl1:any, formdata: any)=>{
  
    return this.HttpUniversalService.Http_Post(requestFormUrl1,formdata);
  }

  upload_image =(requestFormUrl:any, formdata: any)=>{
    return this.HttpUniversalService.upload_image(requestFormUrl,formdata);
     }
// =======================================
  

  Postgetproduct(){
    console.log('Header Product Get ');
    return this.http.get<any>("https://fakestoreapi.com/products")
    .pipe(map((res:any)=>{
      console.log(res);
      return res;
    }))
  }


}
