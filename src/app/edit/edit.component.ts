import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SourceService } from '../source.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	Source: any = {};
	angForm: FormGroup;
	response: any = {};
	constructor(private route: ActivatedRoute, 
		private fb: FormBuilder,
		private router: Router, 
		private us: SourceService) {
		this.angForm = this.fb.group({
			name: ['', Validators.required ],
			email: ['', Validators.required ],
			phone_number: ['', Validators.required ]
		});
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.us.editSource(params['id']).subscribe(res => {
				this.Source = res;
				this.Source = this.Source.Source;
			});
		});
	}

	updateSource() {
		this.route.params.subscribe(params => {
			this.us.updateSource(params['id'], this.angForm.value).subscribe(res => {
				this.response = res;
				if (this.response.status == 'success'){
					this.us.alert('Source updated successfully!','success');
					this.router.navigate(['Source']);
				} else {
					this.us.alert('Error updating Source!','error');
				}
			});
		});
	}
}
