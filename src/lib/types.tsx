export type QRScanResult = {
  status: 'success' | 'error';
  name?: string;
  message?: string;
  checkedIn?: boolean;
  additionalInfo?: {
    adults: number;
    kids: number;
    babies: number;
    city?: string;
  };
};

export type ScanningState =
  | 'idle'
  | 'scanning'
  | 'processing'
  | 'success'
  | 'error';
