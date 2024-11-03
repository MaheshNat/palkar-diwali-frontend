import { AxiosResponse } from 'axios';
import { backendInstance } from './axios';
import { camelToSnake, snakeToCamel } from './utils';
import { QRScanResult, ScanningState } from './types';

export type UserSettings = {
  enableLogging: boolean;
  enableEmails: boolean;
};

export const getSettings = async (): Promise<UserSettings> => {
  const response: AxiosResponse = await backendInstance.get(
    `/user/settings/`,
    {}
  );
  return snakeToCamel(response.data);
};

export const updateSettings = async ({
  enableLogging,
  enableEmails,
}: UserSettings): Promise<{ success: boolean }> => {
  const response: AxiosResponse = await backendInstance.patch(
    `/user/settings/`,
    camelToSnake({
      enableLogging,
      enableEmails,
    })
  );
  return snakeToCamel(response.data);
};

export const decodeQR = async (data: string): Promise<QRScanResult> => {
  const response: AxiosResponse = await backendInstance.post(`/api/decode_qr`, {
    data,
  });
  return snakeToCamel(response.data);
};
