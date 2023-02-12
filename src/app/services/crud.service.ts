import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Jogador } from '../interfaces/jogador';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private afs: AngularFirestore
  ) { }

  create(id: any, jogador: any) {
    return this.afs.collection('Jogadores').doc(id).set(jogador);
  }

  getOrder() {
    return this.afs.collection('Jogadores', ref => ref.orderBy('timestamp', 'asc'))
      .snapshotChanges()
      .subscribe(data => {
        data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Jogador
          };
        });
      });
  }

  delete(id: any) {
    return this.afs.doc('Jogadores' + '/' + id).delete();
  }

}
