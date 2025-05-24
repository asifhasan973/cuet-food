import Lottie from 'lottie-react';
import loginAnime from '../../assets/login.json';
import { FcGoogle } from 'react-icons/fc';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../Authprovider/Authprovider';

const Login = () => {
  const { loginWithEmail, signupWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  
  console.log(userId, 'User ID in Login Component');
  

  const from = location?.state || '/';

  const allowedDomain = ''; // Set the correct institutional domain

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // Check email domain on manual login
    if (!email.toLowerCase().endsWith(allowedDomain)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: `Please use your institutional email ending with ${allowedDomain}`,
      });
      return;
    }

    // Redirect aa100@gmail.com directly to the dashboard
    if (email === "aa100@gmail.com") {
      navigate('/Dashboard');
      return;
    }

    loginWithEmail(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        try {
          // Fetch user data from the API
          const response = await fetch('http://192.168.167.41:3000/api/users');
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await response.json();
          const loggedInUser = data.users.find((u) => u.email === user.email);

          if (loggedInUser) {
            setUserId(loggedInUser._id); // Store the _id in state
            console.log('Logged-in user ID:', loggedInUser._id); // Log the user ID for debugging

            if (loggedInUser.role === 'vendor') {
              navigate('/Dashboard'); // Redirect to Dashboard if role is vendor
            } else {
              navigate(from); // Redirect to the original location
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'User Not Found',
              text: 'No matching user found in the database.',
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
        });
      });
  };

  const handleGoogle = () => {
    signupWithGoogle()
      .then(async (result) => {
        const user = result.user || result; // depends on your AuthProvider implementation

        // Check Google sign-in email domain
        if (user.email && user.email.toLowerCase().endsWith(allowedDomain)) {
          Swal.fire({
            title: 'Good job!',
            text: 'You are logged in successfully!',
            icon: 'success',
          });
          navigate(from);
        } else {
          await signOut(user.auth || user);
          Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: `Please use your institutional email ending with ${allowedDomain}`,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Try Again',
          text: 'Something went wrong',
        });
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse lg:gap-20">
        {/* Lottie Animation */}
        <div className="flex-1 text-center lg:text-left w-60 lg:w-[600px]">
          <Lottie animationData={loginAnime}></Lottie>
        </div>

        {/* Login Form */}
        <div className="flex-1 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <h1 className="text-5xl font-bold mb-10">Login now!</h1>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Login Button */}
            <div className="form-control mt-3 flex items-center justify-center">
              <button className="btn bg-[#8fbf5b] text-white hover:text-black">
                Login
              </button>
            </div>
          </form>
          <div className="card-body pt-0">
            {/* Divider and Google Login */}
            <div className="divider">OR</div>
            <div className="form-control flex items-center justify-center">
              <button
                onClick={handleGoogle}
                className="btn btn-outline border-[#8fbf5b] text-[#8fbf5b] text-base"
              >
                <FcGoogle className="text-xl" />
                Login with Google
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center mt-4 text-sm">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="text-[#8fbf5b] font-bold hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
