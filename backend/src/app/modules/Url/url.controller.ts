import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UrlServices } from './url.service';
import { HttpStatus } from 'http-status-ts';
import { Url } from './url.model';

const createShortUrl = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id; 
  const result = await UrlServices.createShortUrlIntoDB(userId, req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Short URL created successfully',
    data: {
      shortCode: result.shortCode,
      shortUrl: `${process.env.BACKEND_URL}/${result.shortCode}`,
    },
  });
});


const getMyUrls = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const result = await UrlServices.getMyUrlsFromDB(userId);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'URLs fetched successfully',
    data: result,
  });
});


const redirectShortUrl = catchAsync(async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  const url = await Url.findOneAndUpdate(
    { shortCode },
    { $inc: { clickCount: 1 } }, 
    { new: true }
  );

  if (!url) {
 
    res.status(404).send(`
      <div style="font-family: system-ui; text-align: center; padding: 4rem; background: #f9f9f9; min-height: 100vh;">
        <h1 style="font-size: 3rem; color: #4c1d95;">Oops!</h1>
        <p style="font-size: 1.2rem; color: #666;">This short link doesn't exist or has expired.</p>
        <a href="/" style="color: #7c3aed; text-decoration: underline;">Go back home</a>
      </div>
    `);
    return;
  }


  let destination = url.originalUrl;

  if (!/^https?:\/\//i.test(destination)) {
    destination = 'http://' + destination;
  }

  res.redirect(301, destination);
});



const deleteUrl = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user._id;

  await UrlServices.deleteUrlFromDB(id, userId);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'URL deleted successfully',
    data: null,
  });
});

export const UrlControllers = {
  createShortUrl,
  getMyUrls,
  redirectShortUrl,
  deleteUrl,
};
