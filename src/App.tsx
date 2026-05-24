import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketProvider } from './context/WebSocketContext';
import { fetchCurrentUser } from './store/authSlice';
import type { AppDispatch, RootState } from './store';

// Auth Screens
import { WelcomeScreen } from './pages/auth/WelcomeScreen';
import { LoginScreen } from './pages/auth/LoginScreen';
import { SignUpOptions } from './pages/auth/SignUpOptions';
import { CreateAccountForm } from './pages/auth/CreateAccountForm';
import { CreatePasswordScreen } from './pages/auth/CreatePasswordScreen';
import { VerifyAccountScreen } from './pages/auth/VerifyAccountScreen';
import { FaithProfileScreen } from './pages/auth/FaithProfileScreen';
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
import { ProtectedRoute } from './components/navigation/ProtectedRoute';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

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
        {/* We wrap everything in a root div so the background color is consistent */}
        <div className="min-h-screen bg-[#f7f5f0] flex flex-col w-full">
        <Routes>
          {/* Auth Flow */}
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpOptions />} />
          <Route path="/create-account" element={<CreateAccountForm />} />
          <Route path="/create-password" element={<CreatePasswordScreen />} />
          <Route path="/verify" element={<VerifyAccountScreen />} />
          <Route path="/faith-profile" element={<FaithProfileScreen />} />
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
          <Route path="/app/filters" element={<ProtectedRoute><FiltersScreen /></ProtectedRoute>} />
          
          {/* Fallback to welcome screen if a bad URL is entered */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </div>
      </BrowserRouter>
    </WebSocketProvider>
  );
};

export default App;
