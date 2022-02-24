import * as React from 'react';
import { Login } from './containers/auth/Login';
import { Register } from './containers/auth/Register';
import { Home } from './containers/Home';

export interface RouterItem {
    path: string;
    Component: React.FunctionComponent;
}

export type RouterPathName = 'authLogin' | 'authRegister' | 'home';

export const routerComponents: Record<RouterPathName, React.FunctionComponent> = {
    authLogin: Login,
    authRegister: Register,
    home: Home,
};
