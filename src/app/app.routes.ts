import { Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { VideoPageComponent } from './pages/video-page/video-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { MapPageComponent } from './pages/map-page/map-page.component';

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
        path: 'game',
        component: GamePageComponent
    },
    {
        path: 'auth',
        component: AuthPageComponent
    },
    {
        path: 'friends',
        component: FriendsPageComponent
    },
    {
        path: 'map',
        component: MapPageComponent
    },
    {
        path: '**',
        component: LoginPageComponent
    },
];
