import  { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UrlRoutes } from '../modules/Url/url.route';




const router = Router();

const moduleRoutes = [
  
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path :'/url',
    route:UrlRoutes
  }
  

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;