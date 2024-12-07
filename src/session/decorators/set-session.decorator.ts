import { SetMetadata } from '@nestjs/common';
import { CookieOptions } from 'express';

export const SET_COOKIE_METADATA = 'SET_COOKIE_METADATA ';

export const SetSessionToken = (name: string, options: CookieOptions) =>
  SetMetadata(SET_COOKIE_METADATA, { name, options });
