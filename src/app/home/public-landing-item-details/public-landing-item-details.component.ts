import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
declare var window: any;
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-public-landing-item-details',
  templateUrl: './public-landing-item-details.component.html',
  styleUrls: ['./public-landing-item-details.component.css']
})
export class PublicLandingItemDetailsComponent implements OnInit {
  

  constructor(private allapi:AllapiService,
    private authService:AuthService,
    private activateroute:ActivatedRoute) { }

     
    customerLogin = new FormGroup({
      name: new FormControl(''),
      pass: new FormControl(''),
  });
public cartcount=0;
public featurelist:any;
all_variant_attr_list:any;
public all_variant_attr_list_new:any;
public single_variant_attr:any;
public attributevalue="";
public itm_id=0;
public item_list:any;
public specification_list:any;

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
  salt_token:any;
  salt="";
  pwdd:any;
  btn_dissable:boolean=true;
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
  specification:any;
  public listData: any;
  public groupBy:any;
  isVisible: any=0;
  public pwd="";
  public objectValues(obj:any) {
    return Object.values(obj);
  }
  MD5_Convert(plaintext:string){
    let hash= (CryptoJS.MD5(plaintext))
    return CryptoJS.enc.Base64.stringify(hash);
  } 

  ngOnInit(): void {
    //alert(this.activateroute.snapshot.paramMap.get("itemid"));
  
  
  let item=this.activateroute.snapshot.paramMap.get("itemid");
    var data = {
      "language_id": 1,
      "item_id": Number(item),
     
    }
  
      let requestFormUrl='Landing_Item_Details/get_data_pub/';
      this.allapi.PostData_login(requestFormUrl,data).subscribe(response => {   
        this.specification_list = response.specification_list;
         this.featurelist = response.featurelist;
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
        this.specification_list.forEach((ss:any) => {
      
            this.spe_details.push(ss);
          
        });
        
        if (response.item_list != "") {
            this.item_list = response.item_list[0];
           
            this.specification= aa(this.specification_list, 'specificationname');
  
            
            this.gen = 'active';
          
          }
  
      });
    }

    groupBy3(list: any[], property: string | number) {
      return list.reduce((groups, item) => {
          const val = item[property];
          groups[val] = groups[val] || [];
          groups[val].push(item);
          return groups;
      }, {});
  }

  backtomain()
  {
    window.location.replace("/home");
  }
  add_to_cart(ss:any)
  {
 
    this.customerLogin = new FormGroup({
      name: new FormControl(''),
      pass: new FormControl(''),
  });
    this.role=ss;
   
    let url='Account/set_salt/';
 this.allapi.GetDataById_login(url,1).subscribe(response=>
  {
    this.salt=response.entity.salt;
    this.salt_token=response.entity.salt_token;
  })
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("loginModal")
    );    
    this.formModel.show();
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
  
  userLoginProcess=()=>{
      
    this.btn_dissable=false; 
    
    this.pwdd= this.MD5_Convert(this.customerLogin.value.pass);  
     // let hash=this.Hashsha256(this.pwdd.toString()+this.salt);
   
    let hash= this.MD5_Convert(this.pwdd.toString()+this.salt);
  //   this.customerLogin = new FormGroup({     
  //     pass: new FormControl(''),
  // });
    this.salt="";
    this.customerLogin.patchValue({
      pass: this.pwdd
      });

   
    var data={
      "UserName":this.customerLogin.value.name,
      "Password":hash.toString(),
       "role":"Customer",
      "salt_token":this.salt_token,
         "apitype":"Web",
      "method_details":"userLoginProcess(Login)" 

    }
   
    let requestFormUrl = 'Account/login';
       this.allapi.PostData_login(requestFormUrl,data).subscribe(response => {
       if (response.code == 200) {    

        sessionStorage.setItem('idToken', response.entity.token); 
        sessionStorage.setItem('log_id', response.entity.log_id); 
        sessionStorage.setItem('roleid', response.entity.roleid);
        sessionStorage.setItem('userid', response.entity.userId);
        this.authService.setSecureToken(response.entity.token);  
        
          this.role = response.entity.role;
        
          this.formModel = new window.bootstrap.Modal(
            document.getElementById("loginModal")
          );    
          this.formModel.hide();

        window.location.replace('/app/home');
      
         //this.spinner.hide();
      }
       else {
        this.customerLogin = new FormGroup({
                pass: new FormControl(''),
      });
     
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title:'Invalid UserName/Password',
          showConfirmButton: false,
          timer: 3000
      })
      }
      this.btn_dissable=true;
    });
  }  
  showForm(ids:any){

    this.isVisible = ids;
  }
  customerRegistration(){
   
    if(confirm("Close this?")){
      this.doSomething();
    } 
  }
  doSomething(){
    this.formModel.hide();
  }
  customerForgetSubmit(){
  
    if(confirm("Close this?")){
      this.doSomething();
    } 
  }
  AdminRegistration(){

    if(confirm("Close this?")){
      this.doSomething();
    } 
  }
}
