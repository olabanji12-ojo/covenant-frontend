import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketProvider } from './context/WebSocketContext';
import { fetchCurrentUser } from './store/authSlice';
import type { AppDispatch, RootState } from './store';
import { usePushNotifications } from './hooks/usePushNotifications';
import { SideNavBar } from './components/navigation/SideNavBar';

// Auth Screens
import { WelcomeScreen } from './pages/auth/WelcomeScreen';
import { LoginScreen } from './pages/auth/LoginScreen';
import { SignUpOptions } from './pages/auth/SignUpOptions';
import { CreateAccountForm } from './pages/auth/CreateAccountForm';
import { CreatePasswordScreen } from './pages/auth/CreatePasswordScreen';
import { VerifyAccountScreen } from './pages/auth/VerifyAccountScreen';
import { FaithProfileScreen } from './pages/auth/FaithProfileScreen';
import { CovenantAssessmentScreen } from './pages/auth/CovenantAssessmentScreen';
import { IntentionsScreen } from './pages/auth/IntentionsScreen';
import { AddPhotosScreen } from './pages/auth/AddPhotosScreen';
import { ReviewInfoScreen } from './pages/auth/ReviewInfoScreen';
import { SuccessScreen } from './pages/auth/SuccessScreen';

// Main Screens
import { DiscoverScreen } from './pages/main/DiscoverScreen';
import { MatchesScreen } from './pages/main/MatchesScreen';
import { MatchSuccessScreen } from './pages/main/MatchSuccessScreen';
import { MessagesScreen } from './pages/main/MessagesScreen';
import { ActiveChatScreen } from './pages/main/ActiveChatScreen';
import { PrayerScreen } from './pages/main/PrayerScreen';
import { ShareScriptureScreen } from './pages/main/ShareScriptureScreen';
import { ProfileScreen } from './pages/main/ProfileScreen';
import { UserProfileDetailScreen } from './pages/main/UserProfileDetailScreen';
import { FiltersScreen } from './pages/main/FiltersScreen';
import { EditProfileScreen } from './pages/main/EditProfileScreen';
import { PrivacySafetyScreen } from './pages/main/PrivacySafetyScreen';
import { ProtectedRoute } from './components/navigation/ProtectedRoute';
import { GuestRoute } from './components/navigation/GuestRoute';
import { PWAInstallBanner } from './components/ui/PWAInstallBanner';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Initialize push notifications when user logs in
  usePushNotifications();

  useEffect(() => {
    // If the user has a token but their profile data hasn't been loaded into Redux yet,
    // fetch it now! This fixes issues where the page is refreshed and we lose the user object.
    if (isAuthenticated && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <WebSocketProvider>
      <BrowserRouter>
        {/* Desktop Wrapper: Centers the mobile view and adds a subtle shadow on large screens */}
        <div className="min-h-screen bg-gray-100 flex justify-center w-full">
          <div className="w-full max-w-sm md:max-w-full md:w-full bg-[#f7f5f0] min-h-screen relative shadow-2xl sm:border-x border-gray-200 flex flex-col md:flex-row overflow-x-hidden">
            
            {/* Show SideNav only on desktop AND only when logged in */}
            {isAuthenticated && <SideNavBar />}

            {/* Main Content Area */}
            <div className="flex-1 w-full flex flex-col relative items-center overflow-y-auto custom-scrollbar">
              <div className="w-full flex-1 relative flex flex-col">
                <Routes>
              {/* Auth Flow - Restricted for Logged In Users */}
              <Route path="/" element={<GuestRoute><WelcomeScreen /></GuestRoute>} />
              <Route path="/login" element={<GuestRoute><LoginScreen /></GuestRoute>} />
              <Route path="/signup" element={<GuestRoute><SignUpOptions /></GuestRoute>} />
              
              {/* Other Auth Setup Steps */}
              <Route path="/create-account" element={<CreateAccountForm />} />
              <Route path="/create-password" element={<CreatePasswordScreen />} />
              <Route path="/verify" element={<VerifyAccountScreen />} />
              <Route path="/faith-profile" element={<FaithProfileScreen />} />
              <Route path="/covenant-assessment" element={<CovenantAssessmentScreen />} />
              <Route path="/intentions" element={<IntentionsScreen />} />
              <Route path="/add-photos" element={<AddPhotosScreen />} />
              <Route path="/review-info" element={<ReviewInfoScreen />} />
              <Route path="/success" element={<SuccessScreen />} />

              {/* Main App Flow - PROTECTED */}
              <Route path="/app/discover" element={<ProtectedRoute><DiscoverScreen /></ProtectedRoute>} />
              <Route path="/app/matches" element={<ProtectedRoute><MatchesScreen /></ProtectedRoute>} />
              <Route path="/app/match-success" element={<ProtectedRoute><MatchSuccessScreen /></ProtectedRoute>} />
              <Route path="/app/chat" element={<ProtectedRoute><MessagesScreen /></ProtectedRoute>} />
              <Route path="/app/chat/:matchId" element={<ProtectedRoute><ActiveChatScreen /></ProtectedRoute>} />
              <Route path="/app/share-scripture" element={<ProtectedRoute><ShareScriptureScreen /></ProtectedRoute>} />
              <Route path="/app/prayers" element={<ProtectedRoute><PrayerScreen /></ProtectedRoute>} />
              <Route path="/app/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
              <Route path="/app/profile-detail" element={<ProtectedRoute><UserProfileDetailScreen /></ProtectedRoute>} />
              <Route path="/app/edit-profile" element={<ProtectedRoute><EditProfileScreen /></ProtectedRoute>} />
              <Route path="/app/privacy-safety" element={<ProtectedRoute><PrivacySafetyScreen /></ProtectedRoute>} />
              <Route path="/app/filters" element={<ProtectedRoute><FiltersScreen /></ProtectedRoute>} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </div>

            {/* Global Modals / Banners */}
            <PWAInstallBanner />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </WebSocketProvider>
  );
};

export default App;
