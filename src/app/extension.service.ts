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
    const isGithubPages = window.location.hostname === 'designassembly.github.io';
    const path = isGithubPages ? '/fem-browser-extension-app/assets/data.json' : '/data.json';
    return this.http.get<Extension[]>(path);
  }
}
