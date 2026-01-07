import { model, Schema } from 'mongoose';
import { TUrl, UrlModel } from './url.interface';

const urlSchema = new Schema<TUrl, UrlModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
    },
    originalUrl: {
      type: String,
      required: [true, 'Original URL is required'],
      trim: true,
    },
    shortCode: {
      type: String,
      required: [true, 'Short code is required'],
      unique: true,
      index: true,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// ✅ Static: check short code exists
urlSchema.statics.isShortCodeExist = async function (shortCode: string) {
  return this.findOne({ shortCode });
};

export const Url = model<TUrl, UrlModel>('Url', urlSchema);
