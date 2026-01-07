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
    { $inc: { clicks: 1 } },
    { new: true },
  );

  if (!url) {
    res.status(404).json({
      success: false,
      message: 'Short URL not found',
    });
  } else {
    res.redirect(url.originalUrl);
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
