import { Model, Types } from 'mongoose';

// Create Short URL
export type TCreateShortUrl = {
  originalUrl: string;
};


export type TUrl = {
  user: Types.ObjectId;
  originalUrl: string;
  shortCode: string;
  clickCount: number;
};


export interface UrlModel extends Model<TUrl> {
  // eslint-disable-next-line no-unused-vars
  isShortCodeExist(shortCode: string): Promise<TUrl | null>;
}

