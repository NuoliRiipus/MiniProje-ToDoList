import { Injectable } from '@angular/core';
import { WebistekService } from './webistek.service';

@Injectable({
  providedIn: 'root'
})
export class AnaService {

  constructor(private api: WebistekService) { }

  // Componentlerde kullanılacak metodlar (webistek servisini kullanıyorlar)
  listeleriGetir() {
    return this.api.getir('listeler');
  }

  listeEkle(govde: string) {
    return this.api.ekle('listeler', { baslik: govde})
  }

  listeSil(listeid: string) {
    return this.api.sil(`${listeid}`)
  }

  yapilacaklariGetir(listeid: string) {
    return this.api.getir(`${listeid}/yapilacaklar`)
  }

  yapilacakEkle(listeid: string, govde: string) {
    return this.api.ekle(`${listeid}/yapilacaklar`, { icerik: govde })
  }

  yapilacaklariGuncelle(listeId: string,yapilacakId: string, govde: string ) {
    return this.api.guncelle(`${listeId}/${yapilacakId}`, { icerik: govde })
  }

  yapilacakSil(listeId: string,yapilacakId: string) {
    return this.api.sil(`${listeId}/${yapilacakId}`)
  }
}
