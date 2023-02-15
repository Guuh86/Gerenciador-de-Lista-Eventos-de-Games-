import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Jogador } from 'src/app/interfaces/jogador';
import { SobrePage } from 'src/app/modal/sobre/sobre.page';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  name !: string;
  cor: any;
  loader: any;
  list: any;
  show !: boolean;
  uid: any;
  total: number = 0;
  closed: any;

  colors = [
    'primary',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'danger',
    'light',
    'medium',
    'dark'
  ]

  constructor(
    private crud: CrudService,
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController,
    private firestore: AngularFirestore,
    private modal: ModalController,
    private tnt: TournamentService
  ) { }

  async ngOnInit() {
    await this.showLoading('Carregando. Aguarde...');

    await this.tnt.getClosed().subscribe(data => {
      this.closed = data;
    });

    await this.auth.getUser().subscribe(user => {
      this.uid = user?.uid
    });

    try {
      this.list = [];
      this.firestore.collection('Jogadores', ref => ref.orderBy('timestamp', 'asc')).snapshotChanges().subscribe(data => {
        this.list = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Jogador
          };
        });
        this.total = this.list.length;
      });
      await this.auth.getUser().subscribe(user => {
        if (user) {
          return
        } else {
          this.router.navigate(['/home']);
        }
      });

      await this.auth.getUser().subscribe(user => {
        const ref = this.firestore.collection('Jogadores').doc(user?.uid);
        ref.valueChanges().subscribe(data => {
          if (data) {
            this.show = true;
          } else {
            this.show = false;
          }
        });
      });      
    } catch (error) {
      this.showToast(error);
    } finally {
      this.loader.dismiss();
    }
  }

  async addOnList() {
    await this.showLoading('Entrando na pista de dança...');
    const color = this.colors[Math.floor(Math.random() * this.colors.length)]
    try {
      await this.auth.getUser().subscribe(user => {
        this.crud.create(
          user?.uid,
          {
            uid: user?.uid,
            nome: this.name,
            cor: color,
            timestamp: new Date().getTime()
          })
        this.name = '';
      });
    } catch (error) {
      this.showToast(error);
    } finally {
      this.loader.dismiss();
    }
  }

  async showLoading(msg: string) {
    this.loader = await this.loading.create({
      message: msg
    });
    return this.loader.present();
  }

  async showToast(msg: any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2500
    });
    return toast.present();
  }

  async openModal() {
    const modal = await this.modal.create({
      component: SobrePage,
      componentProps: {
        id: this.uid
      }
    });
    return modal.present();
  }

}
