import { PLATFORM_DIRECTIVES } from '@angular/core';
import { RouterConfig, ROUTER_DIRECTIVES, provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { PagesListComponent } from './page/pages-list.component';
import { TemplatesListComponent } from './page/templates-list.component';
import { LoginComponent } from './login/login.component'
import { TemplatePreview } from './page/template-preview.component'

const routes: RouterConfig = [
  { path: '',               component: LoginComponent },
  { path: 'page/:mode',     component: PageComponent  },
  { path: 'page/:mode/:id', component: PageComponent  },
  { path: 'pages',          component: PagesListComponent },
  { path: 'template',       component: TemplatesListComponent },
  { path: 'production/templates/:id',  component: TemplatePreview }
];

export const ROUTER_PROVIDERS = [
  provideRouter(routes),
  {provide: PLATFORM_DIRECTIVES, useValue: ROUTER_DIRECTIVES, multi: true}
];
