import { HttpClient,HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
  
})

export class HttpUniversalService {

  public baseUrl = 'http://localhost:1305/api/';
  secretKey:string="123";
public token=localStorage.getItem('idToken');
public userid=localStorage.getItem('userid'); 



  constructor(private httpClient: HttpClient) {
    let protocal=window.location.protocol.toLowerCase();
    
       } 
    
     
  /// HTTP method for login
  private login_header = new HttpHeaders(
    {
      'Content-Type': 'application/json'
    });

public login_httpOptions = {
headers: new HttpHeaders({
  "Content-Type": "application/json"      
})
}

public httpOptions_login = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
 
  })
}



  public httpget_login = (apiURL: string): Observable<any> => {
    let url = "";
   
    url = this.baseUrl + apiURL;
    return this.httpClient.get(url, this.login_httpOptions)
      .pipe(
        tap((data: any) => {
          this.handlerSuccess(data);
        }),
        catchError((err) => {
          throw this.handlerError(err);
        })
      );
  }
  
  public httpgetByid_login = (apiURL: string): Observable<any> => {
    apiURL = this.baseUrl + apiURL;
    
    return this.httpClient.get(apiURL, { headers: this.login_header })
      .pipe(
        tap((data: any) => {
          this.handlerSuccess(data);
        }),
        catchError((err) => {
          throw this.handlerError(err);
        })
      );
  }
  

  public HttpPost_login = (apiURL: string, postData?: any): Observable<any> => {
    let url = "";
    console.log( this.baseUrl + apiURL);
       url = this.baseUrl + apiURL;
   
    return this.httpClient.post(url, postData,  { headers: this.login_header })
      .pipe(
        tap((data: any) => {
          this.handlerSuccess(data);
        }),
        catchError((err) => {
          throw this.handlerError(err);
        })
      );
  }

  public upload_image = (apiURL: string, postData?: any): Observable<any> => {
    let url = "";
    console.log( this.baseUrl + apiURL);
      url = this.baseUrl + apiURL;
   
    return this.httpClient.post(url, postData)
      .pipe(
        tap((data: any) => {
          this.handlerSuccess(data);
        }),
        catchError((err) => {
          throw this.handlerError(err);
        })
      );
  }

 /// HTTP method for other

 private header = new HttpHeaders(
  {
    'Content-Type': 'application/json',
    "userid": `${this.userid}`,
    "Authorization": `Bearer ${this.token}`
  });

  public httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "userid":  `${this.userid}`,
      "Authorization": `Bearer ${this.token}`   
    })
  }

  public httpOptions_userid = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "userid":  `${this.userid}`   
    })
  }
 

    public httpOptionsnokey = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`
      })
    }


  /// get HTTP method
  public http_get = (apiURL: string): Observable<any> => {
    let url = "";
    url = this.baseUrl + apiURL; 
    return this.httpClient.get(url, this.httpOptions)
      // .pipe(
      //   tap((data: any) => {
      //     this.handlerSuccess(data);
      //   }),
      //   catchError((err) => {
      //     throw this.handlerError(err);
      //   })
      // );
  }

   /// get HTTP method with id
   public http_getBy_id = (apiURL: string): Observable<any> => {
    let url = "";    
    url = this.baseUrl + apiURL;
       return this.httpClient.get(url, this.httpOptions )
      // .pipe(
      //   tap((data: any) => {
      //     console.log(data);
      //     this.handlerSuccess(data);
      //   }),
      //   catchError((err) => {
      //     throw this.handlerError(err);
      //   })
      // );
  }
   /// post HTTP method
   public Http_Post_userid = (apiURL: string, postData?: any): Observable<any> => {
    let url = "";   
    url = this.baseUrl + apiURL;
    //alert(url)
    return this.httpClient.post(url, postData,   this.httpOptions_userid )
      // .pipe(
      //   tap((data: any) => {
      //     this.handlerSuccess(data);
      //   }),
      //   catchError((err) => {
      //     throw this.handlerError(err);
      //   })
      // );
  }


  /// post HTTP method
  public Http_Post = (apiURL: string, postData?: any): Observable<any> => {
    let url = "";   
    url = this.baseUrl + apiURL;
    //alert(url)
      // return this.httpClient.post(apiURL, postData,  { headers: this.header })
    return this.httpClient.post(url, postData,   this.httpOptions )
      // .pipe(
      //   tap((data: any) => {
      //     this.handlerSuccess(data);
      //   }),
      //   catchError((err) => {
      //     throw this.handlerError(err);
      //   })
      // );
  }

   /// get HTTP put
   public http_put = (apiURL: string): Observable<any> => {
    apiURL = this.baseUrl + apiURL; 
    return this.httpClient.put(apiURL,  this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.handlerSuccess(data);
        }),
        catchError((err) => {
          throw this.handlerError(err);
        })
      );
  }

   /// get HTTP put
   public http_delete = (apiURL: string): Observable<any> => {
    apiURL = this.baseUrl + apiURL;
    
    return this.httpClient.delete(apiURL, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.handlerSuccess(data);
        }),
        catchError((err) => {
          throw this.handlerError(err);
        })
      );
  }

// product data
  public http_get_poduct = (apiURL: string): Observable<any> => {
    let url = "";
    url = this.baseUrl + apiURL;
    return this.httpClient.get(url, this.httpOptions)
      .pipe(
        tap((data: any) => {
          console.log(data);
          this.handlerSuccess(data);
        }),
        catchError((err) => {
          throw this.handlerError(err);
        })
      );
  }

 


   /// Error handler
    private handlerSuccess(res: Response) {
   console.log(res);
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res;
    return body || {};
  }

  private handlerError(error: any) {
    let errMsg = error.message || 'Server error';
    return errMsg;
  }
}

