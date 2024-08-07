import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SubmitComponent } from './submit/submit.component';
import { LogoutComponent } from './logout/logout.component';
import { IdeaPageComponent } from './idea-page/idea-page.component';
import { SubmitCommentComponent } from './submit-comment/submit-comment.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {
        path: "feed",
        title: "Hivemind",
        component: FeedComponent,
        canActivate: [authGuard]
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
        component: SubmitComponent,
        canActivate: [authGuard]
    },
    {
        path: "logout",
        title: "Logout",
        component: LogoutComponent,
        canActivate: [authGuard]
    },
    {
        path: "idea/:id",
        title: "Idea",
        component: IdeaPageComponent,
        canActivate: [authGuard]
    },
    {
        path: "error",
        title: "Error",
        component: ErrorPageComponent
    },

];
