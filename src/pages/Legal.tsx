import { useState, useEffect } from 'react'
import { motion } from '../lib/motion'
import { Link, useLocation } from 'react-router-dom'
import {
  Shield, FileText, Eye, Scale, Award
} from 'lucide-react'
import SEO from '../components/SEO'
import DarkBackdrop from '../components/DarkBackdrop'
import { HERO_PRIMARY, HERO_SECONDARY } from '../components/hero/PageHero'

const Legal = () => {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('terms')

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash === 'privacy' || hash === 'terms' || hash === 'compliance') {
      setActiveSection(hash)
    }
  }, [location.hash])

  const legalSections = [
    { id: 'terms', name: 'Terms of Use', icon: <FileText className="w-5 h-5" /> },
    { id: 'privacy', name: 'Privacy Policy', icon: <Eye className="w-5 h-5" /> },
    { id: 'compliance', name: 'Compliance', icon: <Shield className="w-5 h-5" /> }
  ]

  const complianceItems = [
    {
      title: 'FSCA Regulated',
      description: 'Operating under the exemption as a Crypto Assets Services Provider under the Financial Sector Conduct Authority',
      status: 'Active',
      number: 'FSP 53664',
      icon: <Award className="w-6 h-6" />
    },
    {
      title: 'FIC Compliance',
      description: 'Fully compliant with the Financial Intelligence Centre Act for anti-money laundering',
      status: 'Certified',
      number: '',
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: 'FAIS Regulated',
      description: 'Operating under the Financial Advisory and Intermediary Services Act',
      status: 'Regulated',
      number: '',
      icon: <Scale className="w-6 h-6" />
    }
  ]

  /* The Terms of Use, word for word as issued (version 1.0, effective 13 November 2026). Legal text: change it only from a new issued version. */
  const renderTermsOfService = () => (
    <div className="max-w-none">
      <h2 className="!text-2xl font-bold text-neutral-900 mb-4">Ezeebit Terms of Use</h2>
      <p className="text-neutral-600 mb-6">Version 1.0. Effective 13 November 2026.</p>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">1. About these Terms</h3>
          <div className="space-y-3">
            <p className="text-neutral-700"><strong>1.1</strong> These Terms of Use (<strong>Terms</strong>) govern your access to and use of the Ezeebit website at www.ezeebit.com, the Ezeebit merchant portal, our APIs and any other Ezeebit platform (the <strong>Platform</strong>), and the services we provide through it (the <strong>Services</strong>).</p>
            <p className="text-neutral-700"><strong>1.2</strong> "<strong>Ezeebit</strong>", "<strong>we</strong>" and "<strong>us</strong>" mean the Ezeebit company that provides the Service to you under clause 2. "<strong>You</strong>" means the business that registers for an account, and each person who uses the Platform on its behalf.</p>
            <p className="text-neutral-700"><strong>1.3</strong> You accept these Terms when you tick the acceptance box, create an account or use any Service, whichever happens first. If you do not agree, do not use the Platform.</p>
            <p className="text-neutral-700"><strong>1.4</strong> The person who accepts these Terms for a business confirms that they are at least 18 and are authorised to bind that business.</p>
            <p className="text-neutral-700"><strong>1.5</strong> The Services are for businesses only. They are not offered to consumers.</p>
            <p className="text-neutral-700"><strong>1.6</strong> Our website, documentation and marketing material describe the Services in general terms. They are for information only and are not promises, warranties or part of these Terms. If they differ from these Terms, these Terms prevail. In particular:</p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>Timing.</strong> Settlement and payout times are targets that we usually meet. They are not guaranteed, and they do not run while a bank, network or compliance review delays a transaction.</li>
              <li><strong>Rates.</strong> A locked rate applies only to a payment that arrives in full, in the correct asset and on the correct network, within the validity period of its quote. An underpayment, overpayment or late payment is credited at the rate that applies when we process it.</li>
              <li><strong>Finality.</strong> Statements that crypto payments are final or carry no chargebacks mean that they are not subject to card-scheme chargebacks. They do not limit our rights under these Terms to reject, hold, freeze, reverse or deduct.</li>
              <li><strong>Pricing.</strong> Prices shown are indicative. The fees that apply to you are those in the portal, your fee schedule or your signed agreement, and they exclude the conversion spread, network fees and VAT.</li>
              <li><strong>Coverage.</strong> A country, currency, asset, network or feature shown on the website may not be available to you, and showing it is not a commitment to provide it.</li>
              <li><strong>Regulatory status.</strong> Statements about our licences and registrations describe our status when they were published. They are not a promise that the status will continue, or that any Service is regulated or protected in your country.</li>
              <li><strong>Security.</strong> Descriptions of our security and safeguarding measures are not a guarantee against loss.</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">2. Who you contract with</h3>
          <div className="space-y-3">
            <p className="text-neutral-700"><strong>2.1</strong> The Services on the Platform, including every South African rand (<strong>ZAR</strong>) and Tether (<strong>USDT</strong>) Service, are provided by <strong>Ezee Solutions Group (Pty) Ltd</strong>, trading as Ezeebit, registration no. 2022/250578/07, of 135 Beach Road, Mouille Point, Cape Town, 8005, South Africa. It performs those Services in South Africa. It is an authorised crypto asset service provider (FSP no. 53664) and a registered accountable institution under the Financial Intelligence Centre Act, 2001.</p>
            <p className="text-neutral-700"><strong>2.2</strong> Two other Ezeebit group companies provide Services only where we have confirmed this to you in writing:</p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>Ezee Solutions Group (Kenya) Limited</strong>, registration no. PVT-RQ13JL95, for Services performed in Kenya; and</li>
              <li><strong>Ezeebit Canada Ltd.</strong> (formerly Kinetic Payments Ltd.), Ontario corporation no. 1001629407, of 6840-222 Somerset Street West, Ottawa, Ontario, K2P 2G3, Canada, for Services performed in Canada. It is registered with FINTRAC as a money services business (registration no. N300001912). Registration is not a licence or an endorsement by FINTRAC.</li>
            </ul>
            <p className="text-neutral-700"><strong>2.3</strong> You contract only with the Ezeebit company that provides the Service to you. Each company is responsible only for the Services it provides, and no Ezeebit company, shareholder or director is liable for the obligations of another.</p>
            <p className="text-neutral-700"><strong>2.4</strong> USDT balances are held only by Ezee Solutions Group (Pty) Ltd or Ezee Solutions Group (Kenya) Limited. Ezeebit Canada Ltd. does not hold crypto-asset balances for clients.</p>
            <p className="text-neutral-700"><strong>2.5</strong> Being regulated in one country does not mean that we are licensed, or that a Service is available, in any other country. A Service described as "early access" or "coming soon" is not a commitment to provide it.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">3. Signed agreements come first</h3>
          <div className="space-y-3">
            <p className="text-neutral-700"><strong>3.1</strong> If you have signed a Master Services Agreement or a Statement of Work with us, it applies to the Services it covers and prevails over these Terms if they conflict.</p>
            <p className="text-neutral-700"><strong>3.2</strong> In every other case, these Terms are the whole agreement between you and us for your use of the Platform.</p>
            <p className="text-neutral-700"><strong>3.3</strong> Registering does not oblige us to onboard you or to provide any Service. No Service is available until we confirm that your account is active.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">4. Onboarding and your account</h3>
          <div className="space-y-3">
            <p className="text-neutral-700"><strong>4.1</strong> We must verify you before and while we provide Services. You must give us the information and documents we ask for about you, your directors, owners, authorised users, customers, bank accounts and wallets. They must be true, complete and current, and you must tell us within 10 business days if anything changes.</p>
            <p className="text-neutral-700"><strong>4.2</strong> We may refuse an application, or decline any Service, without giving reasons.</p>
            <p className="text-neutral-700"><strong>4.3</strong> You may use the Services only for the business you disclosed to us, and only for your own account.</p>
            <p className="text-neutral-700"><strong>4.4</strong> You are responsible for holding every licence and approval that your own business needs.</p>
            <p className="text-neutral-700"><strong>4.5</strong> You must keep your passwords, API keys and authentication devices secure, use two-factor authentication where we offer it, and tell us immediately at support@ezeebit.com if you suspect unauthorised access.</p>
            <p className="text-neutral-700"><strong>4.6</strong> We may rely on any instruction given with your credentials. You are responsible for those instructions unless the loss was caused by our fraud, wilful misconduct or gross negligence.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">5. Deposits, conversion and withdrawals</h3>
          <div className="space-y-3">
            <p className="text-neutral-700"><strong>5.1 Balances.</strong> Your balance is our record of the ZAR or USDT we hold for you. It is not a bank deposit, we are not a bank, and it is not covered by deposit insurance. We hold client ZAR in bank accounts, and client USDT in wallets, that are separate from our own operating funds. No interest is paid to you, and we may keep any interest or other benefit we earn on funds we hold. We control the private keys to the wallets in which USDT is held.</p>
            <p className="text-neutral-700"><strong>5.2 ZAR deposits.</strong> You may deposit ZAR only by electronic transfer from a verified South African bank account in your own name, using the reference shown in the portal. We do not accept cash or third-party deposits and may return them, less bank charges. We credit a deposit once we have received cleared funds, matched them to you and completed our checks. If a bank reverses a deposit after we credit it, we may debit your balance and you must pay any shortfall.</p>
            <p className="text-neutral-700"><strong>5.3 USDT deposits.</strong> You may deposit USDT only to the address shown for your account, on Ethereum, Tron, Solana or BNB Smart Chain. We credit it after the confirmations and screening we require. If you send another asset, use another network or use a wrong address, the asset may be permanently lost and we are not obliged to recover it. A deposit we reject on compliance grounds is not credited. Where the law permits we return it to the sender, less network fees, and in some cases we must hold or report it.</p>
            <p className="text-neutral-700"><strong>5.4 Conversion.</strong> When you convert between ZAR and USDT, we show you a quote with the rate and the amounts. The quote is valid only for the period shown. Once you accept a valid quote and we confirm it, the conversion is final and cannot be cancelled. We act as principal and are your counterparty. Our rate includes a spread and may differ from other providers' rates. You must hold enough balance before you accept. We need not give a quote, and we may set minimum and maximum amounts. If a quote or conversion contains an obvious error, we may cancel or correct it.</p>
            <p className="text-neutral-700"><strong>5.5 ZAR withdrawals.</strong> We pay ZAR withdrawals only to a verified South African bank account in your own name. Payment times depend on banks and are not guaranteed. If you give us wrong bank details, we are not liable for a payment made to them.</p>
            <p className="text-neutral-700"><strong>5.6 USDT withdrawals.</strong> We send USDT withdrawals on Ethereum only, to an address you have whitelisted, that you confirm you control and that passes our screening. You must give us any sender and recipient details we need for the Travel Rule. Blockchain transfers are irreversible. Once we broadcast a withdrawal we cannot cancel or recall it, and you are solely responsible for the address you choose.</p>
            <p className="text-neutral-700"><strong>5.7 Limits, holds and corrections.</strong> We may set and change limits, cut-off times and waiting periods, and show them in the portal. We may delay, limit, refuse or reverse any transaction where clause 7 or 8 applies, where we suspect fraud or error, or where a bank, liquidity provider or network is unavailable. We may correct any error in your account and reverse any amount credited to you by mistake, without notice. If your balance becomes negative for any reason, you must pay us the shortfall on demand, with interest at the prime rate of our bankers plus 2% a year from the date of demand. We may deduct or set off any amount you owe us, or owe any Ezeebit group company, against any balance or payment due to you, in any currency and at our conversion rate. You may not set off or withhold any amount you owe us.</p>
            <p className="text-neutral-700"><strong>5.8 Supported assets.</strong> The portal and docs.ezeebit.com show the assets and networks we support. We may add, suspend or remove any of them, and we decide whether to support any fork or upgrade.</p>
            <p className="text-neutral-700"><strong>5.9 Exchange control.</strong> If you are a South African resident, you alone are responsible for complying with South African exchange control rules in everything you do through the Platform, including holding USDT and moving it outside South Africa. We do not apply for approval for you or advise you on it, and we may report transactions where the law requires.</p>
            <p className="text-neutral-700"><strong>5.10 Statements.</strong> You must check your statements and tell us within 30 days of any entry you believe is wrong.</p>
            <p className="text-neutral-700"><strong>5.11 Closing your account.</strong> You may close your account at any time once pending transactions have settled. We will pay your remaining balance to your verified bank account or whitelisted address, less anything you owe us, unless the law prevents us.</p>
            <p className="text-neutral-700"><strong>5.12 Payments from your customers.</strong> Where we accept crypto-asset payments from your customers for you, you are solely responsible for your customers, for the goods or services you sell them, and for any refund or dispute with them. We credit you only for payments that we actually receive and that pass our screening. We are not a party to your sale and give your customers no undertaking.</p>
            <p className="text-neutral-700"><strong>5.13 Payouts you instruct.</strong> Where we send a payout on your instruction, you are solely responsible for the accuracy of the recipient, amount, address, network and bank details, for your right to make the payment, and for your own obligations to the recipient. We may refuse or delay a payout under clause 5.7, and a payout that has been sent cannot be recalled.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">6. Fees</h3>
          <div className="space-y-3">
            <p className="text-neutral-700"><strong>6.1</strong> You must pay the fees shown in the portal, in your fee schedule or agreed with us in writing. Fees for a transaction are shown before you confirm it. You must dispute any fee within 30 days of it appearing in your account, after which it is treated as accepted.</p>
            <p className="text-neutral-700"><strong>6.2</strong> Each USDT withdrawal carries a network fee, shown in USDT before you confirm. It is an estimate of blockchain costs and may be more or less than the cost we incur. It can change at any time, is separate from any other fee, and is not refundable once the withdrawal is broadcast.</p>
            <p className="text-neutral-700"><strong>6.3</strong> When USDT is sent to us, the sender pays the network fee and we credit the amount that arrives. Charges levied by your bank, wallet provider or exchange are for your account.</p>
            <p className="text-neutral-700"><strong>6.4</strong> Fees exclude VAT. Fees do not include the conversion spread.</p>
            <p className="text-neutral-700"><strong>6.5</strong> We may change our fees at any time by giving you notice in the portal or by email. A change takes effect on the date stated in the notice, or immediately if no date is stated, and applies to transactions you confirm from then on. The fee shown before you confirm a transaction is the fee you pay. If you do not agree to a change, you may stop using the Services and close your account. Using the Services after a change takes effect means you accept it.</p>
            <p className="text-neutral-700"><strong>6.6</strong> You are responsible for your own taxes.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">7. Sanctions and prohibited use</h3>
          <div className="space-y-3">
            <p className="text-neutral-700"><strong>7.1 Sanctions.</strong> "<strong>Sanctions</strong>" means the sanctions, targeted financial sanctions and asset freezes imposed by the United Nations Security Council, South Africa, Kenya, Canada, the United States (including OFAC), the European Union, the United Kingdom, and any other authority whose sanctions apply to us, our banking, liquidity or stablecoin partners, or a transaction. We apply all of them to every client.</p>
            <p className="text-neutral-700"><strong>7.2 Restricted persons and places.</strong> We do not provide Services to, or process transactions connected with:</p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li>any person named on a Sanctions list, or owned 50% or more or controlled by such a person;</li>
              <li>any country or territory subject to comprehensive Sanctions, which currently are Cuba, Iran, North Korea, and the Crimea, Donetsk, Luhansk, Kherson and Zaporizhzhia regions of Ukraine;</li>
              <li>any jurisdiction that the Financial Action Task Force identifies as high-risk and subject to a call for action, which currently are Iran, North Korea and Myanmar; or</li>
              <li>any other jurisdiction we designate as restricted on our website.</li>
            </ul>
            <p className="text-neutral-700"><strong>7.3 Restricted platforms.</strong> We screen the wallet behind every payment. We do not accept payments from, or send funds to:</p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li>an exchange, payment processor or other platform that is named on a Sanctions list or is owned or controlled by a person named on one;</li>
              <li>a platform established in, or mainly serving, a restricted jurisdiction;</li>
              <li>a mixer, tumbler or similar service, or a darknet market; or</li>
              <li>any other platform that we or our screening providers identify as an unacceptable sanctions, money laundering, terrorist financing or fraud risk.</li>
            </ul>
            <p className="text-neutral-700">This also covers businesses, domains and wallet addresses connected to those platforms. We may publish an indicative list on our website. It is a guide only, and a platform may be restricted before it appears there.</p>
            <p className="text-neutral-700"><strong>7.4 Your undertakings.</strong> Each time you use the Services you confirm that:</p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li>neither you nor any of your directors, owners or authorised users is a restricted person;</li>
              <li>you will not use the Services with, for the benefit of, or to send funds to or from a restricted person, place or platform;</li>
              <li>you will not use a VPN or other tool to hide your location or identity;</li>
              <li>you have reasonable controls to make sure your own customers are not restricted persons; and</li>
              <li>you will tell us immediately if any of this stops being true.</li>
            </ul>
            <p className="text-neutral-700"><strong>7.5 Prohibited use.</strong> You must not use the Services:</p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li>for money laundering, terrorist financing, proliferation financing, fraud or dealing with the proceeds of crime;</li>
              <li>to evade Sanctions, exchange controls, tax or any reporting requirement;</li>
              <li>to split or disguise transactions to avoid limits, screening or monitoring;</li>
              <li>for Ponzi, pyramid or unlicensed investment schemes, illegal or unlicensed gambling, narcotics, weapons, stolen or counterfeit goods, content that exploits children, ransomware or hacking;</li>
              <li>for gambling, forex or trading platforms, money transmission, exchange or payment services for third parties, lending, investment management, charities or adult services, unless we approved this in writing at onboarding; or</li>
              <li>in any way that breaches the law.</li>
            </ul>
            <p className="text-neutral-700"><strong>7.6 What we may do.</strong> If we know or reasonably suspect a breach of this clause, or a connection to a restricted person, place or platform, we may immediately and without notice block or reject the transaction, freeze the affected funds or balance, suspend or close your account, and report the matter to any authority. Where the law requires us to freeze assets, we cannot release them until the authority permits, and no interest or compensation is payable. We may be prohibited from telling you what we have done or why.</p>
            <p className="text-neutral-700"><strong>7.7 Issuer freezes.</strong> Stablecoin issuers and blockchain networks can freeze or destroy tokens at an address. We do not control this. If an issuer freezes USDT that relates to your transactions, we may make a matching deduction or hold against your balance.</p>
            <p className="text-neutral-700"><strong>7.8 Your liability.</strong> You indemnify us, our group companies and our directors, officers and employees against all losses, fines, penalties and costs arising from your breach of this clause. We are not liable for any loss you suffer because we act under this clause in good faith.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">8. Compliance and monitoring</h3>
          <div className="space-y-3">
            <p className="text-neutral-700"><strong>8.1</strong> We monitor transactions and may ask you at any time about a transaction, your customers, a counterparty or the source or destination of funds. You must answer promptly and accurately.</p>
            <p className="text-neutral-700"><strong>8.2</strong> We may delay, block, reject or reverse a transaction, or suspend your account, where you have not given us information we asked for, our checks are incomplete, screening shows a risk we do not accept, we suspect unlawful activity, or processing might breach the law. No processing time applies during a compliance review.</p>
            <p className="text-neutral-700"><strong>8.3</strong> We report to regulators, financial intelligence units, tax authorities and law enforcement where the law requires or permits. We do not need your consent and may be prohibited from telling you.</p>
            <p className="text-neutral-700"><strong>8.4</strong> We process personal information as set out in the Privacy Policy published on our website and in line with applicable data protection law. We may share it within the Ezeebit group and with our service providers, including across borders, to provide the Services and comply with the law. You must be entitled to give us any personal information you share about other people.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">9. Risks you accept</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">By using the Services you accept that:</p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li>crypto-assets are not legal tender and are not backed by any government or central bank;</li>
              <li>USDT is issued by a third party we do not control, and we do not guarantee its value, its redemption or the issuer's solvency;</li>
              <li>the ZAR value of USDT moves with exchange rates and market conditions;</li>
              <li>blockchain transfers are irreversible, and assets sent to a wrong address or network are usually lost;</li>
              <li>blockchains can be congested, delayed, forked or attacked, and we do not control them;</li>
              <li>while we hold a balance for you, you rely on us and on our banks, custodians and liquidity providers;</li>
              <li>laws on crypto-assets, exchange control and tax are changing, and a change may limit or end a Service at short notice; and</li>
              <li>we do not give investment, legal or tax advice.</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">10. Our Platform and liability</h3>
          <div className="space-y-3">
            <p className="text-neutral-700"><strong>10.1</strong> We own or license all intellectual property in the Platform. You may use it only for your own business while your account is active. You must not copy, reverse engineer, scrape, resell or interfere with it, or use our name or logo without our written consent.</p>
            <p className="text-neutral-700"><strong>10.2</strong> We will provide the Services with reasonable care and skill. Otherwise, to the fullest extent the law allows, the Platform and Services are provided "as is" and "as available", and we do not promise that they will be uninterrupted, error-free or secure.</p>
            <p className="text-neutral-700"><strong>10.3</strong> We are not liable to you for any indirect, special or consequential loss, or for any loss of profit, revenue, business, opportunity, goodwill or data, however it arises and whether or not we were told it was possible.</p>
            <p className="text-neutral-700"><strong>10.4</strong> Our total liability to you in any 12-month period, for all claims of any kind taken together, is limited to the fees you paid us in the 6 months before the event giving rise to the claim. Your liability to us is not limited.</p>
            <p className="text-neutral-700"><strong>10.5</strong> We are not liable for loss, including the loss of a balance, caused by the act, failure or insolvency of banks, custodians, liquidity providers, payment systems, blockchain networks, stablecoin issuers or other third parties we do not control, by a cyber-attack or security breach that occurs despite our reasonable precautions, by scheduled or emergency downtime, by instructions given with your credentials, by wrong details you gave us, by market movements, by action we take in good faith under clause 5.7, 7 or 8, or by events beyond our reasonable control. This clause does not exclude loss caused by our own fraud, wilful misconduct or gross negligence.</p>
            <p className="text-neutral-700"><strong>10.6</strong> Clauses 10.3 and 10.4 do not apply to our fraud or wilful misconduct, or to any liability that cannot lawfully be limited. They also do not apply to our obligation to return a balance that is not frozen or on hold, but that obligation is limited to the amount of the balance and is subject to clause 10.5.</p>
            <p className="text-neutral-700"><strong>10.7</strong> You indemnify us, our group companies and our directors, officers, employees and service providers against all losses, liabilities, fines, penalties, taxes and costs, including legal costs on the attorney and own client scale, that arise from:</p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li>your business, your products or services, or any claim or dispute involving your customers or recipients;</li>
              <li>your breach of these Terms or of the law;</li>
              <li>any transaction or instruction given with your credentials, including one that was unauthorised, fraudulent, unlawful or inaccurate;</li>
              <li>any information you gave us that was false, incomplete or misleading;</li>
              <li>any reversal, recall or chargeback of funds you deposited; or</li>
              <li>any enquiry, investigation or action by a regulator or authority that relates to you or your transactions.</li>
            </ul>
            <p className="text-neutral-700"><strong>10.8</strong> You must notify us in writing of any claim within 6 months of the date you became aware, or should have become aware, of the facts behind it. After that, the claim lapses to the extent the law allows.</p>
            <p className="text-neutral-700"><strong>10.9</strong> <strong>Clauses 1.6, 5.7, 5.12, 5.13, 7.6, 7.8, 10.2 to 10.13 and 12.8 limit our liability to you and place risk and liability on you. Please read them carefully before you accept these Terms.</strong></p>
            <p className="text-neutral-700"><strong>10.10</strong> Our records of your account, balances, transactions, instructions and acceptance of these Terms are proof of their contents unless you prove otherwise. A certificate signed by one of our directors stating an amount you owe us is sufficient proof of that amount for any legal proceedings, unless you prove otherwise.</p>
            <p className="text-neutral-700"><strong>10.11</strong> We do not act as your trustee, fiduciary, adviser or agent, and we owe you no duties beyond those set out in these Terms.</p>
            <p className="text-neutral-700"><strong>10.12</strong> The remedies in these Terms are your only remedies against us. You may bring a claim only against the Ezeebit company that provided the Service, and not against any other group company or any director, officer, employee or shareholder.</p>
            <p className="text-neutral-700"><strong>10.13</strong> You must pay all costs we incur in recovering amounts you owe us or enforcing these Terms, including legal costs on the attorney and own client scale, collection commission and tracing fees. We may take over the defence and settlement of any claim for which you must indemnify us, at your cost.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">11. Suspension and termination</h3>
          <div className="space-y-3">
            <p className="text-neutral-700"><strong>11.1</strong> You may stop using the Services and close your account at any time under clause 5.11.</p>
            <p className="text-neutral-700"><strong>11.2</strong> We may end our agreement with you, or change, limit or withdraw any Service, at any time on written notice.</p>
            <p className="text-neutral-700"><strong>11.3</strong> We may suspend or end it immediately, without notice, if you breach clause 4, 7 or 8, if the law, a regulator, a court or one of our banking or liquidity partners requires it, if you become insolvent or stop trading, or if we reasonably suspect fraud, unlawful activity or a security compromise.</p>
            <p className="text-neutral-700"><strong>11.4</strong> Clauses 5.11, 7, 8, 10 and 12 continue after termination.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">12. Law, disputes and changes</h3>
          <div className="space-y-3">
            <p className="text-neutral-700"><strong>12.1</strong> These Terms are governed by the laws of South Africa. This does not remove any protection that mandatory local law gives you where another Ezeebit company provides the Service.</p>
            <p className="text-neutral-700"><strong>12.2</strong> The parties will first try to resolve a dispute by negotiation. If it is not resolved within 10 business days of written notice, either party may refer it to arbitration administered by the Arbitration Foundation of Southern Africa under its Commercial Rules, before a single arbitrator, in Cape Town and in English. Either party may approach a court for urgent relief. We may instead choose to bring proceedings in any court that has jurisdiction, including a Magistrate's Court, to recover any amount you owe us. You may bring a claim only in your own name, and not as part of a class or representative action.</p>
            <p className="text-neutral-700"><strong>12.3</strong> Send complaints to support@ezeebit.com. We will acknowledge them promptly and work to resolve them.</p>
            <p className="text-neutral-700"><strong>12.4</strong> We may change these Terms by posting a new version on our website with its effective date. We will give at least 7 days' notice of a material change, other than a fee change under clause 6.5, unless the law, a regulator, security or Sanctions require it sooner. Using the Services after a change takes effect means you accept it.</p>
            <p className="text-neutral-700"><strong>12.5</strong> You agree to receive notices electronically, in the portal or by email. Electronic acceptance of these Terms is as binding as a signature.</p>
            <p className="text-neutral-700"><strong>12.6</strong> You may not transfer your rights or obligations without our written consent. We may transfer ours to another Ezeebit group company on notice to you.</p>
            <p className="text-neutral-700"><strong>12.7</strong> If any part of these Terms is unenforceable, the rest continues. A delay in enforcing a right is not a waiver of it.</p>
            <p className="text-neutral-700"><strong>12.8</strong> These Terms, together with any signed agreement under clause 3, are the whole agreement between you and us about the Platform. You confirm that you have not relied on any statement, promise or representation that is not set out in them, including anything on our website or said by our staff. To the fullest extent the law allows, all warranties and terms implied by law are excluded.</p>
            <p className="text-neutral-700"><strong>12.9</strong> Nothing in these Terms makes either party the partner or agent of the other, or gives any right to a person who is not a party to them, including your customers.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">13. Company information</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">This website is operated by Ezee Solutions Group (Pty) Ltd, trading as Ezeebit, a private company registered in South Africa (registration no. 2022/250578/07). Registered address: 135 Beach Road, Mouille Point, Cape Town, 8005, South Africa. Email: support@ezeebit.com. Telephone: +27 21 879 5074. Website: www.ezeebit.com.</p>
          </div>
        </section>
      </div>
    </div>
  )

  const renderPrivacyPolicy = () => (
    <div className="max-w-none">
      <h2 className="!text-2xl font-bold text-neutral-900 mb-4">Privacy Policy</h2>
      <p className="text-neutral-600 mb-6">Last updated: January 1, 2024</p>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">1. Definitions</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              The following words and expressions bear the meanings assigned to them and cognate expressions bear corresponding meanings:
            </p>
            <p className="text-neutral-700">
              <strong>1.1</strong> <strong>"Applicable Laws"</strong> means all applicable laws, rules, codes, regulations, and formal regulatory guidelines and standards, made by a Regulator, legislature or other public authority with binding effect in force from time to time (construed having regard to related guidance and codes of practice issued or approved by a regulator or other public body);
            </p>
            <p className="text-neutral-700">
              <strong>1.2</strong> <strong>"CIPC"</strong> means the Companies and Intellectual Property Commission;
            </p>
            <p className="text-neutral-700">
              <strong>1.3</strong> <strong>"Controller"</strong> and <strong>"Processor"</strong> are read to refer to those equivalent terms;
            </p>
            <p className="text-neutral-700">
              <strong>1.4</strong> <strong>"Data Breach"</strong> means any actual or suspected breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, Personal Information transmitted, stored or otherwise Processed;
            </p>
            <p className="text-neutral-700">
              <strong>1.5</strong> <strong>"Data Protection Laws"</strong> means any Applicable Laws which regulate the Processing of Personal Information that is received by Ezee Solutions;
            </p>
            <p className="text-neutral-700">
              <strong>1.6</strong> <strong>"Data Subject"</strong> means each identified or identifiable (whether directly or indirectly) legal or natural person to whom any Personal Information relates;
            </p>
            <p className="text-neutral-700">
              <strong>1.7</strong> <strong>"Ezee Solutions", "we", "our", "us"</strong> means Ezee Solutions Group (Proprietary) Limited, a company registered in terms of South African law with registration number: 2022/250578/07;
            </p>
            <p className="text-neutral-700">
              <strong>1.8</strong> <strong>"Personal Information"</strong> means information relating to any natural or legal person, the Processing of which is regulated by Data Protection Laws including: (i) information relating to the race, gender, sex, marital status, national, ethnic or social origin, colour, age, disability, language and birth of the person; (ii) information relating to the education or the medical, financial, criminal or employment history of the person; (iii) information relating to the financial affairs of the person; (iv) credit card details and transactional data; (v) any identifying number, symbol, e-mail address, physical address, telephone number or other particular assignment to the person; (vi) correspondence sent by the person that is implicitly or explicitly of a private or confidential nature or further correspondence that would reveal the contents of the original correspondence; (vii) the views or opinions of another individual about the person; (viii) the name of the person if it appears with other personal information relating to the person or if the disclosure of the name itself would reveal information about the person; and (ix) any other information the Processing of which may be treated or defined as "personal information" in terms of any Applicable Laws, including Data Protection Laws;
            </p>
            <p className="text-neutral-700">
              <strong>1.9</strong> <strong>"Policy"</strong> means this Privacy Policy;
            </p>
            <p className="text-neutral-700">
              <strong>1.10</strong> <strong>"Process"</strong> means to collect, receive, record, organise, collate, store, develop, update, modify, retrieve, alter, consult, use, disseminate or perform any other act or action, including any other act or action which may be treated or defined as "process\" or "processing" (or any equivalent term for a similarly-regulated activity) in terms of any Data Protection Laws, and "Processed\" and "Processing\" shall have a corresponding meaning;
            </p>
            <p className="text-neutral-700">
              <strong>1.11</strong> <strong>"Regulator"</strong> shall mean any court or public body having regulatory or supervisory authority over all Personal Information;
            </p>
            <p className="text-neutral-700">
              <strong>1.12</strong> <strong>"Responsible Party"</strong> and <strong>"Operator"</strong> have the meanings given to those terms in the Data Protection Laws, and where an equivalent term is used in Data Protection Laws (such as "Responsible Party" and "Operator", respectively).
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">2. Purpose of the Policy</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>2.1</strong> The purpose of this Policy is to inform Data Subjects about how Ezee Solutions Processes their Personal Information.
            </p>
            <p className="text-neutral-700">
              <strong>2.2</strong> Ezee Solutions, in its capacity as Responsible Party (and/or Operator, where applicable), shall strive to observe, and comply with its obligations under Data Privacy Laws as well as accepted information protection principles, practices and guidelines when it Processes Personal Information from or in respect of a Data Subject.
            </p>
            <p className="text-neutral-700">
              <strong>2.3</strong> This Policy applies to Personal Information collected by Ezee Solutions in connection with the products and services which Ezee Solutions provides. This includes information collected directly from you as a Data Subject, as well as information we collect indirectly though our service providers who collect your information on our behalf.
            </p>
            <p className="text-neutral-700">
              <strong>2.4</strong> This Privacy Policy does not apply to the information practices of third party companies that Ezee Solutions may engage with in relation to its business operations (including, without limitation, their websites, platforms and/or applications) which we do not own or control; or individuals that Ezee Solutions does not manage or employ. These third party sites may have their own privacy policies and terms and conditions that people will have to comply with.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">3. Process of Collecting Personal Information</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>3.1</strong> Ezee Solutions collects Personal Information directly from Data Subjects as and when required for a defined purpose, unless an exception is applicable (such as, for example, where the Data Subject has made the Personal Information public or the Personal Information is contained in or derived from a public record).
            </p>
            <p className="text-neutral-700">
              <strong>3.2</strong> Ezee Solutions will always collect Personal Information in a fair, lawful and reasonable manner to ensure that it protects the Data Subject's privacy and will Process the Personal Information based on legitimate grounds in a manner that does not adversely affect the Data Subject in question.
            </p>
            <p className="text-neutral-700">
              <strong>3.3</strong> Ezee Solutions often collects Personal Information directly from the Data Subject and/or in some cases, from third parties. Where Ezee Solutions obtains Personal Information from third parties, Ezee Solutions will ensure that it obtains the consent of the Data Subject to do so or will only Process the Personal Information without the Data Subject's consent where Ezee Solutions is permitted to do so in terms of clause 3.1 above or the Data Protection Laws.
            </p>
            <p className="text-neutral-700">
              <strong>3.4</strong> An example of such third parties includes: (i) agencies; (ii) other companies providing services to Ezee Solutions; and (iii) where Ezee Solutions makes use of publicly available sources of information such as the CIPC.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">4. Lawful Processing of Personal Information</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>4.1</strong> Where Ezee Solutions is the Responsible Party, it will only Process a Data Subject's Personal Information (other than for Special Personal Information) where:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>4.1.1</strong> consent of the Data Subject (or a competent person, where the Data Subject is a Child) is obtained;</li>
              <li><strong>4.1.2</strong> Processing is necessary to carry out the actions for conclusion of a contract to which a Data Subject is party;</li>
              <li><strong>4.1.3</strong> Processing complies with an obligation imposed by Data Protection Laws on Ezee Solutions;</li>
              <li><strong>4.1.4</strong> Processing protects a legitimate interest of the Data Subject; and/or</li>
              <li><strong>4.1.5</strong> Processing is necessary for pursuing the legitimate interests of Ezee Solutions or of a third party to whom the information is supplied.</li>
            </ul>
            <p className="text-neutral-700">
              <strong>4.2</strong> Ezee Solutions will only Process Personal Information where one of the legal bases referred to in paragraph 4.1 above are present.
            </p>
            <p className="text-neutral-700">
              <strong>4.3</strong> Ezee Solutions will make the manner and reason for which the Personal Information will be Processed clear to the Data Subject.
            </p>
            <p className="text-neutral-700">
              <strong>4.4</strong> Where Ezee Solutions is relying on a Data Subject's consent as the legal basis for Processing Personal Information, the Data Subject may withdraw his/her/its consent or may object to Ezee Solutions's Processing of the Personal Information at any time. However, this will not affect the lawfulness of any Processing carried out prior to the withdrawal of consent or any Processing justified by any other legal ground provided under Data Privacy Laws.
            </p>
            <p className="text-neutral-700">
              <strong>4.5</strong> If the consent is withdrawn or if there is otherwise a justified objection against the use or the Processing of such Personal Information, Ezee Solutions will ensure that the Personal Information is no longer Processed.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">5. Special Personal Information and Personal Information of Children</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>5.1</strong> Special Personal Information is sensitive Personal Information of a Data Subject and Ezee Solutions acknowledges that it will generally not Process Special Personal Information unless:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>5.1.1</strong> Processing is carried out in accordance with the Data Subject's consent;</li>
              <li><strong>5.1.2</strong> Processing is necessary for the establishment, exercise or defence of a right or obligation in law;</li>
              <li><strong>5.1.3</strong> Processing is for historical, statistical or research purposes, subject to stipulated safeguards;</li>
              <li><strong>5.1.4</strong> information has deliberately been made public by the Data Subject; or</li>
              <li><strong>5.1.5</strong> specific authorisation applies in terms of Data Privacy Laws.</li>
            </ul>
            <p className="text-neutral-700">
              <strong>5.2</strong> Ezee Solutions acknowledges that it may not Process any Personal Information concerning a child and will only do so where it has obtained the consent of the parent or guardian of that child or where it is permitted to do so in accordance with applicable laws.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">6. Purpose for Processing Personal Information</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>6.1</strong> Ezee Solutions understands its obligation to make Data Subjects aware of the fact that it is Processing their Personal Information and inform them of the purpose for which Ezee Solutions Processes such Personal Information.
            </p>
            <p className="text-neutral-700">
              <strong>6.2</strong> Ezee Solutions will only Process a Data Subject's Personal Information for a specific, lawful and clear purpose (or for specific, lawful and clear purposes) and will ensure that it makes the Data Subject aware of such purpose(s) as far as possible.
            </p>
            <p className="text-neutral-700">
              <strong>6.3</strong> It will ensure that there is a legal basis for the Processing of any Personal Information. Further, Ezee Solutions will ensure that Processing will relate only to the purpose for and of which the Data Subject has been made aware (and where relevant, consented to) and will not Process any Personal Information for any other purpose(s).
            </p>
            <p className="text-neutral-700">
              <strong>6.4</strong> Ezee Solutions will generally use Personal Information for purposes required to operate and manage its normal operations and these purposes include one or more of the following non-exhaustive purposes:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>6.4.1</strong> for the purposes of providing services to clients;</li>
              <li><strong>6.4.2</strong> for purposes of onboarding suppliers or service providers as approved suppliers/service providers of Ezee Solutions. For this purpose, Ezee Solutions will also Process a service provider's/supplier\'s Personal Information for purposes of performing the necessary due diligence checks;</li>
              <li><strong>6.4.3</strong> generally for procurement and supply purposes;</li>
              <li><strong>6.4.4</strong> for purposes of monitoring the use of Ezee Solutions' electronic systems and online platforms by Data Subjects. Ezee Solutions will, from time to time, engage third party service providers (who will Process the Data Subject's Personal Information on behalf of Ezee Solutions) to facilitate this;</li>
              <li><strong>6.4.5</strong> for purposes of preventing, discovering and investigating violations of this Policy, the applicable law and other Ezee Solutions policies;</li>
              <li><strong>6.4.6</strong> in connection with the execution of payment processing functions, including payment of Ezee Solutions' suppliers'/service providers' invoices;</li>
              <li><strong>6.4.7</strong> for employment-related purposes such as recruiting staff, administering payroll, background checks, etc.;</li>
              <li><strong>6.4.8</strong> in connection with internal audit purposes (i.e. ensuring that the appropriate internal controls are in place in order to mitigate the relevant risks, as well as to carry out any investigations where this is required);</li>
              <li><strong>6.4.9</strong> in connection with external audit purposes. For this purpose, Ezee Solutions engages external service providers and, in so doing, shares Personal Information of the Data Subjects with third parties;</li>
              <li><strong>6.4.10</strong> for company secretarial related purposes. For this purpose, Ezee Solutions will, from time to time, collect information relating to Data Subjects from third parties such as CIPC;</li>
              <li><strong>6.4.11</strong> for such other purposes to which the Data Subject may consent from time to time;</li>
              <li><strong>6.4.12</strong> for such other purposes as authorised in terms of Data Protection Laws; and</li>
              <li><strong>6.4.13</strong> to comply with any Data Protection Laws or any query from a Regulator.</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">7. Keeping Personal Information Accurate</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>7.1</strong> Ezee Solutions will take reasonable steps to ensure that all Personal Information is kept as accurate, complete and up to date as reasonably possible depending on the purpose for which Personal Information is collected or further Processed.
            </p>
            <p className="text-neutral-700">
              <strong>7.2</strong> Ezee Solutions may not always expressly request the Data Subject to verify and update his/her/its Personal Information unless this process is specifically necessary.
            </p>
            <p className="text-neutral-700">
              <strong>7.3</strong> Ezee Solutions, however, expects that the Data Subject will notify Ezee Solutions from time to time in writing of any updates required in respect of his/her/its Personal Information.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">8. Storage And Processing of Personal Information</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>8.1</strong> Ezee Solutions may store the Data Subject's Personal Information in hard copy format and/or in electronic format using Ezee Solutions' own secure on-site servers or other internally hosted technology. The Data Subject\'s Personal Information may also be stored by third parties, via cloud services or other technology, with whom Ezee Solutions has contracted with, to support Ezee Solutions' operations.
            </p>
            <p className="text-neutral-700">
              <strong>8.2</strong> Ezee Solutions' third party service providers, including data storage and processing providers, may from time to time also have access to a Data Subject's Personal Information in connection with purposes for which the Personal Information was initially collected to be Processed.
            </p>
            <p className="text-neutral-700">
              <strong>8.3</strong> Ezee Solutions will ensure that such third-party service providers will Process the Personal Information in accordance with the provisions of this Policy, all other relevant internal policies and procedures and Data Privacy Laws.
            </p>
            <p className="text-neutral-700">
              <strong>8.4</strong> These Third Parties do not use or have access to the Data Subject's Personal Information other than for purposes specified by Ezee Solutions, and Ezee Solutions requires such parties to employ at least the same level of security that Ezee Solutions uses to protect the Data Subject's Personal Information.
            </p>
            <p className="text-neutral-700">
              <strong>8.5</strong> The Data Subject's Personal Information may be Processed in South Africa or another country where Ezee Solutions, its affiliates and their third-party service providers maintain servers and facilities and Ezee Solutions will take steps, including by way of contracts, to ensure that it continues to be protected, regardless of its location, in a manner consistent with the standards of protection required under applicable law, including Data Privacy Laws.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">9. Personal Information for Direct Marketing Purposes</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>9.1</strong> To the extent that Ezee Solutions acts in its capacity as a direct marketer, it shall strive to observe, and comply with its obligations under Data Privacy Laws when implementing principles and practices in relation to direct marketing.
            </p>
            <p className="text-neutral-700">
              <strong>9.2</strong> Ezee Solutions acknowledges that it may only use Personal Information to contact the Data Subject for purposes of direct marketing from time to time where it is permissible to do so.
            </p>
            <p className="text-neutral-700">
              <strong>9.3</strong> Ezee Solutions may use Personal Information to contact any Data Subject and/or market Ezee Solutions' services directly to the Data Subject(s) if the Data Subject is one of Ezee Solutions\' existing clients, the Data Subject has requested to receive marketing material from Ezee Solutions or Ezee Solutions has the Data Subject's consent to market its services directly to the Data Subject.
            </p>
            <p className="text-neutral-700">
              <strong>9.4</strong> If the Data Subject is an existing client, Ezee Solutions will only use his/her/its Personal Information if it has obtained the Personal Information through the provision of a service to the Data Subject and only in relation to similar services to the ones Ezee Solutions previously provided to the Data Subject.
            </p>
            <p className="text-neutral-700">
              <strong>9.5</strong> Ezee Solutions will ensure that a reasonable opportunity is given to the Data Subject to object to the use of their Personal Information for Ezee Solutions' marketing purposes when collecting the Personal Information and on the occasion of each communication to the Data Subject for purposes of direct marketing.
            </p>
            <p className="text-neutral-700">
              <strong>9.6</strong> Ezee Solutions will not use your Personal Information to send you marketing materials if you have requested not to receive them. If you request that we stop Processing the Data Subject's Personal Information for marketing purposes, Ezee Solutions shall do so.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">10. Retention of Personal Information</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>10.1</strong> Ezee Solutions may keep records of the Personal Information, correspondence, or comments it has collected in an electronic or hard copy file format.
            </p>
            <p className="text-neutral-700">
              <strong>10.2</strong> In terms of Data Privacy Laws, Ezee Solutions may not retain Personal Information for a period longer than is necessary to achieve the purpose for which it was collected or processed and is required to delete, destroy (in such a way that it cannot be reconstructed) or de-identify the information as soon as is reasonably practicable once the purpose has been achieved. This prohibition will not apply in the following circumstances:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>10.2.1</strong> Where the retention of the record is required or authorised by Applicable Laws or by any Regulator;</li>
              <li><strong>10.2.2</strong> Ezee Solutions requires the record to fulfil its lawful functions or activities;</li>
              <li><strong>10.2.3</strong> retention of the record is required by a contract between the parties thereto;</li>
              <li><strong>10.2.4</strong> the Data Subject (or competent person, where the Data Subject is a Child) has consented to such longer retention; or</li>
              <li><strong>10.2.5</strong> the record is retained for historical, research, archival or statistical purposes provided safeguards are put in place to prevent use for any other purpose.</li>
            </ul>
            <p className="text-neutral-700">
              Accordingly, Ezee Solutions will, subject to the exceptions noted in this Policy, retain Personal Information for as long as necessary to fulfil the purposes for which that Personal Information was collected and/or as permitted or required by Data Protection Laws.
            </p>
            <p className="text-neutral-700">
              <strong>10.3</strong> Where Ezee Solutions retains Personal Information for longer periods for statistical, historical, archival or research purposes, Ezee Solutions will ensure that appropriate safeguards have been put in place to ensure that all recorded Personal Information will continue to be Processed in accordance with this Policy and Data Protection Laws.
            </p>
            <p className="text-neutral-700">
              <strong>10.4</strong> Once the purpose for which the Personal Information was initially collected and Processed no longer applies or becomes obsolete, Ezee Solutions will ensure that the Personal Information is deleted, destroyed or de-identified sufficiently so that a person cannot re-identify such Personal Information. In instances where we de-identify the Personal Information, Ezee Solutions may use such de-identified information indefinitely.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">11. Failure to Provide Personal Information</h3>
          <p className="text-neutral-700 mb-4">
            Should Ezee Solutions need to collect Personal Information by Applicable Laws or under its obligations as a service provider, and the Data Subject fails to provide the Personal Information when requested, Ezee Solutions may be unable to perform its duties as a service provider in terms of the Data Protection Laws.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">12. Safe-Keeping of Personal Information</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>12.1</strong> Ezee Solutions shall preserve the security of Personal Information and, in particular, prevent its alteration, loss and damage, or access by non-authorised third parties.
            </p>
            <p className="text-neutral-700">
              <strong>12.2</strong> Ezee Solutions will ensure the security and integrity of Personal Information in its possession or under its control with appropriate, reasonable technical and organisational measures to prevent loss, unlawful access and unauthorised destruction of Personal Information.
            </p>
            <p className="text-neutral-700">
              <strong>12.3</strong> Ezee Solutions has implemented physical, organisational, contractual and technological security measures (having regard to generally accepted information security practices or industry specific requirements or professional rules) to keep all Personal Information secure, including measures protecting any Personal Information from loss or theft, and unauthorised access, disclosure, copying, use or modification. Further, Ezee Solutions maintains and regularly verifies that the security measures are effective and regularly updates same in response to new risks.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">13. Breaches of Personal Information</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>13.1</strong> Ezee Solutions will address any Data Breach in accordance with the terms of Data Privacy Laws.
            </p>
            <p className="text-neutral-700">
              <strong>13.2</strong> Ezee Solutions will notify the Regulator and the affected Data Subject (unless the applicable law or a government authority requires that we delay notification to the Data Subject) in writing in the event of a Data Breach (or a reasonable belief of a Data Breach) in respect of that Data Subject's Personal Information.
            </p>
            <p className="text-neutral-700">
              <strong>13.3</strong> Ezee Solutions will provide such notification as soon as reasonably possible after it has become aware of any Data Breach in respect of such Data Subject's Personal Information.
            </p>
            <p className="text-neutral-700">
              <strong>13.4</strong> Where Ezee Solutions acts as an 'Operator' for purposes of Data Privacy Laws and should any Data Breach affect the data of Data Subjects whose information Ezee Solutions Processes as an Operator, Ezee Solutions shall (in terms of Data Privacy Laws) notify the relevant Responsible Party immediately where there are reasonable grounds to believe that the Personal Information of relevant Data Subjects has been accessed or acquired by any unauthorised person.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">14. Provision of Personal Information to Third Party Service Providers</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>14.1</strong> Ezee Solutions may disclose Personal Information to third parties and will enter into written agreements with such third parties to ensure that they Process any Personal Information in accordance with the provisions of this Policy, and Data Privacy Laws.
            </p>
            <p className="text-neutral-700">
              <strong>14.2</strong> Ezee Solutions notes that such Third Parties may assist Ezee Solutions with the purposes including but not limited to:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>14.2.1</strong> data storage;</li>
              <li><strong>14.2.2</strong> assisting Ezee Solutions with auditing processes (external auditors);</li>
              <li><strong>14.2.3</strong> for providing outsourced services to Ezee Solutions, including in respect of its (i) legal, (ii) data storage requirements and (iii) upskilling of its employees; and/or</li>
              <li><strong>14.2.4</strong> to notify the Data Subjects of any pertinent information concerning Ezee Solutions.</li>
            </ul>
            <p className="text-neutral-700">
              <strong>14.3</strong> Ezee Solutions will disclose Personal Information with the consent of the Data Subject or if Ezee Solutions is permitted to do so without such consent in accordance with Data Protection Laws.
            </p>
            <p className="text-neutral-700">
              <strong>14.4</strong> Further, Ezee Solutions may also send Personal Information to a foreign jurisdiction outside of the Republic of South Africa, including for Processing and storage by third parties.
            </p>
            <p className="text-neutral-700">
              <strong>14.5</strong> When Personal Information is transferred to a jurisdiction outside of the Republic of South Africa including to any cloud, data centre or server located outside of the South Africa, Ezee Solutions will obtain the necessary consent to transfer the Personal Information to such foreign jurisdiction or may transfer the Personal Information where Ezee Solutions is permitted to do so in accordance with the provisions applicable to cross-border flows of Personal Information under Data Privacy Laws.
            </p>
            <p className="text-neutral-700">
              <strong>14.6</strong> The Data Subject should also take note that the Processing of Personal Information in a foreign jurisdiction, if and to the extent such Processing does occur, may be subject to the laws of the country in which the Personal Information is held, and may be subject to disclosure to the governments, courts of law, enforcement or regulatory agencies of such other country, pursuant to the laws of such country.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">15. Access to Personal Information</h3>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>15.1</strong> Data Privacy Laws read with the relevant provisions of the Promotion of Access to Information Act, No. 2 of 2000 ("PAIA") confers certain access rights on Data Subjects.
            </p>
            <p className="text-neutral-700">
              <strong>15.2</strong> Ezee Solutions' PAIA Manual can be found on our website ("PAIA Manual"). These rights include:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-2">
              <li><strong>15.2.1</strong> a right of access: a Data Subject having provided adequate proof of identity has the right to: (i) request a Responsible Party to confirm whether any Personal Information is held about the Data Subject; and/or (ii) request from a Responsible Party a description of the Personal Information held by the Responsible Party including information about Third Parties who have or have had access to the Personal Information. A Data Subject may request:
                <ul className="list-disc list-outside ml-8 mt-2 space-y-1">
                  <li><strong>15.2.1.1</strong> Ezee Solutions to confirm, free of charge, whether it holds any Personal Information about him/her/it; and</li>
                  <li><strong>15.2.1.2</strong> to obtain from Ezee Solutions the record or description of Personal Information concerning him/her/it and any information regarding the recipients or categories of recipients who have or had access to the Personal Information. Such record or description is to be provided: (a) within a reasonable time; and (b) in a reasonable manner and format and in a form that is generally understandable.</li>
                </ul>
              </li>
              <li><strong>15.2.2</strong> a right to request correction or deletion: a Data Subject may also request Ezee Solutions to:
                <ul className="list-disc list-outside ml-8 mt-2 space-y-1">
                  <li><strong>15.2.2.1</strong> correct or delete Personal Information about the Data Subject in its possession or under its control that is inaccurate, irrelevant, excessive, out of date, incomplete, misleading or obtained unlawfully; or</li>
                  <li><strong>15.2.2.2</strong> destroy or delete a record of Personal Information about the Data Subject that Ezee Solutions is no longer authorised to retain records in terms of Data Privacy Laws' retention and restriction of records provisions.</li>
                </ul>
                <p className="mt-2">On receipt of such a request, Ezee Solutions is required to, as soon as is reasonably practicable; (a) correct the information; (b) delete or destroy the information; (c) provide the Data Subject with evidence in support of the information; or (d) where the Data Subject and Responsible Party cannot reach agreement on the request and if the Data Subject requests this, Ezee Solutions will take reasonable steps to attach to the information an indication that correction has been requested but has not been made;</p>
              </li>
              <li><strong>15.2.3</strong> a Data Subject that has previously consented to the Processing of his/her/its Personal Information has the right to withdraw such consent and may do so by providing Ezee Solutions with notice to such effect. Further, a Data Subject may object, on reasonable grounds, to the Processing of Personal Information relating to him/her/it.</li>
            </ul>
            <p className="text-neutral-700">
              <strong>15.3</strong> Accordingly, Ezee Solutions may request the Data Subject to provide sufficient identification to permit access to, or provide information regarding the existence, use or disclosure of the Data Subject's Personal Information. Any such identifying information shall only be used for the purpose of facilitating access to or information regarding the Personal Information.
            </p>
            <p className="text-neutral-700">
              <strong>15.4</strong> The Data Subject can request in writing to review any Personal Information about the Data Subject that Ezee Solutions holds including Personal Information that Ezee Solutions has collected, utilised or disclosed.
            </p>
            <p className="text-neutral-700">
              <strong>15.5</strong> Ezee Solutions shall respond to these requests in accordance with Data Privacy Laws and PAIA and provide the Data Subject with any such Personal Information to the extent required by law and any of Ezee Solutions' policies and procedures which apply in terms of the PAIA.
            </p>
            <p className="text-neutral-700">
              <strong>15.6</strong> The Data Subject can challenge the accuracy or completeness of his/her/its Personal Information in Ezee Solutions' records at any time in accordance with the process set out in the PAIA Manual for accessing information.
            </p>
            <p className="text-neutral-700">
              <strong>15.7</strong> If a Data Subject successfully demonstrates that their Personal Information in Ezee Solutions' records is inaccurate or incomplete, Ezee Solutions will ensure that such Personal Information is amended or deleted as required (including by any third parties).
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">16. Responses</h3>
          <p className="text-neutral-700 mb-4">
            Ezee Solutions will respond to each written request of a Data Subject not later than 30 (thirty) days after receipt of such requests. Under certain circumstances, Ezee Solutions may, however, extend the original period of 30 days once for a further period of not more than 30 (thirty) days.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-neutral-900 mb-3">17. Ezee Solutions Privacy Information Officer</h3>
          <p className="text-neutral-700 mb-4">
            Ezee Solutions has appointed a dedicated Privacy Information Officer who is responsible for the Processing and protection of Personal Information.
          </p>
          <div className="bg-neutral-50 p-4 rounded-lg">
            <p className="text-neutral-700 mb-2"><strong>Name:</strong> Daniel Katz</p>
            <p className="text-neutral-700 mb-2"><strong>Phone Number:</strong> +27 (21) 879-5074</p>
            <p className="text-neutral-700"><strong>Email Address:</strong> compliance@ezeebit.com</p>
          </div>
        </section>
      </div>
    </div>
  )

  const renderCompliance = () => (
    <div className="space-y-8">
      <div>
        <h2 className="!text-2xl font-bold text-neutral-900 mb-4">Regulatory Compliance</h2>
        <p className="text-neutral-600 mb-8">
          Ezeebit operates under full regulatory compliance with South African financial authorities. 
          We maintain the highest standards of regulatory adherence to ensure safe and legal operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {complianceItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-neutral-950 rounded-xl flex items-center justify-center text-primary-400">
                {item.icon}
              </div>
              <span className="bg-success-100 text-success-700 px-2 py-1 rounded-full text-xs font-medium">
                {item.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
            <p className="text-neutral-600 mb-3">{item.description}</p>
            <p className="text-sm text-neutral-500 font-mono">{item.number}</p>
          </motion.div>
        ))}
      </div>

      {/* Trust Centre */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-8 border border-primary-100 bg-primary-50/50 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">Trust Centre</h3>
          <p className="text-neutral-600 text-sm leading-relaxed">
            View Ezeebit's security posture, compliance certifications, and data protection controls — powered by Vanta.
          </p>
        </div>
        <a
          href="https://trust.ezeebit.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary whitespace-nowrap shrink-0"
        >
          Visit Trust Centre
        </a>
      </motion.div>

    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'terms':
        return renderTermsOfService()
      case 'privacy':
        return renderPrivacyPolicy()
      case 'compliance':
        return renderCompliance()
      default:
        return renderTermsOfService()
    }
  }

  return (
    <>
      <SEO
        title="Legal: terms, privacy, and compliance"
        description="Terms of use, privacy policy and compliance information for Ezeebit, operated by Ezee Solutions Group (Pty) Ltd."
        canonicalUrl="/resources/legal"
        crumbs={[{ name: 'Legal', path: '/resources/legal' }]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="overflow-hidden"
    >
      {/* Hero Section */}
      <section className="section-padding gradient-bg pt-32 md:pt-28">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Legal & <span className="text-gradient">compliance</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Transparent legal documentation and regulatory compliance information. 
              We operate with full transparency and adherence to South African financial regulations.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-neutral-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>FSCA Regulated</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2" />
                <span>FIC Compliant</span>
              </div>
              <div className="flex items-center">
                <Scale className="w-4 h-4 mr-2" />
                <span>FAIS Regulated</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Navigation */}
      <section className="bg-white border-b border-neutral-200 sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {legalSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {section.icon}
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding relative overflow-hidden bg-neutral-950 text-white">
        <DarkBackdrop glow="left" />
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Questions about our legal terms?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-neutral-300">
              Our legal team is available to answer any questions about our terms,
              privacy policy, or compliance requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className={HERO_PRIMARY}>
                Contact legal team
              </Link>
              <a href="mailto:legal@ezeebit.com" className={HERO_SECONDARY}>
                Email: legal@ezeebit.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
    </>
  )
}

export default Legal