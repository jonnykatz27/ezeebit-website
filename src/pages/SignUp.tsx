import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'

/** Confirmed in the production merchant bundle: hash history and path `/signup`. */
const PORTAL_SIGNUP = 'https://merchant.ezeebit.com/#/signup'
const PORTAL_LOGIN = 'https://merchant.ezeebit.com/#/login'

const SignUp = () => {
  return (
    <>
      <SEO
        title="Open an Ezeebit merchant account"
        description="Open an Ezeebit merchant account to accept crypto and stablecoin payments in-store, online, or on your platform. No setup fees."
        canonicalUrl="/signup"
      />
      <div className="pt-[7.5rem] pb-24">
        <div className="container-custom max-w-xl text-center">
          <h1 className="hero-title text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-4">
            Open a merchant account
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            Account signup is in the Merchant Portal. Continue there to create your account.
          </p>
          <a
            href={PORTAL_SIGNUP}
            className="btn-primary inline-flex items-center justify-center"
          >
            Continue to signup
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
          <p className="mt-6 text-neutral-600">
            Already have an account?{' '}
            <a href={PORTAL_LOGIN} className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in here
            </a>
          </p>
          <p className="mt-4 text-sm text-neutral-600">
            <Link to="/resources/legal#terms" className="text-primary-600 hover:text-primary-700 font-medium">
              Terms of Use
            </Link>
            {' · '}
            <Link to="/resources/legal#privacy" className="text-primary-600 hover:text-primary-700 font-medium">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUp
