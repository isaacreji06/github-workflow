'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
export default function LoginPage() {
  const [postInputs, setPostInputs] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setPostInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };
  //this is where the whole logic of this page binds
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await signIn("credentials", { redirect: false, ...postInputs,callbackUrl: "/dashboard", });
      console.log(res);
      if (res?.error) {
        setError("Invalid credentials");
        setIsLoading(false);
        return;
      }
      if (res?.ok && res.url) {
        router.push(res.url);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      alert(err)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        noValidate
      >
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Login</h2>
        {error && (
          <div className="mb-4 text-red-600 text-center text-sm" role="alert">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={postInputs.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
            autoComplete="email"
            disabled={isLoading}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={postInputs.password}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
            autoComplete="current-password"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}