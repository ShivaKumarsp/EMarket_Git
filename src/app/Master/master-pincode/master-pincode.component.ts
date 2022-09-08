import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-master-pincode',
  templateUrl: './master-pincode.component.html',
  styleUrls: ['./master-pincode.component.css']
})
export class MasterPincodeComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
submitted = false;

  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService) { }

  form = new FormGroup({
    country_id:new FormControl('',[Validators.required]),
    state_id:new FormControl('',[Validators.required]),
        cityid:new FormControl('',[Validators.required]),
        v_pincode:new FormControl('',[Validators.required,Validators.pattern("^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$")]),
        v_area:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9_ ]*$")])

  });
  search="";
  countryid="";
  stateid="";
  city_id="";
  pincode="";
  area="";
  pincode_id=0;
  country_list:any;
  all_pincode_list:any;
  state_list:any;
  city_list:any;
  validation_list:any;
  closeform:any;
  add_status=true;

  ngOnInit(): void {
    this.closeform = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );

    let url='Manage_Pincode/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>      {
        this.country_list=JSON.parse(promise.country_list).Table;
       this.all_pincode_list=JSON.parse(promise.all_pincode_list).Table;
      })
  }
  get_state(ss:any){
    var data={
"language_id":1,
"country_id":parseInt(ss)
    }
    let url='Manage_Pincode/get_state/';
    this.allapi.PostData(url,data).subscribe(promise=>      {
      this.state_list=[];
      this.state_list=JSON.parse(promise.state_list).Table;

      })
  }
  get_city(ss:any){
    var data={
      "language_id":1,
      "country_id":parseInt(this.countryid),
      "state_id":parseInt(ss)
    }
    let url='Manage_Pincode/get_city/';
    this.allapi.PostData(url,data).subscribe(promise=>      {
      this.city_list=[];
      this.city_list=JSON.parse(promise.city_list).Table;

      })
  }


  Clear()
  {
    this.add_status=true;
    this.countryid="";
    this.stateid="";
    this.city_id="";
    this.pincode="";
    this.area="";
    this.pincode_id=0;
this.submitted=false;
this.form.reset();
  }

  adddata(){


    let areaJson ={
      "areadata": [
        {
          "area": "39 Gtc",
          "pincode": 221002
        },
        {
          "area": "Ajgara",
          "pincode": 221101
        },
        {
          "area": "Akorha",
          "pincode": 221209
        },
        {
          "area": "Amarpatti",
          "pincode": 221101
        },
        {
          "area": "Amauli",
          "pincode": 221104
        },
        {
          "area": "Ambba",
          "pincode": 221104
        },
        {
          "area": "Anai",
          "pincode": 221201
        },
        {
          "area": "Ardely Bazar",
          "pincode": 221002
        },
        {
          "area": "Ashapur",
          "pincode": 221007
        },
        {
          "area": "Assi",
          "pincode": 221005
        },
        {
          "area": "Aurangabad",
          "pincode": 221010
        },
        {
          "area": "Ayar",
          "pincode": 221210
        },
        {
          "area": "Babatpur Ad",
          "pincode": 221006
        },
        {
          "area": "Babiaon",
          "pincode": 221101
        },
        {
          "area": "Bachhaon",
          "pincode": 221011
        },
        {
          "area": "Banakat",
          "pincode": 221403
        },
        {
          "area": "Banakat Newada",
          "pincode": 221107
        },
        {
          "area": "Baragaon",
          "pincode": 221204
        },
        {
          "area": "Barahi Newada",
          "pincode": 221207
        },
        {
          "area": "Barain",
          "pincode": 221007
        },
        {
          "area": "Bariyasanpur",
          "pincode": 221007
        },
        {
          "area": "Barki",
          "pincode": 221403
        },
        {
          "area": "Barthara Khurd",
          "pincode": 221104
        },
        {
          "area": "Bartharakalan Edso",
          "pincode": 221001
        },
        {
          "area": "Basani",
          "pincode": 221204
        },
        {
          "area": "Basant Nagar",
          "pincode": 221110
        },
        {
          "area": "Basantpur",
          "pincode": 221405
        },
        {
          "area": "Bathauli",
          "pincode": 221101
        },
        {
          "area": "Bazardiha",
          "pincode": 221109
        },
        {
          "area": "Bela",
          "pincode": 221101
        },
        {
          "area": "Belpco",
          "pincode": 221010
        },
        {
          "area": "Belwan",
          "pincode": 221206
        },
        {
          "area": "Bengalitola",
          "pincode": 221001
        },
        {
          "area": "Benipur Kundariya",
          "pincode": 221307
        },
        {
          "area": "Bhagwanpur",
          "pincode": 221005
        },
        {
          "area": "Bhelupura",
          "pincode": 221010
        },
        {
          "area": "Bhikhampur",
          "pincode": 221403
        },
        {
          "area": "Bhitkuri",
          "pincode": 221403
        },
        {
          "area": "Bhonda",
          "pincode": 221201
        },
        {
          "area": "Bhopapur",
          "pincode": 221202
        },
        {
          "area": "Bhulanpur Pac",
          "pincode": 221108
        },
        {
          "area": "Birapatti",
          "pincode": 221105
        },
        {
          "area": "Birbhanpur",
          "pincode": 221311
        },
        {
          "area": "Chamaon",
          "pincode": 221003
        },
        {
          "area": "Chandrawati",
          "pincode": 221116
        },
        {
          "area": "Chaubepurkhurd",
          "pincode": 221101
        },
        {
          "area": "Chaubeypur",
          "pincode": 221104
        },
        {
          "area": "Chaukhamba",
          "pincode": 221001
        },
        {
          "area": "Chetganj",
          "pincode": 221001
        },
        {
          "area": "Chhitauni",
          "pincode": 221104
        },
        {
          "area": "Chirai Gaon",
          "pincode": 221001
        },
        {
          "area": "Chiurapur",
          "pincode": 221204
        },
        {
          "area": "Cholapur",
          "pincode": 221101
        },
        {
          "area": "Christ Nagar",
          "pincode": 221003
        },
        {
          "area": "Clark Hotel",
          "pincode": 221002
        },
        {
          "area": "D.L.w.",
          "pincode": 221004
        },
        {
          "area": "Dabethuwa",
          "pincode": 221207
        },
        {
          "area": "Dafi",
          "pincode": 221011
        },
        {
          "area": "Daipur",
          "pincode": 221405
        },
        {
          "area": "Danganj Bazar",
          "pincode": 221101
        },
        {
          "area": "Danupur",
          "pincode": 221201
        },
        {
          "area": "Daranagar",
          "pincode": 221001
        },
        {
          "area": "Dasaswmedh",
          "pincode": 221001
        },
        {
          "area": "Deochandpur",
          "pincode": 221204
        },
        {
          "area": "Dhandhorpur",
          "pincode": 221305
        },
        {
          "area": "Dhaurahra",
          "pincode": 221001
        },
        {
          "area": "Domaila",
          "pincode": 221307
        },
        {
          "area": "Drmo",
          "pincode": 221002
        },
        {
          "area": "Durgakund",
          "pincode": 221005
        },
        {
          "area": "Dwarikapur",
          "pincode": 221314
        },
        {
          "area": "Gaighat",
          "pincode": 221001
        },
        {
          "area": "Gangapur",
          "pincode": 221302
        },
        {
          "area": "Garhwasi Tola",
          "pincode": 221001
        },
        {
          "area": "Garkhara",
          "pincode": 221208
        },
        {
          "area": "Garthama",
          "pincode": 221208
        },
        {
          "area": "Gdk",
          "pincode": 221010
        },
        {
          "area": "Ghamahapur",
          "pincode": 221105
        },
        {
          "area": "Gobraha",
          "pincode": 221104
        },
        {
          "area": "Gorai",
          "pincode": 221307
        },
        {
          "area": "Gosaipurmohawn",
          "pincode": 221101
        },
        {
          "area": "H.P.s.",
          "pincode": 221010
        },
        {
          "area": "Hanuman Phathak",
          "pincode": 221001
        },
        {
          "area": "Hanumanghat",
          "pincode": 221001
        },
        {
          "area": "Harhua",
          "pincode": 221105
        },
        {
          "area": "Hariadih",
          "pincode": 221104
        },
        {
          "area": "Hariharpur",
          "pincode": 221405
        },
        {
          "area": "Harshosh",
          "pincode": 221302
        },
        {
          "area": "Hasanpur Biraon",
          "pincode": 221201
        },
        {
          "area": "Hathi Bazar",
          "pincode": 221405
        },
        {
          "area": "Hathiyarkalan",
          "pincode": 221101
        },
        {
          "area": "Hindu Vishwa vidhyalaya",
          "pincode": 221005
        },
        {
          "area": "Hiramanpur",
          "pincode": 221208
        },
        {
          "area": "Hyderabad Colony",
          "pincode": 221005
        },
        {
          "area": "Industrial Estate",
          "pincode": 221106
        },
        {
          "area": "Iswargangi",
          "pincode": 221001
        },
        {
          "area": "Jagatpur",
          "pincode": 221313
        },
        {
          "area": "Jagdishpur",
          "pincode": 221202
        },
        {
          "area": "Jaitpura",
          "pincode": 221001
        },
        {
          "area": "Jakhini",
          "pincode": 221305
        },
        {
          "area": "Jalhupur",
          "pincode": 221104
        },
        {
          "area": "Jansa Bazar",
          "pincode": 221405
        },
        {
          "area": "Jawahar Nagar",
          "pincode": 221002
        },
        {
          "area": "Jhanjhaur",
          "pincode": 221206
        },
        {
          "area": "Kabirchaura",
          "pincode": 221001
        },
        {
          "area": "Kaithauli",
          "pincode": 221006
        },
        {
          "area": "Kaithaur",
          "pincode": 221101
        },
        {
          "area": "Kaithi",
          "pincode": 221116
        },
        {
          "area": "Kajisarai",
          "pincode": 221105
        },
        {
          "area": "Kalikabara",
          "pincode": 221403
        },
        {
          "area": "Kamachha",
          "pincode": 221010
        },
        {
          "area": "Kamauli",
          "pincode": 221007
        },
        {
          "area": "Kanakpur",
          "pincode": 221206
        },
        {
          "area": "Kandawa",
          "pincode": 221106
        },
        {
          "area": "Kaniyar",
          "pincode": 221204
        },
        {
          "area": "Kapsethi",
          "pincode": 221403
        },
        {
          "area": "Kardhana",
          "pincode": 221307
        },
        {
          "area": "Karkhiaon",
          "pincode": 221206
        },
        {
          "area": "Kashi Vidhya pith",
          "pincode": 221002
        },
        {
          "area": "Kashi Viswnath mandir",
          "pincode": 221001
        },
        {
          "area": "Kashipur",
          "pincode": 221311
        },
        {
          "area": "Kasi Rs",
          "pincode": 221001
        },
        {
          "area": "Kateshar",
          "pincode": 221008
        },
        {
          "area": "Kathiraon",
          "pincode": 221207
        },
        {
          "area": "Katuna",
          "pincode": 221208
        },
        {
          "area": "Kedarghat",
          "pincode": 221001
        },
        {
          "area": "Khajuri",
          "pincode": 221002
        },
        {
          "area": "Khalispur",
          "pincode": 221206
        },
        {
          "area": "Khataura",
          "pincode": 221204
        },
        {
          "area": "Khetalpur",
          "pincode": 221104
        },
        {
          "area": "Khewali",
          "pincode": 221405
        },
        {
          "area": "Khochawan",
          "pincode": 221307
        },
        {
          "area": "Khojwa Bazar",
          "pincode": 221010
        },
        {
          "area": "Kohashi",
          "pincode": 221101
        },
        {
          "area": "Konia",
          "pincode": 221007
        },
        {
          "area": "Koruta Bazar",
          "pincode": 221107
        },
        {
          "area": "Kotwa Koraut",
          "pincode": 221105
        },
        {
          "area": "Kuar",
          "pincode": 221204
        },
        {
          "area": "Kundi",
          "pincode": 221204
        },
        {
          "area": "Kurahuwan",
          "pincode": 221011
        },
        {
          "area": "Kuru",
          "pincode": 221201
        },
        {
          "area": "Kusthashram",
          "pincode": 221001
        },
        {
          "area": "Lahartara",
          "pincode": 221002
        },
        {
          "area": "Lakhanpur",
          "pincode": 221101
        },
        {
          "area": "Lamahi",
          "pincode": 221007
        },
        {
          "area": "Lanka",
          "pincode": 221005
        },
        {
          "area": "Laskarpur",
          "pincode": 221101
        },
        {
          "area": "Lohta",
          "pincode": 221107
        },
        {
          "area": "Luthakalan",
          "pincode": 221104
        },
        {
          "area": "Luxa",
          "pincode": 221010
        },
        {
          "area": "Madanpura",
          "pincode": 221001
        },
        {
          "area": "Madhumakhiya",
          "pincode": 221201
        },
        {
          "area": "Mahamandal",
          "pincode": 221001
        },
        {
          "area": "Mahgaon",
          "pincode": 221311
        },
        {
          "area": "Mahmoorganj",
          "pincode": 221010
        },
        {
          "area": "Malviya Nagar",
          "pincode": 221005
        },
        {
          "area": "Manduadih",
          "pincode": 221103
        },
        {
          "area": "Mangari",
          "pincode": 221202
        },
        {
          "area": "Mankaiya",
          "pincode": 221307
        },
        {
          "area": "Marui",
          "pincode": 221305
        },
        {
          "area": "Mata Kund",
          "pincode": 221010
        },
        {
          "area": "Mehandiganj",
          "pincode": 221311
        },
        {
          "area": "Mirzamurad",
          "pincode": 221307
        },
        {
          "area": "Moonari",
          "pincode": 221104
        },
        {
          "area": "Murdaha Bazar",
          "pincode": 221202
        },
        {
          "area": "Mustafabad",
          "pincode": 221104
        },
        {
          "area": "Nagar Maha palika",
          "pincode": 221010
        },
        {
          "area": "Nahiyan",
          "pincode": 221202
        },
        {
          "area": "Naipurakhurd",
          "pincode": 221011
        },
        {
          "area": "Narainpur",
          "pincode": 221104
        },
        {
          "area": "Naya Chowk",
          "pincode": 221001
        },
        {
          "area": "Nayepur Chaumuhani",
          "pincode": 221207
        },
        {
          "area": "Niyar",
          "pincode": 221101
        },
        {
          "area": "Odar",
          "pincode": 221202
        },
        {
          "area": "Pachraon",
          "pincode": 221104
        },
        {
          "area": "Pahariya Mandi",
          "pincode": 221007
        },
        {
          "area": "Palahipatti",
          "pincode": 221208
        },
        {
          "area": "Paniyara",
          "pincode": 221305
        },
        {
          "area": "Parsara",
          "pincode": 221206
        },
        {
          "area": "Phulawaria",
          "pincode": 221106
        },
        {
          "area": "Phulpur",
          "pincode": 221505
        },
        {
          "area": "Pindarai",
          "pincode": 221206
        },
        {
          "area": "Pindra",
          "pincode": 221206
        },
        {
          "area": "Pisaur",
          "pincode": 221003
        },
        {
          "area": "Pisnaharia",
          "pincode": 221002
        },
        {
          "area": "Piyari",
          "pincode": 221104
        },
        {
          "area": "Puarikalan",
          "pincode": 221202
        },
        {
          "area": "Pure Raghunathpur",
          "pincode": 221006
        },
        {
          "area": "Raghupur",
          "pincode": 221403
        },
        {
          "area": "Raisipur",
          "pincode": 221405
        },
        {
          "area": "Rajapur",
          "pincode": 221101
        },
        {
          "area": "Rajatalab",
          "pincode": 221311
        },
        {
          "area": "Rajpur",
          "pincode": 221202
        },
        {
          "area": "Rajwari",
          "pincode": 221116
        },
        {
          "area": "Ram Nagar pac",
          "pincode": 221008
        },
        {
          "area": "Ramaipatti",
          "pincode": 221202
        },
        {
          "area": "Ramapur Hathiwar",
          "pincode": 221204
        },
        {
          "area": "Ramapura",
          "pincode": 221001
        },
        {
          "area": "Ramchandipur",
          "pincode": 221104
        },
        {
          "area": "Ramdih",
          "pincode": 221403
        },
        {
          "area": "Rameswar",
          "pincode": 221405
        },
        {
          "area": "Ramna",
          "pincode": 221011
        },
        {
          "area": "Ramnagar",
          "pincode": 221008
        },
        {
          "area": "Rani Bhawani katra",
          "pincode": 221001
        },
        {
          "area": "Rasoolgarh",
          "pincode": 221007
        },
        {
          "area": "Rasoolpur",
          "pincode": 221204
        },
        {
          "area": "Rohana",
          "pincode": 221108
        },
        {
          "area": "Rupchandpur",
          "pincode": 221208
        },
        {
          "area": "S.V.v.",
          "pincode": 221002
        },
        {
          "area": "Sajoi",
          "pincode": 221302
        },
        {
          "area": "Sakalpur",
          "pincode": 221403
        },
        {
          "area": "Saraimohana",
          "pincode": 221007
        },
        {
          "area": "Saraiya No.-1",
          "pincode": 221101
        },
        {
          "area": "Sarauni",
          "pincode": 221302
        },
        {
          "area": "Sarnath",
          "pincode": 221007
        },
        {
          "area": "Sarsawan",
          "pincode": 221003
        },
        {
          "area": "Sarva Seva sangh",
          "pincode": 221001
        },
        {
          "area": "Sathwa",
          "pincode": 221007
        },
        {
          "area": "Seergoverdhan",
          "pincode": 221011
        },
        {
          "area": "Sehamalpur",
          "pincode": 221208
        },
        {
          "area": "Sewapuri",
          "pincode": 221403
        },
        {
          "area": "Shahanshahpur",
          "pincode": 221305
        },
        {
          "area": "Shivala",
          "pincode": 221001
        },
        {
          "area": "Shivdasa",
          "pincode": 221104
        },
        {
          "area": "Shivrampur",
          "pincode": 221202
        },
        {
          "area": "Sigra",
          "pincode": 221010
        },
        {
          "area": "Sikhari Barki",
          "pincode": 221403
        },
        {
          "area": "Sindhora",
          "pincode": 221208
        },
        {
          "area": "Singhpur",
          "pincode": 221101
        },
        {
          "area": "Sisawan",
          "pincode": 221201
        },
        {
          "area": "Srikanthpur",
          "pincode": 221116
        },
        {
          "area": "Sultanipur",
          "pincode": 221101
        },
        {
          "area": "Sultanpur",
          "pincode": 221007
        },
        {
          "area": "Sunderpur",
          "pincode": 221005
        },
        {
          "area": "Surahi",
          "pincode": 221206
        },
        {
          "area": "Susuwahi",
          "pincode": 221011
        },
        {
          "area": "Tapowanashram",
          "pincode": 221007
        },
        {
          "area": "Tari",
          "pincode": 221207
        },
        {
          "area": "Tekuri",
          "pincode": 221116
        },
        {
          "area": "Telibagh",
          "pincode": 221002
        },
        {
          "area": "Tewar",
          "pincode": 221101
        },
        {
          "area": "Thaney Rampur",
          "pincode": 221207
        },
        {
          "area": "Thathara",
          "pincode": 221307
        },
        {
          "area": "Tikari",
          "pincode": 221011
        },
        {
          "area": "Tiwaripur",
          "pincode": 221104
        },
        {
          "area": "U.P. collage",
          "pincode": 221002
        },
        {
          "area": "Udaipur",
          "pincode": 221101
        },
        {
          "area": "Ukathi",
          "pincode": 221104
        },
        {
          "area": "Umrahan",
          "pincode": 221007
        },
        {
          "area": "Varanasi",
          "pincode": 221001
        },
        {
          "area": "Varanasi Cantt",
          "pincode": 221002
        },
        {
          "area": "Varanasi City",
          "pincode": 221001
        },
        {
          "area": "Vijay Sirohi nagar",
          "pincode": 221001
        },
        {
          "area": "Vsi Kutchhery",
          "pincode": 221002
        },
        {
          "area": "Vsi Shivpur",
          "pincode": 221003
        },
        {
          "area": "West Colony",
          "pincode": 221004
        }
      ]
    }
    // areaJson.areadata.forEach((line:any,index:any)=>{
    //   let data={
    //     "pincode_id":0,
    //     "pincode":line.pincode,
    //     "country_id":1,
    //     "state_id":45,
    //     "city_id":29,
    //     "area":line.area,
    //      "language_id":1
    //    }
    //   //console.log(data)
    //    let url='Manage_Pincode/save_pincode/';
    //    this.allapi.PostData(url,data).subscribe(promise=>
    //      {
    //        if(promise.status=="Insert")
    //        {
    //         console.log('success', line.area)

    //         }
    //        else if(promise.status=="Failed")
    //        {
    //          console.log('failed', line.area)
    //        }


    //      })
    // })
  }
  savedata()
{
  this.submitted = true;
  if(this.form.value.v_area.trim() ==''){
    this.form.controls['v_area'].setErrors({'required': true})
  }
    if (this.form.invalid) {
      return;
    }

  var data={
   "pincode_id":this.pincode_id,
   "pincode":parseInt(this.pincode),
   "country_id":parseInt(this.countryid),
   "state_id":parseInt(this.stateid),
   "city_id":parseInt(this.city_id),
   "area":this.area.trim(),
    "language_id":1
  }
  let url='Manage_Pincode/save_pincode/';
  this.allapi.PostData(url,data).subscribe(promise=>
    {
      if(promise.status=="Insert")
      {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000
      })
      this.add_status=true;
      this.country_list=JSON.parse(promise.country_list).Table;
      this.all_pincode_list=JSON.parse(promise.all_pincode_list).Table;
      this.closeform.hide();
     this.Clear();
    }
      else if(promise.status=="Failed")
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000
      })
      }
      else if(promise.status=="Validation")
      {
        this.validation_list=promise.validation_list;
      }

    })
}
edit_data(ss:any)
{
  this.add_status=false;
  this.pincode_id=ss.pincode_id;
  this.pincode=ss.pincode;
 this.countryid=ss.country_id;
 this.stateid=ss.state_id;
  this.get_state(this.countryid);
  this.city_id=ss.city_id;
 this.get_city(this.stateid);
 this.area=ss.area;
 this.closeform.show();
}

delete_data(ss:any) {

  Swal.fire({
      title: 'Are you sure?',
      text: "Do You want Delete This!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {

        var data={
          "pincode_id":ss.pincode_id
        }
        let url='Manage_Pincode/delete_pincode/';
        this.allapi.PostData(url,data).subscribe(promise=>
          {
            if(promise.status="Insert")
            {
              this.country_list=JSON.parse(promise.country_list).Table;
              this.all_pincode_list=JSON.parse(promise.all_pincode_list).Table;

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: promise.message,
                showConfirmButton: false,
                timer: 3000
            })
          }
            else if(promise.status="Failed")
            {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: promise.message,
                showConfirmButton: false,
                timer: 3000
            })
            }

          })

      }
  })
}
    //validation
    get f(){
      return this.form.controls;
    }
    onTableDataChange(event: any) {
      this.page = event;
      this.ngOnInit();
    }

    public openModal(){
      this.add_status=true;
      this.submitted=false;
      this.countryid="";
      this.stateid="";
      this.city_id="";
      this.pincode="";
      this.area="";
      this.pincode_id=0;
    this.closeform.show();
  }
}
