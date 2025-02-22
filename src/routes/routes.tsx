import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LogInForm from '../components/logInForm/LogInForm.tsx';
import RegisterForm from '../components/registerForm/RegisterForm.tsx';
import FeedPage from '../pages/feedPage/FeedPage.tsx';
import AnalyticsPage from '../pages/analyticsPage/AnalyticsPage.tsx';
import PostDetail from '../pages/postDetail/PostDetail.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/login',
                element: <LogInForm />,
            },
            {
                path: '/register',
                element: <RegisterForm />,
            },
            {
                path: '/feed',
                element: <FeedPage />,
            },
            {
                path: '/analytics',
                element: <AnalyticsPage />,
            },
            {
                path: '/post/:id',
                element: <PostDetail />,
            },
        ],
    },
]);

export default router;
