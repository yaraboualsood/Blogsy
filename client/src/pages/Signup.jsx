import React from 'react';
import { Link, useNavigate } from 'react-router';
import signupImage from '/header-img-ps.jpg';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { userService } from '../api/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const signupSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces allowed')
    .required('First name is required').min(3, "First name must be 3 characters or more"),
  lastName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces allowed')
    .required('Last name is required').min(3, "Last name must be 3 characters or more"),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'At least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

export default function Signup() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { confirmPassword, ...userData } = values; //dont send confirm pass to backend
        const result = await userService.signUp(userData);
        console.log('Signup success:', result);

        toast.success('Signup successful!');
        resetForm();
        navigate('/login');
      } catch (error) {
        const message = error.response?.data?.message;

        if (error.response?.status === 409) {
          toast.error("This email is already registered.");
        } else {
          toast.error(message || "Signup failed. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    }

  });

  return (
    <main className="min-h-screen flex flex-col items-center px-4 bg-gray-100 pt-20">
      <section className="bg-white shadow-md rounded-3xl p-6 mt-10 flex flex-col md:flex-row w-full max-w-5xl">
        <form onSubmit={formik.handleSubmit} className="w-full md:w-1/2 space-y-4 p-4" noValidate
        >
          <h2 className="text-2xl font-bold text-main mb-4">Sign up</h2>

          {[
            { name: 'firstName', icon: 'fa-user', label: 'First Name' },
            { name: 'lastName', icon: 'fa-user', label: 'Last Name' },
            { name: 'email', icon: 'fa-envelope', label: 'Email', type: 'email' },
            { name: 'password', icon: 'fa-lock', label: 'Password', type: 'password' },
            { name: 'confirmPassword', icon: 'fa-lock', label: 'Confirm Password', type: 'password' },
          ].map(({ name, icon, label, type = 'text' }) => (
            <div key={name}>
              <div className="flex items-center gap-2 border-b">
                <i className={`fa-solid ${icon} text-sm ${formik.touched[name]
                  ? formik.errors[name]
                    ? 'text-red-500'
                    : 'text-green-500'
                  : 'text-gray-500'
                  }`}></i>
                <input
                  type={type}
                  name={name}
                  placeholder={label}
                  className="w-full border-none outline-none py-2 text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name]}
                />
              </div>
              {formik.touched[name] && formik.errors[name] && (
                <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="main-color-bg w-full py-2 rounded-full text-sm font-medium hover:opacity-90 cursor-pointer"
          >
            Register
          </button>

          <p className="text-sm mt-2 text-center">
            Already Registered?{' '}
            <Link to="/login" className="text-main font-semibold underline">
              Login
            </Link>
          </p>
        </form>

        <div className="hidden md:block w-full md:w-1/2 p-4">
          <img
            src={signupImage}
            alt="Sign Up"
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}

