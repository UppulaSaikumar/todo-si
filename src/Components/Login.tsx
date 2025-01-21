import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, logout } from '../redux/actions/authActions';
import { RootState } from '../redux/store';
import googleIamge from '../assets/google.png';
import rightImage from '../assets/rightImage.png';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const handleGoogleSignIn = () => {
    dispatch(googleLogin());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen" style={{ backgroundColor: '#FFF9F9' }}>
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Todo SI </h1>
        <p className="text-gray-600 text-center max-w-md mb-8">
          Streamline your workflow and track progress effortlessly with our all-in-one task management app.
        </p>
        {authState.loading ? (
          <p>Loading...</p>
        ) : authState.user ? (
          <div>
            <p>Welcome, {authState.user.displayName}</p>
            <button onClick={handleLogout} className="px-6 py-2 text-white bg-black rounded hover:bg-gray-600">
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="px-6 py-2 text-white bg-black rounded hover:bg-gray-600 flex items-center space-x-2"
          >
            <img src={googleIamge} alt="Google Logo" className="w-6 h-6 object-contain" />
            <span>Continue with Google</span>
          </button>
        )}
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center justify-center">
        <img src={rightImage} alt="Task Manager Illustration" className="max-w-full h-auto rounded-lg" />
      </div>
    </div>
  );
};

export default Login;
