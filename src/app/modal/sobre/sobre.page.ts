import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  id: any;
  loader: any;

  constructor(
    private auth: AuthService,
    private crud: CrudService,
    private alert: AlertController,
    private loading: LoadingController,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.pickID();    
  }

  async pickID(){
    this.id = '';
    await this.showLoading('Carregando. Aguarde...');
    try {
      await this.auth.getUser().subscribe(user => {
        this.id = user?.uid;
      });
    } catch (error) {
      this.showToast(error);
    } finally {
      this.loader.dismiss();
    }
  }

  async exitAndDelete(){
    const alerta = await this.alert.create({
      header: 'ATENÇÃO!',
      message: 'Se você sair do sistema o seu nome será removido da lista! Deseja mesmo continuar?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
           this.shutdown();
          }
        }
      ]
    });
    return alerta.present();
  }

  async shutdown(){
    await this.showLoading('Saindo. Aguarde...')
    try {
      await this.auth.getUser().subscribe(user => {
        this.crud.delete(user?.uid);
      });
    } catch (error) {
      this.showToast(error);              
    } finally {
      this.auth.logOut();
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

}
