import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  loader: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private loading: LoadingController,
    private toast: ToastController
  ) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe(user => {
      if (user){
        this.router.navigate(['/lista']);
      } else {
        this.router.navigate(['/home']);
      }
    })
  }

  async entrar(){
    await this.showLoading('Entrando na pista de dança! Aguarde...')
    try {
      await this.auth.signIn();
    } catch (error) {
      this.showToast(error)
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
