import { SetMetadata } from '@nestjs/common';
import { CookieOptions } from 'express';

export const CLEAR_COOKIE_METADATA = 'CLEAR_COOKIE_METADATA ';

export const ClearSessionToken = (name: string, options: CookieOptions) =>
  SetMetadata(CLEAR_COOKIE_METADATA, { name, options });
