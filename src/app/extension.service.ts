import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Extension } from './extension.model';
@Injectable({
  providedIn: 'root'
})
export class ExtensionService {

  constructor(private http: HttpClient) { }

  getExtensions(): Observable<Extension[]> {
    return this.http.get<Extension[]>('/data.json');
  }
}
