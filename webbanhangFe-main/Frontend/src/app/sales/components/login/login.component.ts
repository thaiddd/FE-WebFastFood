import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // form: any = {
  //   username: null,
  //   password: null
  // };
  // returnUrl: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[]= []

  loginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private  authService: AuthService,
              private  tokenStorage: TokenStorageService,
              private  formBuilder:  FormBuilder,
              private  router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute
              // private location: Location
  ) {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void{
    // const previousUrl = this.location.getState()['url']
    // const returnUrl = this.router.url;
    const returnUrl = sessionStorage.getItem('returnUrl') || '/';
    // const returnUrll = this.returnUrl
    const loginRequest = this.loginForm.value
    this.authService.login(loginRequest).subscribe(
      (response) => {
        // this.tokenStorage.saveToken(response.accessToken)
          console.log(response)
          this.tokenStorage.saveToken(response.token)
          this.tokenStorage.saveUser(response)
          // this.router.navigate(['/'])
          this.toastr.success("Đăng nhập thành công")
          this.router.navigateByUrl(returnUrl);

      },
      (error) => {
          this.toastr.error('Sai thông tin tài khoản, mật khẩu', 'Đăng nhập không thành công!');
      }
    )
  }

  reloadPage(): void {
    window.location.reload();
  }

}
