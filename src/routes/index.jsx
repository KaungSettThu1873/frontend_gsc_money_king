import { createBrowserRouter } from "react-router-dom";
 import HomePage from "../pages/Home";
// import LoginPage from "../pages/Login";
// import RegisterPage from "../pages/Register";
import GamesPage from "../pages/Games";
import Promotion from "../pages/Promotion";
import RankingPage from "../pages/Ranking";
import ContactPage from "../pages/Contact";
import InformationPage from "../pages/Information";
import AboutPage from "../pages/About";
import DemoPlayPage from "../pages/DemoPlay";
import Layout from "../components/Layout";
import ReelsPage from "../pages/ReelsPage";
import AdsVideo from "../pages/AdsVideo";


export const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: '/reels',
          element: <ReelsPage />
        },
        {
          path: '/games',
          element: <GamesPage />
        },
        {
          path: '/demo-play',
          element: <DemoPlayPage />
        },
        {
          path: '/ranking',
          element: <RankingPage />
        },
        {
          path: '/promotion',
          element: <Promotion />
        },
        {
          path: '/contact',
          element: <ContactPage />
        },
        {
          path: '/information',
          element: <InformationPage />
        },
        {
          path: '/about',
          element: <AboutPage />
        },
        {
          path: '/ads-video',
          element: <AdsVideo />
        },
      ]
    },
    // {
    //   path: '/login',
    //   element: <LoginPage />
    // },
    // {
    //   path: '/register',
    //   element: <RegisterPage />
    // },
  ]);