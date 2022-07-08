import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, NgxEditorModule } from 'ngx-editor';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  editor: Editor = new Editor;
  html: '' = "";

  ngOnInit(): void {
    this.editor = new Editor();
  }

  
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  forms = new FormGroup({
  
    msg: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl(),

  });
  getFormData(){
    console.log(this.forms.value);
    alert(this.forms.value.msg);
    alert(this.encode(this.forms.value.msg));
  }

  encode(str:string){
    const observable = new Observable
  }
}
NgxEditorModule.forRoot({
  locals: {
    bold: 'Bold',
    italic: 'Italic',
    code: 'Code',
    underline: 'Underline',
    // ...
  },
});



