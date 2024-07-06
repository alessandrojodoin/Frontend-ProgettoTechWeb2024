import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

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
    }
];
