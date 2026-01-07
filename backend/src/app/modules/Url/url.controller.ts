import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UrlServices } from './url.service';
import { HttpStatus } from 'http-status-ts';

const createShortUrl = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id; 
  const result = await UrlServices.createShortUrlIntoDB(userId, req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Short URL created successfully',
    data: {
      shortCode: result.shortCode,
      shortUrl: `${process.env.FRONTEND_URL}/${result.shortCode}`,
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
  const originalUrl = await UrlServices.redirectAndTrack(shortCode);

  if (!originalUrl) {
    res.status(HttpStatus.NOT_FOUND).send('URL not found');
  } else {
    res.redirect(originalUrl);
  }
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
