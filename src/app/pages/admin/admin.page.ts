import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Jogador } from 'src/app/interfaces/jogador';
import { Player } from 'src/app/interfaces/player';
import { PlayerPage } from 'src/app/modal/player/player.page';
import { CrudService } from 'src/app/services/crud.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  list: any;
  loader: any;
  total: number = 0;
  value: any;

  type: any;
  maintance: any;
  closed: any;

  statsM: any
  typeT: any;

  name !: string;
  score !: number;

  tournamentList: any;

  constructor(
    private crud: CrudService,
    private firestore: AngularFirestore,
    private toast: ToastController,
    private loading: LoadingController,
    private tnt: TournamentService,
    private modal: ModalController
  ) { }

  async ngOnInit() {
    this.value = 'list';
    this.list = [];
    this.name = '';
    this.score = 0;
    await this.showLoading('Carregando...');
    try {
      await this.firestore.collection('Jogadores', ref => ref.orderBy('timestamp', 'asc')).snapshotChanges().subscribe(data => {
        this.list = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Jogador
          };
        });
        this.total = this.list.length;
      });
      this.type = '';
      await this.tnt.getStatsType().subscribe(data => {
        this.type = data;
        console.log(this.type);
      });
      this.statsM = '';
      await this.tnt.getStatsMaintance().subscribe(data => {
        this.statsM = data;
        console.log(this.statsM);
      });
      this.closed = false;
      await this.tnt.getClosed().subscribe(data => {
        this.closed = data;
        console.log(this.closed);
      })
      this.getTable();
    } catch (error) {
      this.showToast(error);
    } finally {
      this.loader.dismiss();
    }
  }

  closeList(event: any){
    const a = event.detail.checked;
    if (a == true){
      this.tnt.updateClosed({value: true});
    } else {
      this.tnt.updateClosed({value: false});
    }
  }

  getTable() {
    this.tournamentList = [];
    this.firestore.collection('Torneio', ref => ref.orderBy('score', 'desc')).snapshotChanges().subscribe(data => {
      this.tournamentList = data.map(a => {
        return {
          id: a.payload.doc.id,
          ...a.payload.doc.data() as Player
        }
      })
    })
  }

  updateEtapa() {
    this.tnt.updateStatsType(
      {
        value: this.typeT
      }
    )
  }

  updateStats() {
    this.tnt.updateStatsMaintance(
      {
        value: this.maintance
      }
    )
  }

  addPlayer() {
    this.tnt.add(
      {
        nome: this.name,
        score: this.score
      }
    )
    this.name = '';
  }

  changeList() {
    this.value = 'list';
  }

  changeTournament() {
    this.value = 'tournament'
  }

  deleteUser(uid: any) {
    this.crud.delete(uid);
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

  async openModal(uid: any) {
    const modal = await this.modal.create({
      component: PlayerPage,
      cssClass: 'player-modal',
      componentProps: {
        id: uid
      }
    });
    console.log(uid)
    await modal.present();
    modal.onDidDismiss().then(data => {
      this.getTable();
    })
  }

}
