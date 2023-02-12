import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(
    private afs: AngularFirestore
  ) { }

  add(player: any){
    return this.afs.collection('Torneio').add(player);
  }

  update(id: any, player: any){
    return this.afs.doc('Torneio/' + id).update(player);
  }

  remove(id: any){
    return this.afs.collection('Torneio/').doc(id).delete();
  }

  get(){
    return this.afs.collection('Torneio').snapshotChanges();
  }

  getPlayer(id: any){
    return this.afs.collection('Torneio').doc(id).valueChanges();
  }

  updateStatsMaintance(value: any){
    return this.afs.doc('Stats' + '/' + 'statsMaintance').update(value);
  }

  updateStatsType(value: any){
    return this.afs.doc('Stats' + '/' + 'statsType').update(value);    
  }

  getStatsType(){
    return this.afs.collection('Stats').doc('statsType').valueChanges();
  }

  getStatsMaintance(){
    return this.afs.collection('Stats').doc('statsMaintance').valueChanges();
  }



}
