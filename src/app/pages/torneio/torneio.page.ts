import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Player } from 'src/app/interfaces/player';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-torneio',
  templateUrl: './torneio.page.html',
  styleUrls: ['./torneio.page.scss'],
})
export class TorneioPage implements OnInit {

  public silverColor: string = 'silver-badge';

  list: any;
  qnt: number = 0;

  stats: any;
  type: any;

  loader: any

  constructor(
    private tnt: TournamentService,
    private firestore: AngularFirestore,
    private loading: LoadingController,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.stats = '';
    this.type = '';
    this.list = [];
    this.loadContent();
  } 

  async loadContent(){
    await this.showLoading('Carregando Placar...')
    try {
      await this.tnt.getStatsMaintance().subscribe(data => {
        this.stats = data;
      });
      this.tnt.getStatsType().subscribe(data => {
        this.type = data;
      });
      this.list = [];
      await this.firestore.collection('Torneio', ref => ref.orderBy('score', 'desc')).snapshotChanges().subscribe(data => {
        this.list= data.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data() as Player
          }
        });
        this.qnt = this.list.length - 1;
      });
    } catch (error){
      return this.showToast(error);
    } finally {
      this.loader.dismiss();
    }
  }

  async showLoading(msg: any){
    this.loader = await this.loading.create({
      message: msg
    });
    await this.loader.present();
  }

  async showToast(msg: any){
    const toast = await this.toast.create({
      message: msg,
      duration: 2500
    });
    await toast.present();
  }

}
