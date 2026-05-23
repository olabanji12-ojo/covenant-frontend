import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth Screens
import { WelcomeScreen } from './pages/auth/WelcomeScreen';
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
import { ActiveChatScreen } from './pages/main/ActiveChatScreen';
import { PrayerScreen } from './pages/main/PrayerScreen';
import { ShareScriptureScreen } from './pages/main/ShareScriptureScreen';
import { ProfileScreen } from './pages/main/ProfileScreen';
import { UserProfileDetailScreen } from './pages/main/UserProfileDetailScreen';
import { FiltersScreen } from './pages/main/FiltersScreen';

const App = () => {
  return (
    <BrowserRouter>
      {/* We wrap everything in a root div so the background color is consistent */}
      <div className="min-h-screen bg-[#f7f5f0] flex flex-col w-full">
        <Routes>
          {/* Auth Flow */}
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/signup" element={<SignUpOptions />} />
          <Route path="/create-account" element={<CreateAccountForm />} />
          <Route path="/create-password" element={<CreatePasswordScreen />} />
          <Route path="/verify" element={<VerifyAccountScreen />} />
          <Route path="/faith-profile" element={<FaithProfileScreen />} />
          <Route path="/intentions" element={<IntentionsScreen />} />
          <Route path="/add-photos" element={<AddPhotosScreen />} />
          <Route path="/review-info" element={<ReviewInfoScreen />} />
          <Route path="/success" element={<SuccessScreen />} />

          {/* Main App Flow */}
          <Route path="/app/discover" element={<DiscoverScreen />} />
          <Route path="/app/matches" element={<MatchesScreen />} />
          <Route path="/app/match-success" element={<MatchSuccessScreen />} />
          <Route path="/app/chat" element={<ActiveChatScreen />} />
          <Route path="/app/share-scripture" element={<ShareScriptureScreen />} />
          <Route path="/app/prayers" element={<PrayerScreen />} />
          <Route path="/app/profile" element={<ProfileScreen />} />
          <Route path="/app/profile-detail" element={<UserProfileDetailScreen />} />
          <Route path="/app/filters" element={<FiltersScreen />} />
          
          {/* Fallback to welcome screen if a bad URL is entered */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
