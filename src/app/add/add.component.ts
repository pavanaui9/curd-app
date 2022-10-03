import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SourceService } from '../source.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  response : any = {};
  angForm : FormGroup;
  constructor(private fb : FormBuilder, private us: SourceService) { 
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      ipaddress: ['', Validators.required ],
      domain: ['', Validators.required ],
      username: ['', Validators.required ],
      password: ['', Validators.required ],
      confirmpassword: ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  addSource() {
    this.us.addSource(this.angForm.value).subscribe(res => {
      this.response = res;
      if (this.response.status == 'success'){
        this.us.alert('Source added successfully!','success');
        this.angForm.reset();
      } else {
        this.us.alert('Error saving Source!','error');
      }
    })
  }
}
