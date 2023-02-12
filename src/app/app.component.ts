import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  show !: boolean;

  constructor(
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe(user => {
      if (user) {
        this.show = true;
      } else {
        this.show = false;
      }
    })
  }

}
