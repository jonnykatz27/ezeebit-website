import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Eye, EyeOff, Mail, Lock, User, Building, Phone,
  ArrowRight, Shield, CheckCircle, AlertCircle
} from 'lucide-react'
import SEO from '../components/SEO'

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 2: Business Info
    businessName: '',
    businessType: '',
    businessAddress: '',
    businessRegistration: '',
    
    // Step 3: Account Setup
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToMarketing: false
  })

  const businessTypes = [
    'Retail Store',
    'Restaurant/Cafe',
    'E-commerce',
    'Professional Services',
    'Healthcare',
    'Education',
    'Non-profit',
    'Other'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Handle final submission
      console.log('Sign up data:', formData)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      case 2:
        return formData.businessName && formData.businessType && formData.businessAddress
      case 3:
        return formData.password && formData.confirmPassword && 
               formData.password === formData.confirmPassword && formData.agreeToTerms
      default:
        return false
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <img
            src="/ezeebit_black.png"
            alt="Ezeebit"
            className="h-12 w-auto"
          />
        </div>
        <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
          Personal Information
        </h2>
        <p className="text-neutral-600">
          Let's start with your basic information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
            First Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="John"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
            Last Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Doe"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="+27 11 123 4567"
            required
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
          Business Information
        </h2>
        <p className="text-neutral-600">
          Tell us about your business
        </p>
      </div>

      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-neutral-700 mb-2">
          Business Name
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Your Business Name"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="businessType" className="block text-sm font-medium text-neutral-700 mb-2">
          Business Type
        </label>
        <select
          id="businessType"
          name="businessType"
          value={formData.businessType}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        >
          <option value="">Select business type</option>
          {businessTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="businessAddress" className="block text-sm font-medium text-neutral-700 mb-2">
          Business Address
        </label>
        <textarea
          id="businessAddress"
          name="businessAddress"
          value={formData.businessAddress}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="123 Main Street, City, Province, Postal Code"
          required
        />
      </div>

      <div>
        <label htmlFor="businessRegistration" className="block text-sm font-medium text-neutral-700 mb-2">
          Business Registration Number (Optional)
        </label>
        <input
          type="text"
          id="businessRegistration"
          name="businessRegistration"
          value={formData.businessRegistration}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="2023/123456/07"
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
          Account Security
        </h2>
        <p className="text-neutral-600">
          Create a secure password for your account
        </p>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Create a strong password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            Passwords do not match
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500 mt-1"
            required
          />
          <label htmlFor="agreeToTerms" className="ml-3 text-sm text-neutral-700">
            I agree to the{' '}
            <Link to="/terms" className="text-primary-500 hover:text-primary-700 font-medium">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-500 hover:text-primary-700 font-medium">
              Privacy Policy
            </Link>
          </label>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeToMarketing"
            name="agreeToMarketing"
            checked={formData.agreeToMarketing}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500 mt-1"
          />
          <label htmlFor="agreeToMarketing" className="ml-3 text-sm text-neutral-700">
            I would like to receive marketing communications and product updates
          </label>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <SEO
        title="Sign Up for Merchant Account"
        description="Join 150+ merchants accepting stablecoin and crypto payments with Ezeebit. Quick KYC process, no setup fees, and start accepting Bitcoin, Ethereum, and stablecoins today."
        canonicalUrl="/signup"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-[60vh] gradient-bg flex items-center overflow-hidden -mt-20 pt-40"
      >
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-neutral-200 text-neutral-500'
                  }`}>
                    {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-primary-600' : 'bg-neutral-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-neutral-500">
              Step {currentStep} of 3
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card p-8"
          >
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="btn-outline flex items-center justify-center"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!isStepValid()}
                  className={`ml-auto btn-primary ${!isStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {currentStep === 3 ? 'Create Account' : 'Next'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </form>

            {currentStep === 1 && (
              <div className="mt-6 text-center">
                <p className="text-neutral-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-500 hover:text-primary-700 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-neutral-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-neutral-600">
                    <p className="font-medium mb-1">Your data is secure</p>
                    <p>We use bank-grade encryption to protect your information and never share your data with third parties.</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
    </>
  )
}

export default SignUp