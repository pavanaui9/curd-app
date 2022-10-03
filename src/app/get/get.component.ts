import { Component, OnInit } from '@angular/core';
import { SourceService } from '../source.service';
import Source from '../Source';

@Component({
	selector: 'app-get',
	templateUrl: './get.component.html',
	styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
	Sources: Source[];
	response : any = {};
	responseDelete : any = {};
	constructor(private us: SourceService) { }

	ngOnInit() {
		this.getSources();
	}

	getSources() {
		this.us.getSource().subscribe((res) => {
			this.response = res;
			if (this.response.status == 'success'){
				this.Sources = this.response.Sources;
			} else {
			}
		});
	}

	deleteSource(id) {
		this.us.deleteSource(id).subscribe(res => {
			this.responseDelete = res;
			if (this.responseDelete.status == 'success'){
				this.us.alert('Source deleted successfully!','success');
				this.getSources();
			} else {
				this.us.alert('Error deleting Source!','error');
			}
		});
	}
}
