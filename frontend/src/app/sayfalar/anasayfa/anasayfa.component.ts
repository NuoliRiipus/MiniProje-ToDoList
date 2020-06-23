import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AnaService } from 'src/app/ana.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Liste } from '../../liste'


@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.scss']
})
export class AnasayfaComponent implements OnInit {
  yapilacaklar: any[];
  listeler: any[];
  datayap: any[];
  girdi: string;
  ats: "bak bak"
  COL: boolean = false;
  COY: boolean = false;
  constructor(private servis: AnaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Sayfaya listeleri çekmek için.
    this.servis.listeleriGetir().subscribe((listeler: any[]) => {
      this.listeler = listeler;
    })
    // Sayfaya yapılacakları çekmek için
    this.route.params.subscribe((params: Params) => {
      this.servis.yapilacaklariGetir(params.listeid).subscribe((yapilacaklar: any[]) => {
        this.yapilacaklar = yapilacaklar;
        this.datayap = [...yapilacaklar];
      })
    })
  }

  // Sürükledikten sonra son durumu database e aktarmak için 
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.yapilacaklar, event.previousIndex, event.currentIndex);
    for (let [dataindex, data] of this.datayap.entries()) {
      for (let [yapindex, yap] of this.yapilacaklar.entries()) {
        if (dataindex === yapindex) {
          this.servis.yapilacaklariGuncelle(data._listeId, data._id, yap.icerik).subscribe(p => {
            console.log("calisti");
          });
        }
      }
    }
  }

  // Liste eklenecek modalları açmak & kapamak için
  openModal(id) {
    if (id == "Liste") {
      this.COL = true;
    } else if (id == "Yap") {
      this.COY = true;
    }
  }
  closeModal() {
    this.girdi = null;
    this.COL = false;
    this.COY = false;
  }

  listeEkle() {
    this.servis.listeEkle(this.girdi).subscribe((p: Liste) => {
      location.reload();
    });

  }

  yapilacakEkle() {
    this.route.params.subscribe((params: Params) => {
      this.servis.yapilacakEkle(params.listeid, this.girdi).subscribe(a => {
        console.log('Yapılacak eklendi')
        location.reload();
      })
    })
  }

  yapilacakSil(id) {
    this.route.params.subscribe((params: Params) => {
      this.servis.yapilacakSil(params.listeid, id).subscribe(s => {
        console.log('yapılacak silindi')
        location.reload();
      })
    })
  }

  listeSil(id) {
    this.route.params.subscribe((params: Params) => {

      for (let [yapindex, yap] of this.yapilacaklar.entries()) {
        this.servis.yapilacakSil(params.listeid, yap._id).subscribe(d => {
          console.log('İçerisi silindi')
        })
      }

      

      this.servis.listeSil(params.listeid).subscribe(a => {
        console.log('Liste Silindi')
      })

      setTimeout(_ => { location.reload() }, 100);
    })

    
  }

}
