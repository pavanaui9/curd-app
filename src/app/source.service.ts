import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class SourceService {
	url = 'http://localhost:3000/source';

	constructor(private http: HttpClient) { }

	addSource(source) {
		return this.http.post(this.url+'/add', source);
	}

	getSource() {
		return this.http.get(this.url);
	}

	editSource(id) {
		return this.http.get(this.url+'/edit/'+id);
	}

	updateSource(id, Source) {
		return this.http.post(this.url+'/update/'+id, Source);
	}

	deleteSource(id) {
		return this.http.get(this.url+'/delete/'+id);
	}

	alert(mssg, status) {
		swal.fire(mssg, "", status);
	}
}
