import { useRef, useState, useEffect } from 'react';
import jsQR from 'jsqr';
import { useMutation } from '@tanstack/react-query';
import { decodeQR } from '@/lib/queries';
import { QRScanResult, ScanningState } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  IconCheck,
  IconAlertTriangle,
  IconLoader2,
  IconScan,
  IconX,
  IconExclamationCircle,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

// Constants
const SCAN_COOLDOWN = 500; // ms between scan attempts
const MAX_ATTEMPTS = 3;
const ATTEMPT_WINDOW = 60000; // 1 minute
const SUCCESS_DISPLAY_TIME = 10_000; // 10 seconds to show success state
const FAILURE_DISPLAY_TIME = 5_000; // 1 minute to show error state

const QRScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanningState, setScanningState] = useState<ScanningState>('idle');

  // for debouncing repeated errored attempts
  const [scanAttempts, setScanAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState(0);

  // for processing new QR codes
  const [lastScannedData, setLastScannedData] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<QRScanResult | null>(null);

  // for displaying success/error states
  const successTimeoutRef = useRef<NodeJS.Timeout>();
  const scanIntervalRef = useRef<NodeJS.Timeout>();
  const [isClient, setIsClient] = useState(false); // to avoid hydration errors, render video only after client
  const [cameraPermission, setCameraPermission] = useState<
    'granted' | 'denied' | 'pending'
  >('pending');

  const qrMutation = useMutation({
    mutationFn: decodeQR,
    onSuccess: (data) => {
      setScanResult(data);
      if (data.status === 'success') {
        setScanningState('success');
        setScanAttempts(0);

        // Reset only the success display state after timeout
        successTimeoutRef.current = setTimeout(() => {
          setScanningState('scanning');
          setScanResult(null);
        }, SUCCESS_DISPLAY_TIME);

        // Always resume scanning immediately
        startScanning('success');
      } else {
        setScanningState('error');
      }
    },
    onError: () => {
      setScanningState('error');
      setScanResult({
        status: 'error',
        message: 'Failed to process QR code',
      });

      setTimeout(() => {
        startScanning('error');
      }, FAILURE_DISPLAY_TIME);
    },
  });

  useEffect(() => {
    initializeCamera();
    setIsClient(true);
    return () => {
      clearTimeout(successTimeoutRef.current);
      clearInterval(scanIntervalRef.current);
    };
  }, []);

  const initializeCamera = async () => {
    try {
      setScanningState('idle');
      setCameraPermission('pending');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');

        // Wait for video to be ready
        await new Promise((resolve) => {
          if (!videoRef.current) return;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().then(() => {
              setCameraPermission('granted');
              resolve(null);
            });
          };
        });

        // Always start scanning immediately
        startScanning();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCameraPermission('denied');
      setScanningState('error');
      setScanResult({
        status: 'error',
        message: 'Failed to access camera',
      });
    }
  };

  const startScanning = (newScanningState?: ScanningState) => {
    const currentTime = Date.now();
    if (currentTime - lastAttemptTime > ATTEMPT_WINDOW) {
      setScanAttempts(0);
    }

    if (scanAttempts >= MAX_ATTEMPTS) {
      setScanningState('error');
      setScanResult({
        status: 'error',
        message: 'Too many attempts. Please wait a minute.',
      });
      return;
    }

    if ((newScanningState || scanningState) !== 'success')
      setScanningState('scanning');

    setScanAttempts((prev) => prev + 1);
    setLastAttemptTime(currentTime);

    scanIntervalRef.current = setInterval(scanQRCode, SCAN_COOLDOWN);
  };

  const processQRCode = (code: string) => {
    // Early return if the QR code data is the same as last time
    if (code === lastScannedData) return;

    // Clear scanning interval before processing new code
    clearInterval(scanIntervalRef.current);
    clearTimeout(successTimeoutRef.current);

    setLastScannedData(code);
    setScanningState('processing');
    qrMutation.mutate(code);
  };

  const scanQRCode = () => {
    if (!videoRef.current || !videoRef.current.videoWidth) return;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });

    if (code) {
      processQRCode(code.data);
    }
  };

  const renderStatusBar = () => {
    const getStatusContent = () => {
      switch (scanningState) {
        case 'scanning':
          return {
            text: 'Looking for QR code...',
            icon: <IconLoader2 className='w-5 h-5 animate-spin' />,
          };
        case 'processing':
          return {
            text: 'Retrieving information...',
            icon: <IconLoader2 className='w-5 h-5 animate-spin' />,
          };
        case 'success':
          return {
            text: scanResult?.checkedIn
              ? 'Already checked in'
              : 'Check-in successful',
            icon: scanResult?.checkedIn ? (
              <IconExclamationCircle className='w-5 h-5' />
            ) : (
              <IconCheck className='w-5 h-5' />
            ),
          };
        case 'error':
          return {
            text: scanResult?.message || 'Error scanning QR code',
            icon:
              scanResult?.message ===
              'Too many attempts. Please wait a minute.' ? (
                <IconAlertTriangle className='w-5 h-5' />
              ) : (
                <IconX className='w-5 h-5' />
              ),
          };
        default:
          return {
            text: 'Ready to scan',
            icon: <IconScan className='w-5 h-5' />,
          };
      }
    };

    const content = getStatusContent();

    return (
      <div
        className={cn(
          'absolute top-0 left-0 right-0 p-4 font-medium shadow-lg transition-colors duration-300',
          scanningState === 'success' &&
            !scanResult?.checkedIn &&
            'bg-green-200 text-green-900',
          scanningState === 'success' &&
            scanResult?.checkedIn &&
            'bg-orange-200 text-orange-900',
          scanningState === 'error' && 'bg-red-200 text-red-900',
          scanningState === 'scanning' && 'bg-blue-200 text-blue-900',
          scanningState === 'processing' && 'bg-yellow-200 text-yellow-900',
          scanningState === 'idle' && 'bg-gray-200 text-gray-900'
        )}
      >
        <div className='container flex flex-col items-center justify-center gap-1'>
          <div className='flex items-center gap-2'>
            {content.icon}
            <span className='text-lg'>{content.text}</span>
          </div>
          {scanResult && scanningState === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex flex-col items-center gap-1 mt-1'
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className='text-xl font-bold'
              >
                {scanResult.name}
              </motion.span>
              {scanResult.additionalInfo && (
                <motion.div
                  className='flex flex-wrap justify-center gap-2'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {scanResult.additionalInfo.adults > 0 && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className='px-3 py-1 text-sm bg-white/40 rounded-full'
                    >
                      {scanResult.additionalInfo.adults}{' '}
                      {scanResult.additionalInfo.adults === 1
                        ? 'Adult'
                        : 'Adults'}
                    </motion.span>
                  )}
                  {scanResult.additionalInfo.kids > 0 && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className='px-3 py-1 text-sm bg-white/40 rounded-full'
                    >
                      {scanResult.additionalInfo.kids}{' '}
                      {scanResult.additionalInfo.kids === 1 ? 'Kid' : 'Kids'}
                    </motion.span>
                  )}
                  {scanResult.additionalInfo.babies > 0 && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className='px-3 py-1 text-sm bg-white/40 rounded-full'
                    >
                      {scanResult.additionalInfo.babies}{' '}
                      {scanResult.additionalInfo.babies === 1
                        ? 'Baby'
                        : 'Babies'}
                    </motion.span>
                  )}
                  {scanResult.additionalInfo.city && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className='px-3 py-1 text-sm bg-white/40 rounded-full'
                    >
                      From: {scanResult.additionalInfo.city}
                    </motion.span>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='relative h-screen'>
      {cameraPermission === 'denied' ? (
        <div className='flex flex-col items-center justify-center h-full bg-gray-900 text-white p-4 text-center'>
          <IconExclamationCircle className='w-16 h-16 mb-4 text-red-500' />
          <h1 className='text-2xl font-bold mb-2'>Camera Access Required</h1>
          <p className='mb-4'>
            Please grant camera access to continue using the diwali QR code
            scanner.
          </p>
          <button
            onClick={initializeCamera}
            className='px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors'
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {isClient && (
            <video
              ref={videoRef}
              className='w-full h-full object-cover'
              playsInline
            />
          )}
          {renderStatusBar()}
        </>
      )}
    </div>
  );
};

export default QRScanner;
