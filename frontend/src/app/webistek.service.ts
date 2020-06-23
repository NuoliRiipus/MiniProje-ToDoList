import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WebistekService {

  readonly kokadres;

  constructor(private http: HttpClient) {
    this.kokadres = 'http://localhost:3000'
  }
  
  // API den istekler
  getir(ekadres: string) {
    return this.http.get(`${this.kokadres}/${ekadres}`);
  }

  guncelle(ekadres: string, govde: Object) {
    return this.http.put(`${this.kokadres}/${ekadres}`, govde);
  }

  ekle(ekadres: string, govde: Object) {
    return this.http.post(`${this.kokadres}/${ekadres}`, govde);
  }

  sil(ekadres: string) {
    return this.http.delete(`${this.kokadres}/${ekadres}`);
  }
}
