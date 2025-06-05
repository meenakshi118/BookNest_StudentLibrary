import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BookDetailPanelComponent } from './book-detail-panel/book-detail-panel.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentComponent } from './student-panel/student-panel.component';
import { BookAssignPanelComponent } from './book-assign-panel/book-assign-panel.component';
import { StudentListPanelComponent } from './student-list-panel/student-list-panel.component';
import { ReturnBookPanelComponent } from './return-book-panel/return-book-panel.component';
import { StudentHistoryComponent } from './student-history/student-history.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'login',component:LoginComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'student-panel', component: StudentComponent },
  {path: 'book-detail-panel',component:BookDetailPanelComponent},
  {path:'book-assign-panel/:id',component:BookAssignPanelComponent},
  {path:'student-list-panel',component:StudentListPanelComponent},
  {path:'return-book-panel',component:ReturnBookPanelComponent},
   { path: 'student-history/:id', component: StudentHistoryComponent }
]
