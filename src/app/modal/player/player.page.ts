import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss']
})
export class PlayerPage implements OnInit {

  data: any;
  uid !: string;

  name: string = '';
  score: number = 0;

  constructor(
    private modal: ModalController,
    private tnt: TournamentService,
    public nav: NavParams
  ) {
    this.uid = this.nav.get('id');
    console.log('id: ' + this.uid);
  }

  ngOnInit() {
    this.data = [];
    this.tnt.getPlayer(this.uid).subscribe(data => {
      this.data = data;
    })
  }

  closeModal() {
    this.modal.dismiss();
  }

  updatePlayer() {
    this.tnt.update(
      this.uid,
      {
        nome: this.name,
        score: this.score
      }
    ).then(res => {
      this.modal.dismiss();
    })
  }

  deletePlayer(){
    this.tnt.remove(this.uid).then(res => {
      this.modal.dismiss();
      this.ngOnInit();
    })
  }

}
