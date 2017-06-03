// Imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, UrlSerializer } from '@angular/router';

import { LowerCaseUrlSerializer } from './lower-case-url-serializer';

// Imports plugins
import { TypeaheadModule } from 'ng2-bootstrap';
import { PositioningService } from 'ng2-bootstrap';
import { ComponentLoaderFactory } from 'ng2-bootstrap/component-loader';
import { SelectModule } from 'ng2-select';
import { TreeModule } from 'angular-tree-component';

// Imports components
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { FormulationComponent } from './formulation/formulation.component';
import { FormulatorComponent } from './formulator/formulator.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OwnFeedstuffEditComponent } from './own-feedstuff-edit/own-feedstuff-edit.component';
import { OwnFeedstuffsComponent } from './own-feedstuffs/own-feedstuffs.component';
import { TermsComponent } from './terms/terms.component';
import { TipsComponent } from './tips/tips.component';

// Services
import { FeedstuffService } from './services/feedstuff.service';
import { FormulaService } from './services/formula.service';
import { FormulatorService } from './services/formulator.service';
import { MainService } from './services/main.service';

const router = RouterModule.forRoot([
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: AboutComponent,
    path: 'about',
  },
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: FormulatorComponent,
    path: 'formulator',
  },
  {
    component: FormulationComponent,
    path: 'formulation',
  },
  {
    component: TipsComponent,
    path: 'tips',
  },
  {
    component: TermsComponent,
    path: 'terms',
  },
  {
    component: OwnFeedstuffsComponent,
    path: 'ownfeedstuffs',
  },
  {
    component: OwnFeedstuffEditComponent,
    path: 'ownfeedstuffedit',
  },
]);

@NgModule({
  bootstrap: [AppComponent, NavbarComponent],
  declarations: [
    AppComponent,
    FormulatorComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    NavbarComponent,
    FormulationComponent,
    TipsComponent,
    TermsComponent,
    FooterComponent,
    OwnFeedstuffsComponent,
    OwnFeedstuffEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    router,
    SelectModule,
    TypeaheadModule,
    TreeModule
  ],
  providers: [
    MainService,
    FeedstuffService,
    FormulaService,
    FormulatorService,
    ComponentLoaderFactory,
    PositioningService,
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer,
    },
  ],
})
export class AppModule { }
