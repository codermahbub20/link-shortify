import { Router } from 'express';
import { UrlControllers } from './url.controller';
import auth from '../../middlewares/auth';


const router = Router();

router.post('/shorten', auth(), UrlControllers.createShortUrl);
router.get('/my-urls', auth(), UrlControllers.getMyUrls);
router.delete('/:id', auth(), UrlControllers.deleteUrl);

// public
// router.get('/:shortCode', UrlControllers.redirectShortUrl);

export const UrlRoutes = router;
