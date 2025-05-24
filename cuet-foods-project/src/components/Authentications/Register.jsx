import Lottie from 'lottie-react';
import registerAnime from '../../assets/register.json';
import { FcGoogle } from 'react-icons/fc';
import { useContext } from 'react';
import { updateProfile, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../Authprovider/Authprovider';

const Register = () => {
  const { signupWithEmail, signupWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const allowedDomain = ''; // your institutional domain

  const registerHandle = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const role = e.target[3].value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    console.log('Registering user:', { name, email, password, role });
    // Validate email domain on manual signup
    if (!email.toLowerCase().endsWith(allowedDomain)) {
      toast.error(`Please use your institutional email ending with ${allowedDomain}`);
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must have an uppercase letter, a lowercase letter, and be at least 6 characters long.'
      );
      return;
    }

    try {
      const userCredential = await signupWithEmail(email, password);
      const user = userCredential.user;

      // Update user display name
      await updateProfile(user, {
        displayName: name,
      });

      // Reload the user to ensure the displayName is updated
      await user.reload();
      console.log('Updated user:', user);

      // Ensure the updated displayName is included in the backend payload
      const backendResponse = await fetch('http://192.168.167.41:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.displayName, // Use the updated displayName from Firebase
          email,
          role,
        }),
      });

      if (!backendResponse.ok) {
        throw new Error('Failed to register user in the backend');
      }

      const data = await backendResponse.json();
      console.log('User registered successfully:', data);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have been registered successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/login');
    } catch (err) {
      console.error('Registration failed', err);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1500,
      });
    }

    e.target.reset();
  };

  const handleGoogleSignup = () => {
    signupWithGoogle()
      .then(async (result) => {
        const user = result.user || result;

        // Check email domain
        if (user.email && user.email.toLowerCase().endsWith(allowedDomain)) {
          // Optional: Send role default or prompt user to select role after Google login

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `You have been registered successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/');
        } else {
          // If domain invalid, sign out immediately and alert
          await signOut(user.auth || user); // sign out the user
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `Please use your institutional email ending with ${allowedDomain}`,
            showConfirmButton: true,
          });
        }
      })
      .catch((err) => {
        console.error('Google signup failed', err);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse lg:gap-20">
        <div className="flex-1 text-center lg:text-left w-60 lg:w-[600px]">
          <Lottie animationData={registerAnime} />
        </div>
        <div className="flex-1 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={registerHandle} className="card-body">
            <h1 className="text-5xl font-bold mb-10">Join With Us</h1>

            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="input input-bordered"
                required
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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
            </div>

            {/* Role dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                name="role"
                defaultValue="student"
                className="select select-bordered"
                required
              >
                <option value="student">Student</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>

            {/* Register button */}
            <div className="form-control mt-6">
              <button className="btn bg-[#8fbf5b] text-white hover:text-black">
                Register
              </button>
            </div>

            <div className="divider">OR</div>

            {/* Google Signup */}
            <div className="form-control">
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="btn btn-outline border-[#8fbf5b] text-[#8fbf5b] text-base"
              >
                <FcGoogle className="text-xl" />
                Continue with Google
              </button>
            </div>

            <p className="text-center mt-4 text-sm">
              Have an account?{' '}
              <Link
                to="/login"
                className="text-[#8fbf5b] font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
