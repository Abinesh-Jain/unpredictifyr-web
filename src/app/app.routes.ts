import { Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { chatGuardGuard } from './guards/chat-guard/chat-guard.guard';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { VideoPageComponent } from './pages/video-page/video-page.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent
    },
    {
        path: 'chat',
        component: ChatPageComponent,
    },
    {
        path: 'test',
        component: TestPageComponent
    },
    {
        path: 'settings',
        component: SettingsPageComponent
    },
    {
        path: 'video',
        component: VideoPageComponent
    },
    {
        path: '**',
        component: LoginPageComponent
    },
];
