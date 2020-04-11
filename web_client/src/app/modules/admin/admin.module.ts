import {NgModule} from '@angular/core';

import {AdminGuard} from './admin-guard.service';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin.routing';
import {ManagingComponent} from './managing/managing.component';
import {WritingComponent} from './writing/writing.component';
import {SharedModule} from '@shared/shared.module';
import {WritingService} from './writing/writing.service';
import {ManagingService} from './managing/managing.service';
import {AdminDashboardService} from "./admin-dashboard/admin-dashboard.service";
import { SettingsComponent } from './settings/settings.component';
import { PasswordComponent } from './settings/password/password.component';
import { CategoriesManagingComponent } from './settings/categories-managing/categories-managing.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AboutManagingComponent } from './about-managing/about-managing.component';
import { PublicFilesComponent } from './public-files/public-files.component';
import {PublicFilesService} from "./public-files/public-files.service";
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import {SomethingService} from "../something/something.service";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManagingComponent,
    WritingComponent,
    SettingsComponent,
    PasswordComponent,
    CategoriesManagingComponent,
    AboutManagingComponent,
    PublicFilesComponent,
    MarkdownEditorComponent,
  ],
  entryComponents: [],
  providers: [
    AdminGuard,
    WritingService,
    ManagingService,
    AdminDashboardService,
    PublicFilesService,
    SomethingService,
    WritingService
  ],
})
export class AdminModule {
}
