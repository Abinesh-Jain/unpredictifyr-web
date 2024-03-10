import { Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

export const routes: Routes = [
    {
        path: '',
        component: ChatPageComponent
    },
    {
        path: 'test',
        component: TestPageComponent
    },
    {
        path: '**',
        component: ChatPageComponent
    },
];
