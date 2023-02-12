import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loader: any;

  constructor(
    private afa: AngularFireAuth
  ) { }

  signIn() {
    this.afa.signInAnonymously();
  }

  logOut() {
    this.afa.signOut();
  }

  getUser() {
    return this.afa.user;
  }

  getAuth() {
    return this.afa.authState;
  }

}
