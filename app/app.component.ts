import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PageService } from './page/page.service'
import { TemplatesService } from './page/templates.service'
import * as io from 'socket.io-client';

@Component({
  selector: 'my-app',
  moduleId: module.id,
  directives: [],
  styleUrls: ['../css/app.component.css'],
  providers: [PageService, TemplatesService, ToastsManager],
  template: `
    <nav *ngIf="!prodMode" class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <span class="navbar-brand"> Shmix | </span>
        <ul class="nav navbar-nav">
          <li><a routerLink="/">Login</a></li>
          <li><a routerLink="/pages">Pages List</a></li>
          <li><a routerLink="/template">Add new page</a></li>
        </ul>
      </div>
    </nav>

    <section>
      <router-outlet>
        
      </router-outlet>
    </section>

`,
  // encapsulation: ViewEncapsulation.None,
  // {provide: 'io', useValue: io}
})
export class AppComponent implements OnInit{
  
  constructor(
    public toastr: ToastsManager,
    private route: ActivatedRoute,
    private router: Router,
    @Inject('ProdMode') private prodMode
  ) { }
                 
   ngOnInit() { } 
}