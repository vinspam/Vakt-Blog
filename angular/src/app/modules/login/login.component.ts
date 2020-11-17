import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '@app-services/login.service';
import {Component, OnInit} from '@angular/core';

import {UserInfoModel} from '@shared/models';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  info = new UserInfoModel();

  constructor(
    private matSnackBar: MatSnackBar,
    private _loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    // If logged, go to the admin page
    this._loginService.userSubject.subscribe((user: UserInfoModel) => {
      if (user) this.router.navigateByUrl(this._loginService.redirectUrl).then()
    });
  }

  // For submit log information. Default url for this._loginService.redirectUrl is './admin'
  onSubmit() {
    this._loginService.login(this.info).subscribe((res: UserInfoModel) => {
      this.router.navigateByUrl(this._loginService.redirectUrl).then(() => {
        this.matSnackBar.open('Hello there! ' + res.username, 'Close',{duration: 5_000});
      });
    });
  }
}