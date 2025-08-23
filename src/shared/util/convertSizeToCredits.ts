import { convertBytesToMb } from 'shared/util/convertBytesToMb';

export const convertSizeToCredits = (size: number, creditsUsagePerMb: number) => {
  return Math.ceil(convertBytesToMb(size)) * creditsUsagePerMb;
};