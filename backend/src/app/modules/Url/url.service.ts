import { Url } from './url.model';
import { TCreateShortUrl } from './url.interface';
import { generateShortCode } from '../../utils/generateShortCode';
import AppError from '../../Errors/AppError';

const createShortUrlIntoDB = async (
  userId: string,
  payload: TCreateShortUrl,
) => {
  // Free limit check (100)
  const totalUrls = await Url.countDocuments({ user: userId });
  if (totalUrls >= 100) {
   throw new AppError(400, 'FREE_LIMIT_REACHED');
  }

  let shortCode: string = '';
  let isExist = true;

  //  Double check short code
  while (isExist) {
    shortCode = generateShortCode(6);
    const exists = await Url.isShortCodeExist(shortCode);
    if (!exists) isExist = false;
  }

  const result = await Url.create({
    user: userId,
    originalUrl: payload.originalUrl,
    shortCode,
  });

  return result;
};

// Get user URLs
const getMyUrlsFromDB = async (userId: string) => {
  return Url.find({ user: userId }).sort({ createdAt: -1 });
};

// 🔁 Redirect + analytics
const redirectAndTrack = async (shortCode: string) => {
  const url = await Url.findOne({ shortCode });
  if (!url) return null;

  url.clickCount += 1;
  await url.save();

  return url.originalUrl;
};

// Delete URL
const deleteUrlFromDB = async (id: string, userId: string) => {
  return Url.findOneAndDelete({ _id: id, user: userId });
};

export const UrlServices = {
  createShortUrlIntoDB,
  getMyUrlsFromDB,
  redirectAndTrack,
  deleteUrlFromDB,
};
