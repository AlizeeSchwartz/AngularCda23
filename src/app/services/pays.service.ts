import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pays } from '../models/pays';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  constructor(private http: HttpClient) { }

  public getPays(): Observable<pays[]> {
    return this.http.get<pays[]>(environment.serverUrl +"/list-pays");
  }
}
