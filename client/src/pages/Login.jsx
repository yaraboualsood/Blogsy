import React from 'react';
import { Link, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userService } from '../api/userService';

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(8, 'At least 8 characters')
    .required('Password is required'),
})


export default function Login() {

  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { ...userData } = values;
        const result = await userService.login(userData);
        console.log('Login success:', result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.user._id);
        toast.success('Login successful!');
        resetForm();
        navigate('/');
      } catch (error) {
        const message = error.response?.data?.message;
        toast.error(message || "Login failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  });


  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <section className="bg-white shadow-md rounded-3xl p-6 flex flex-col md:flex-row w-full max-w-3xl">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full space-y-4 p-4"
          noValidate
        >
          <h2 className="text-center text-2xl font-bold text-main mb-6">
            Welcome Back
          </h2>

          {/* Email  */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 border-b">
              <i
                className={`fa-solid fa-envelope text-sm ${formik.touched.email
                  ? formik.errors.email
                    ? 'text-red-500'
                    : 'text-green-500'
                  : 'text-gray-500'
                  }`}
              ></i>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full border-none outline-none py-2 text-sm"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 border-b">
              <i
                className={`fa-solid fa-lock text-sm ${formik.touched.password
                  ? formik.errors.password
                    ? 'text-red-500'
                    : 'text-green-500'
                  : 'text-gray-500'
                  }`}
              ></i>              <input
                type="password"
                name="password"
                placeholder="Your Password"
                className="w-full border-none outline-none py-2 text-sm"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="main-color-bg w-full py-2 rounded-full text-sm font-medium hover:opacity-90 cursor-pointer"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Not registered?{' '}
            <Link to="/signup" className="text-main font-semibold underline">
              Create an account
            </Link>
          </p>
        </form>
      </section >
    </main >
  );
}