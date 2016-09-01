import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';
import { Router, RouterLink, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { PageService } from '../page/page.service'
// import { contentHeaders } from '../common/headers';

@Component({
    moduleId: module.id,
    selector: 'login',
    directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    providers: [ROUTER_PROVIDERS],
    // styleUrls: ['../css/login/login.component.css'],
    template: `
         <div class="login jumbotron center-block">
            <h1>Login</h1>
            <form role="form" (submit)="login($event, username.value, password.value)">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" #username class="form-control" id="username" placeholder="Username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" #password class="form-control" id="password" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
                <!--<a href="/signup">Click here to Signup</a>-->
            </form>
            </div>`,
    outputs: ['userConnected'],

})
export class LoginComponent implements OnInit {

  private userConnected = new EventEmitter()

  constructor(
      private router: Router, 
      private http: Http,
      private pageService: PageService
  ) {}
      
  ngOnInit(){}
  
  login(event, username, password) {
    event.preventDefault();
   
    this.http.post('http://localhost:3003/login', { username: username, pass: password })
      .subscribe(
        res => {
          console.log(res.json());
          this.pageService.state.userId = res.json();
          
        },
        error => {
          // alert(error.text());
          console.log(error.text());
        }
      )
  }

  // signup(event) {
  //   event.preventDefault();
  // }
}