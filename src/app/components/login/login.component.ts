import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : any = {
    email : null,
    password : null
  }

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService : AuthService, private tokenStorage : TokenStorageService, 
   private router : Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.data.accessToken);
        this.tokenStorage.saveUser(data.data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    //this.router.navigate(['home']);
    window.location.href = "/home";
  }

}
