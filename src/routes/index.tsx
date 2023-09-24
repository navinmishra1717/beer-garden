import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from '../components/Loadable';

// sample page routing
const BeerListPage = Loadable(lazy(() => import('../views/BeersPage')));

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <BeerListPage />
        }
    ]);
}
