import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MentorComponent } from './components/mentor/mentor.component';
import { AboutComponent } from './components/about/about.component';
import { LearningPathComponent } from './components/learning-path/learning-path.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mentor', component: MentorComponent },
  { path: 'about', component: AboutComponent },
  { path: 'learningPath', component: LearningPathComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
