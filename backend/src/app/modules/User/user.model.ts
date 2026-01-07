import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, UserModel } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    fullName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    
  },
  {
    timestamps: true,
  },
);

// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// 🔐 Remove password from returned doc
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// ✅ Static methods
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isUserBlocked = async function (
  userEmail: string,
): Promise<TUser | null> {
  return await this.findOne({ email: userEmail, isBlocked: true });
};

userSchema.statics.isUserExistByEmail = async function (email: string) {
  return this.findOne({ email }).select('+password');
};

export const User = model<TUser, UserModel>('User', userSchema);
