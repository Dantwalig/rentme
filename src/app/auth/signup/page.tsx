'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Upload, X } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+250',
    phone: '',
    idType: 'ID' as 'ID' | 'Passport',
    idNumber: '',
    idFrontImage: null as File | null,
    idBackImage: null as File | null,
    password: '',
    confirmPassword: ''
  });

  const [idFrontPreview, setIdFrontPreview] = useState<string | null>(null);
  const [idBackPreview, setIdBackPreview] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const countryCodes = [
    { code: '+250', country: 'RW', flag: '🇷🇼', name: 'Rwanda' },
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'USA' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'UK' },
    { code: '+254', country: 'KE', flag: '🇰🇪', name: 'Kenya' },
    { code: '+256', country: 'UG', flag: '🇺🇬', name: 'Uganda' },
    { code: '+255', country: 'TZ', flag: '🇹🇿', name: 'Tanzania' },
    { code: '+257', country: 'BI', flag: '🇧🇮', name: 'Burundi' },
  ];

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push('At least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('One uppercase letter');
    }
    if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('One number or special character');
    }
    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    validatePassword(password);
  };

  const handleIdNumberChange = (value: string) => {
    if (formData.idType === 'ID') {
      // Only allow numbers for National ID
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 16) {
        setFormData({ ...formData, idNumber: numericValue });
      }
    } else {
      // Allow alphanumeric for passport
      setFormData({ ...formData, idNumber: value });
    }
  };

  const handleIdTypeChange = (idType: 'ID' | 'Passport') => {
    setFormData({
      ...formData,
      idType,
      idNumber: '',
      idFrontImage: null,
      idBackImage: null
    });
    setIdFrontPreview(null);
    setIdBackPreview(null);
  };

  const handleFileUpload = (file: File | null, type: 'front' | 'back') => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'front') {
          setIdFrontPreview(reader.result as string);
          setFormData({ ...formData, idFrontImage: file });
        } else {
          setIdBackPreview(reader.result as string);
          setFormData({ ...formData, idBackImage: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (type: 'front' | 'back') => {
    if (type === 'front') {
      setIdFrontPreview(null);
      setFormData({ ...formData, idFrontImage: null });
    } else {
      setIdBackPreview(null);
      setFormData({ ...formData, idBackImage: null });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!validatePassword(formData.password)) {
      alert('Password does not meet requirements!');
      return;
    }

    if (formData.idType === 'ID' && formData.idNumber.length !== 16) {
      alert('National ID must be exactly 16 digits!');
      return;
    }
    
    if (!formData.idNumber) {
      alert('ID/Passport number is required!');
      return;
    }

    if (!formData.idFrontImage) {
      alert(`Please upload ${formData.idType === 'ID' ? 'front side of your ID' : 'your passport'}!`);
      return;
    }

    if (formData.idType === 'ID' && !formData.idBackImage) {
      alert('Please upload back side of your ID!');
      return;
    }

    // In production, send data to API
    console.log('Sign up data:', formData);
    
    // Redirect to houses page
    router.push('/houses');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Home className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join RentHub Rwanda today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Jean Claude Mugabo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <div className="flex gap-2">
              <select
                value={formData.countryCode}
                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="788 123 456"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Identification Type *
            </label>
            <select
              required
              value={formData.idType}
              onChange={(e) => handleIdTypeChange(e.target.value as 'ID' | 'Passport')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ID">National ID</option>
              <option value="Passport">Passport</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formData.idType} Number *
            </label>
            <input
              type="text"
              required
              value={formData.idNumber}
              onChange={(e) => handleIdNumberChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={formData.idType === 'ID' ? '1234567890123456 (16 digits)' : 'AB1234567'}
              maxLength={formData.idType === 'ID' ? 16 : undefined}
            />
            {formData.idType === 'ID' && formData.idNumber && (
              <p className="text-xs mt-1 text-gray-600">
                {formData.idNumber.length}/16 digits
              </p>
            )}
          </div>

          {/* ID/Passport Upload */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.idType === 'ID' ? 'National ID - Front Side *' : 'Passport *'}
              </label>
              {!idFrontPreview ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-xs text-gray-500">Click to upload</p>
                    <p className="text-xs text-gray-400">PNG, JPG or PDF (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'front')}
                  />
                </label>
              ) : (
                <div className="relative">
                  <img src={idFrontPreview} alt="ID Front" className="w-full h-32 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeFile('front')}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {formData.idType === 'ID' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  National ID - Back Side *
                </label>
                {!idBackPreview ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">Click to upload</p>
                      <p className="text-xs text-gray-400">PNG, JPG or PDF (MAX. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null, 'back')}
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <img src={idBackPreview} alt="ID Back" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeFile('back')}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {formData.idType === 'Passport' && (
              <p className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                ℹ️ For Rwandan visa, please upload the page showing your visa stamp
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter password"
            />
            {formData.password && passwordErrors.length > 0 && (
              <div className="mt-2 text-xs text-red-600 space-y-1">
                <p className="font-medium">Password must contain:</p>
                <ul className="list-disc list-inside">
                  {passwordErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            {formData.password && passwordErrors.length === 0 && (
              <p className="mt-1 text-xs text-green-600">✓ Password meets all requirements</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm password"
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">✗ Passwords do not match</p>
            )}
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="mt-1 text-xs text-green-600">✓ Passwords match</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}