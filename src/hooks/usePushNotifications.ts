import { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging, VAPID_KEY } from '../config/firebase';
import apiClient from '../api/client';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const usePushNotifications = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Only request push notifications if the user is logged in
    if (!user) return;

    const requestPermissionAndGetToken = async () => {
      try {
        console.log("Requesting Notification Permission...");
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          console.log("Permission granted! Fetching token...");
          
          // Wait for the PWA service worker to be ready before getting token
          const registration = await navigator.serviceWorker.ready;
          
          const token = await getToken(messaging, { 
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: registration
          });

          if (token) {
            console.log("FCM Token Generated:", token);
            // Send to backend
            await apiClient.post('/users/push-token', { token });
            console.log("Token securely saved to backend.");
          } else {
            console.log("No registration token available.");
          }
        } else {
          console.log("Notification permission denied.");
        }
      } catch (err) {
        console.error("An error occurred while retrieving token: ", err);
      }
    };

    requestPermissionAndGetToken();

    // Listen for FOREGROUND messages (when the app is actively open)
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received in foreground: ", payload);
      // We could use a toast notification library here to show it beautifully.
      // But for now, the chat screen itself will auto-update via WebSockets!
    });

    return () => unsubscribe();
  }, [user]);
};
