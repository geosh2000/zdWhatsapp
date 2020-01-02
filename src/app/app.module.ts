import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { NgxFloatButtonModule } from 'ngx-float-button';

//Services
import { TokenCheckService, ApiService, InitService, GlobalServicesService } from './services/service.index';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ToastrModule } from 'ngx-toastr';
import { OrderModule } from 'ngx-order-pipe';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { KeysPipe } from './pipes/keys.pipe';
import { CapitalizadoPipe } from './pipes/capitalizado.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { NoAcentosPipe } from './pipes/no-acentos.pipe';
import { UploadImageComponent } from './shared/upload/upload-image/upload-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZdWhatsappWindowComponent } from './zd-whatsapp-window/zd-whatsapp-window.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { ExtranetListComponent } from './components/extranet/extranet-list/extranet-list.component';
import { CotizaAutoComponent } from './components/cotizador/cotiza-auto/cotiza-auto.component';

@NgModule({
  declarations: [
    AppComponent,
    ConversationsComponent,
    ChatWindowComponent,

    // Pipes
    KeysPipe,
    CapitalizadoPipe,
    DomseguroPipe,
    NoAcentosPipe,
    UploadImageComponent,
    ZdWhatsappWindowComponent,
    ExtranetListComponent,
    CotizaAutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    OrderModule,
    FormsModule,
    ReactiveFormsModule,

    // ==================================================
    // START ANGULAR MATERIAL
    // ==================================================
    MatButtonModule, MatCheckboxModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    // ==================================================
    // END ANGULAR MATERIAL
    // ==================================================

    NgxAudioPlayerModule,
    NgxFloatButtonModule,
    NgxPageScrollCoreModule
  ],
  providers: [
    TokenCheckService,
    ApiService,
    InitService,
    GlobalServicesService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
