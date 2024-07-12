import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SubmitComponent } from './submit/submit.component';
import { LogoutComponent } from './logout/logout.component';
import { IdeaPageComponent } from './idea-page/idea-page.component';

export const routes: Routes = [
    {
        path: "feed",
        title: "Hivemind",
        component: FeedComponent
    },
    {
        path: "signup",
        title: "Sign Up",
        component: SignupComponent
    },
    {
        path: "",
        title: "Hivemind",
        component: HomeComponent
    },
    {
        path: "login",
        title: "Login",
        component: LoginComponent
    },
    {
        path: "submit",
        title: "Submit an idea",
        component: SubmitComponent
    },
    {
        path: "logout",
        title: "Logout",
        component: LogoutComponent
    },
    {
        path: "idea/:id",
        title: "Idea",
        component: IdeaPageComponent
    }
    
];
