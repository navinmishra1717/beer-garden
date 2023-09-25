import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from '../components/Loadable';

// beers page routing
const BeersPage = Loadable(lazy(() => import('../views/Beers')));

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <BeersPage />
        }
    ]);
}
