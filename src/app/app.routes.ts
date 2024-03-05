import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AddComponent } from './pages/add/add.component';
import { VoteComponent } from './pages/vote/vote.component';
import { LoginComponent } from './pages/login/login.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { MyrankComponent } from './pages/myrank/myrank.component';
import { ToptenComponent } from './pages/topten/topten.component';
import { OweComponent } from './pages/owe/owe.component';
import { OweprofileComponent } from './pages/oweprofile/oweprofile.component';
import { OwerankComponent } from './pages/owerank/owerank.component';

export const routes: Routes = [
    {path: '', component : MainComponent},
    {path: 'vote', component: VoteComponent},
    {path: 'login', component : LoginComponent},
    {path: 'edit', component : EditprofileComponent},
    {path: 'rank', component : MyrankComponent},
    {path: 'topten', component : ToptenComponent},
    {path: 'add', component : AddComponent},  
    {path: 'owe', component : OweComponent},
    {path: 'oweprofile', component : OweprofileComponent},
    {path: 'owerank', component : OwerankComponent}
]