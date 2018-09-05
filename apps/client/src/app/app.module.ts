import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgSerializerModule } from '@kaiu/ng-serializer';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MarkdownModule } from 'ngx-markdown';
import { NgDragDropModule } from 'ng-drag-drop';
import { IS_ELECTRON } from './core/tools/platform.service';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { en_US, NgZorroAntdModule, NZ_I18N, NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from './pipes/pipes.module';
import { authReducer, initialState as authInitialState } from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';
import { XivapiClientModule } from '@xivapi/angular-client';
import { AuthModule } from './core/auth/auth.module';

registerLocaleData(en);

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    AuthFacade,
    {
      provide: NZ_MESSAGE_CONFIG,
      useValue: {
        nzDuration: 10000,
        nzMaxStack: 8,
        nzPauseOnHover: true,
        nzAnimate: true,
        nzTop: '92px',
        nzBottom: '24px',
        nzPlacement: 'topRight'
      }
    }
  ],
  imports: [
    FlexLayoutModule,

    MarkdownModule.forRoot(),

    NgDragDropModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    AngularFireModule.initializeApp(environment.firebase),

    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,

    XivapiClientModule.forRoot('63cc0045d7e847149c3f'),

    RouterModule.forRoot([], { useHash: IS_ELECTRON }),

    AppRoutingModule,
    AuthModule,

    HttpClientModule,

    BrowserAnimationsModule,

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    NgSerializerModule.forRoot(),

    AppRoutingModule,
    CoreModule,
    PipesModule,

    NgZorroAntdModule,

    StoreModule.forRoot({}, {}),
    !environment.production ? StoreDevtoolsModule.instrument({
      name: 'FFXIV Teamcraft'
    }) : [],
    EffectsModule.forRoot([]),
    StoreModule.forFeature('auth', authReducer, { initialState: authInitialState }),
    EffectsModule.forFeature([AuthEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
