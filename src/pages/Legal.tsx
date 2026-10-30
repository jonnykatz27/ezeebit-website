import { useState, useEffect } from 'react'
import { motion } from '../lib/motion'
import { Link, useLocation } from 'react-router-dom'
import {
  Shield, FileText, Eye, Scale, Award
} from 'lucide-react'
import SEO from '../components/SEO'
import DarkBackdrop from '../components/DarkBackdrop'

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
    { id: 'terms', name: 'Terms of Service', icon: <FileText className="w-5 h-5" /> },
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

  const renderTermsOfService = () => (
    <div className="max-w-none">
      <h3 className="text-2xl font-bold text-neutral-900 mb-4">Terms of Service</h3>
      <p className="text-neutral-600 mb-6">Last updated: January 1, 2024</p>
      
      <div className="space-y-6">
        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">1. Acceptance of Terms</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>1.1</strong> By using the website located on https://www.ezeebit.com together with all its webpages (the "Website") whether as a visitor or a registered user for any reason whatsoever, the visitor or use of the Website (hereinafter referred to as "you\" or \"your") agrees to be bound by and comply with the terms and conditions that se terms and conditions ("Terms and Conditions") agrees to be bound by and comply with these terms and conditions ("Terms and Conditions").
            </p>
            <p className="text-neutral-700">
              <strong>1.2</strong> If you do not agree with these Terms and Conditions, you must immediately desist from further use of the Website. Your continued use of the Website, notwithstanding the provisions of this clause, constitutes substantive agreement with the terms and conditions setout in these Terms and Conditions, as may be amended from time to time.
            </p>
            <p className="text-neutral-700">
              <strong>1.3</strong> The Website is owned and operated by Ezee Solutions. Ezee Solutions Group (Proprietary) Limited, a company registered in terms of South African law with registration number: 2022/250578/07, domiciled on 135 Beach Road Mouille Point, Cape Town, Western Cape, 8005 (hereinafter referred to as "Ezee Solutions", "us", "we\" or \"our").
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">2. Term, Accessibility and Termination</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>2.1</strong> These Terms and Conditions shall commence from the date on which they are published on the Website and continue indefinitely, as amended by Ezee Solutions from time to time.
            </p>
            <p className="text-neutral-700">
              <strong>2.2</strong> Ezee Solutions reserves the right to:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>2.2.1</strong> change or to discontinue any aspect or feature of the Website at any time including, but not limited to content, availability and access requirements; and</li>
              <li><strong>2.2.2</strong> amend or terminate these Terms and Conditions and/or shutdown the Website at any time.</li>
            </ul>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">3. Notice</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>3.1</strong> These Terms and Conditions contain provisions which appear in a similar text style to this clause in order to draw your attention to such clauses because they:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>3.1.1</strong> may limit the risk or liability of Ezee Solutions or a third party; and/or</li>
              <li><strong>3.1.2</strong> may create risk or liability for you; and/or</li>
              <li><strong>3.1.3</strong> may compel you to indemnify Ezee Solutions or a third party; and/or</li>
              <li><strong>3.1.4</strong> serve as an acknowledgement, by you, of a fact.</li>
            </ul>
            <p className="text-neutral-700">
              <strong>3.2</strong> If there is any provision in these Terms and Conditions that you do not understand, it is your responsibility to ask Ezee Solutions to explain it to you before you accept the Terms and Conditions or continue using the Website.
            </p>
            <p className="text-neutral-700">
              <strong>3.3</strong> These Terms and Conditions apply to users who are consumers for purposes of the Consumer Protection Act, 68 of 2008 (the "CPA").
            </p>
            <p className="text-neutral-700">
              <strong>3.4</strong> Nothing in these Terms and Conditions is intended or must be understood to unlawfully restrict, limit or avoid any right or obligation, as the case may be, created for either you or Ezee Solutions in terms of the CPA.
            </p>
            <p className="text-neutral-700">
              <strong>3.5</strong> Ezee Solutions permits the use of this Website subject to the Terms and Conditions. By using this Website in any way, you shall be deemed to have accepted all the Terms and Conditions unconditionally. You must not use this Website or any part thereof if you do not agree to the Terms and Conditions.
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">4. Use of the Website</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>4.1</strong> You may only use the Website for lawful purposes and you warrant that you shall not use the Website:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>4.1.1</strong> to receive or transmit material which is in violation of any law or regulation, which is obscene, threatening, racist, menacing, offensive, defamatory, in breach of confidence, in breach of any intellectual property rights, or otherwise objectionable or unlawful;</li>
              <li><strong>4.1.2</strong> for the transmission of "junk mail", "spam", "chain letters", or unsolicited mass distribution of SMS;</li>
              <li><strong>4.1.3</strong> other than for your personal and non-commercial use.</li>
            </ul>
            <p className="text-neutral-700">
              <strong>4.2</strong> You agree that you will not in any way use any device, software or other instrument to interfere or attempt to interfere with the proper working of the Website. In addition, you agree that you will not in any way use any robot, spider, other automatic device, or manual process to monitor, copy, distribute or modify the Website or the information contained herein, without the prior written consent from an authorised Ezee Solutions representative (such consent is deemed given for standard search engine technology employed by Internet search websites to direct Internet users to this Website).
            </p>
            <p className="text-neutral-700">
              <strong>4.3</strong> You may not in any way display, publish, copy, print, post or otherwise use the Website and/or the information contained therein without the express prior written consent of an authorised Ezee Solutions representative.
            </p>
            <p className="text-neutral-700">
              <strong>4.4</strong> You remain personally liable for the consequences of any contravention of these provisions and/or failure to comply with law and hereby indemnify and hold Ezee Solutions harmless against any losses and/or damages, whether direct and/or indirect, which you may suffer as a result of a contravention of these provisions.
            </p>
            <p className="text-neutral-700">
              <strong>4.5</strong> Should you become aware of any unacceptable use of the Ezee Solutions Website or related email functionality, please contact compliance@pundixsa.co.za.
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">5. Disclaimer</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>5.1</strong> Whilst every effort has been made by Ezee Solutions and its suppliers of information, to ensure the proper performance of the Website, the accuracy of the information/images and the reliability of the binary data on the Website, Ezee Solutions, its affiliated companies, suppliers, or any of their employees, do not, to the full extent permitted by law, guarantee the availability or accuracy of the services, content and/or information offered on the Website.
            </p>
            <p className="text-neutral-700">
              <strong>5.2</strong> Ezee Solutions makes no representations or warranties, whether express or implied, and assumes no liability or responsibility for the proper performance of the Website and you thus use the Website at your own risk. In particular Ezee Solutions makes no warranty that the Website will meet your requirements, be uninterrupted, complete, timely, secure or error free.
            </p>
            <p className="text-neutral-700">
              <strong>5.3</strong> Ezee Solutions disclaims liability for any damage, loss or expenses, whether direct, indirect or consequential in nature, arising out of or in connection with your access to or use of the Website and/or any content therein unless otherwise provided by law.
            </p>
            <p className="text-neutral-700">
              <strong>5.4</strong> The Website and all information provided on the Website is provided "as is" without warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, completeness, or non-infringement, as may be allowed in law.
            </p>
            <p className="text-neutral-700">
              <strong>5.5</strong> Any views or statements made or expressed on the Website are not necessarily the views of Ezee Solutions, its directors, employees and/or agents.
            </p>
            <p className="text-neutral-700">
              <strong>5.6</strong> In addition to the disclaimers contained elsewhere in these Terms and Conditions, Ezee Solutions also makes no warranty or representation, whether express or implied, that the information or files available on the Website are free of viruses, spyware, malware, Trojans, destructive materials or any other data or code which is able to corrupt, destroy, compromise, disrupt, disable, harm, jeopardise or otherwise impede in any manner the operation, stability, security functionality or content of your computer system, computer network, hardware or software in any way. You accept all risk associated with the existence of such viruses, destructive materials or any other data or code which is able to corrupt, compromise, jeopardise, disrupt, disable, harm or otherwise impede in any manner the operation or content of a computer system, computer network, any handset or mobile device, or your hardware or software, save where such risks arise due to the gross negligence or wilful misconduct of Ezee Solutions, its employees, agents or authorised representatives. Ezee Solutions thus disclaims all liability for any damage, loss or liability of any nature whatsoever arising out of or in connection with your access to or use of the Website.
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">6. Third Party Content/Websites</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>6.1</strong> Third party information such as but not limited to, product catalogues, product description and specifications, lists of dealers, reports on news, entertainment, technology and features, advertisements including videos, images and photographs of the products, links to third party websites and other data from external sources is made available on the Website ("Third-Party Content"). The provision of Third-Party Content is for general informational purposes only.
            </p>
            <p className="text-neutral-700">
              <strong>6.2</strong> You hereby acknowledge that the Third-Party Content provided to you is obtained from sources believed to be reliable or provided by the sellers in the process of advertising, exhibiting and offering to sell the products on the Website. All Third-Party Content is provided on an 'As Is' basis. Ezee Solutions does not own / have the rights and title to any such Third-Party Content, Ezee Solutions does not provide any guarantee or make any representations with regards to the accuracy, title, merchantability, non-infringement or fitness for a particular purpose of any Third-Party Content. Ezee Solutions shall not be held liable for any loss suffered by you in any way whatsoever based on your reliance on or use of such Third-Party Content.
            </p>
            <p className="text-neutral-700">
              <strong>6.3</strong> This Website may contain links or references to other websites ("Third Party Websites") which are outside of our control, including those of advertisers. These Terms and Conditions do not apply to those Third-Party Websites and Ezee Solutions is not responsible for the practices and/or privacy policies of those Third-Party Websites or the "cookies\" that those sites may use.
            </p>
            <p className="text-neutral-700">
              <strong>6.4</strong> In the event any Third-Party Content contains links to Third Party Websites, and you visit any such external link, you agree to do so at your own risk, responsibility and liability. Ezee Solutions makes no warranty or representation regarding, and does not endorse, any website linked to the Website or the information appearing thereon or any of the products or services described thereon.
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">7. Password and/or One Time PIN</h4>
          <p className="text-neutral-700 mb-4">
            If you have a password or One Time PIN (OTP) for using the Website, you undertake to keep it secure and warrant that no other person shall use the Website utilising your password or OTP, and you acknowledge further that you are responsible for ensuring that no unauthorised access to the Website is obtained using your password or OTP, and that you will be liable for all such activities conducted pursuant to such use, whether authorised or not.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">8. Intellectual Property Rights</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>8.1</strong> The contents of the Website, including any material, information, data, software, icons, text, graphics, lay-outs, images, sound clips, advertisements, video clips, trade names, the word or mark "Ezee Solutions Group", logos, trade-marks, designs and service marks which are displayed on or incorporated in this Website ("Intellectual Property") are protected by law, including but not limited to copyright and trade mark law. The Intellectual Property is the property of Ezee Solutions, its advertisers and/or sponsors and/or is licensed to Ezee Solutions.
            </p>
            <p className="text-neutral-700">
              <strong>8.2</strong> You will not acquire any right, title or interest in or to the Website or the Intellectual Property.
            </p>
            <p className="text-neutral-700">
              <strong>8.3</strong> You may not in any form or by any means, without the prior written consent of Ezee Solutions:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>8.3.1</strong> commercially process, exploit, reproduce, distribute, display, transmit, publish or broadcast any Intellectual Property;</li>
              <li><strong>8.3.2</strong> claim ownership of all or any part of the Intellectual Property;</li>
              <li><strong>8.3.3</strong> modify or repost the Intellectual Property;</li>
              <li><strong>8.3.4</strong> create a link to the Website from another website; or</li>
              <li><strong>8.3.5</strong> copy, incorporate, store, frame or embed all or any part of the Intellectual Property on another website or retrieval system.</li>
            </ul>
            <p className="text-neutral-700">
              <strong>8.4</strong> Any use, distribution or reproduction of the Intellectual Property is prohibited unless expressly authorised in terms of these Terms and Conditions or otherwise provided for in law.
            </p>
            <p className="text-neutral-700">
              <strong>8.5</strong> Where any of the Intellectual Property has been licensed to Ezee Solutions or belongs to any third party, your rights of use will also be subject to any terms and conditions which that licensor or third party imposes from time to time and you agree to comply with such third-party terms and conditions.
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">9. Protection of Personal Information</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>9.1</strong> You hereby acknowledge that these terms and Conditions are subject to the Ezee Solutions Privacy Policy on [www.pundixsa.co.za/privacy-policy] (the "Privacy Policy").
            </p>
            <p className="text-neutral-700">
              <strong>9.2</strong> The Privacy Policy is incorporated by reference into these Terms and Conditions and by using the Website you acknowledge that you have reviewed and accepted our Privacy Policy.
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">10. Electronic Communications</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              All electronic communications, including any attachments thereto that are transmitted to you by Ezee Solutions, shall be on the following terms and conditions:
            </p>
            <p className="text-neutral-700">
              <strong>10.1</strong> When you visit the Website or send e-mails to Ezee Solutions, you consent to receiving communications from Ezee Solutions electronically and agree that all agreements, notices, disclosures and other communications sent by Ezee Solutions satisfy any legal requirements, including but not limited to the requirement that such communications should be "in writing".
            </p>
            <p className="text-neutral-700">
              <strong>10.2</strong> Before any purported agreement, that has been negotiated either wholly or partly by electronic means shall be considered binding on Ezee Solutions, the following terms and conditions shall apply:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>10.2.1</strong> An advanced electronic signature, (as defined in the Electronic Communications and Transactions Act 25 of 2002), of a duly authorized member of the Board of Directors of Ezee Solutions shall be required to be used and attached to any electronic communication containing any offer and/or acceptance by Ezee Solutions, as the case may be.</li>
              <li><strong>10.2.2</strong> Where Ezee Solutions is acting as the offeror, the agreement shall be deemed to have been concluded at the time when and place where the acceptance of the offer was actually received by an Ezee Solutions representative, and upon such Ezee Solutions representative acknowledging receipt of such acceptance.</li>
              <li><strong>10.2.3</strong> Any electronic communications shall be considered to have been sent by a Director as aforesaid only if:
                <ul className="list-disc list-outside ml-8 space-y-1">
                  <li><strong>10.2.3.1</strong> an Ezee Solutions representative sent it personally; or</li>
                  <li><strong>10.2.3.2</strong> it was sent by a person who had the required authority to act on behalf of Ezee Solutions.</li>
                </ul>
              </li>
            </ul>
            <p className="text-neutral-700">
              <strong>10.3</strong> Ezee Solutions is not responsible for the proper and/or complete transmission of the information contained in the electronic communication or of the electronic communication itself nor in any delay in its receipt.
            </p>
            <p className="text-neutral-700">
              <strong>10.4</strong> You will always have the choice to:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>10.4.1</strong> inform us in writing that you do not wish to continue receiving communications, or;</li>
              <li><strong>10.4.2</strong> block any communications by registering on the Do Not Contact Registry as contemplated in the CPA.</li>
            </ul>
            <p className="text-neutral-700">
              <strong>10.5</strong> Whilst Ezee Solutions does employ virus filtering; it provides no guarantees or warrantees that the electronic communication is virus-free.
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">11. Cookies</h4>
          <p className="text-neutral-700 mb-4">
            Ezee Solutions may store some information (commonly known as a "cookie") on your computer when you visit the Website. This enables Ezee Solutions to recognise you during subsequent visits. The type of information gathered is non-personal (such as: the IP address of your computer, the date and time of your visit, which pages you browsed and whether the pages have been delivered successfully. Apart from merely establishing basic connectivity and communications, Ezee Solutions may also use this data in aggregate form to develop customised services - tailored to your individual interests and needs. Should you choose to do so, it is possible (depending on the browser you are using), to be prompted before accepting any cookies, or to prevent your browser from accepting any cookies at all. This will however cause certain features of the web site not to be accessible.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">12. Security</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>12.1</strong> Any person that delivers or attempts to deliver any damaging code to this Website or attempts to gain unauthorised access to any page on this Website shall be prosecuted and civil damages shall be claimed in the event that Ezee Solutions suffers any damage or loss.
            </p>
            <p className="text-neutral-700">
              <strong>12.2</strong> You authorise Ezee Solutions to take all reasonable steps to ensure the integrity and security of the Website and back-office applications. All credit card transactions are Secure Socket Layers encrypted Ezee Solutions's registration documents and the Website's registered domain name are checked and verified.
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">13. Indemnification</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>13.1</strong> To the fullest extent permissible in law, you hereby unconditionally, irrevocably and unreservedly indemnify and hold Ezee Solutions, its public officers, directors, employees, consultants, agents, licensors and service providers, harmless against all loss, damages, claims, liability and/or costs, of whatsoever nature, howsoever and whenever arising, as a result of and without limitation, the following:
            </p>
            <ul className="list-disc list-outside text-neutral-700 ml-8 space-y-1">
              <li><strong>13.1.1</strong> visiting or using the Ezee Solutions Website;</li>
              <li><strong>13.1.2</strong> downloading data, text, images;</li>
              <li><strong>13.1.3</strong> reliance on the Website content;</li>
              <li><strong>13.1.4</strong> links to other Ezee Solutions or third-party websites;</li>
              <li><strong>13.1.5</strong> hardware, software, system or network malfunction;</li>
              <li><strong>13.1.6</strong> any purchases of Ezee Solutions service offerings made on the Website;</li>
              <li><strong>13.1.7</strong> any breach of the terms of these Terms and Conditions by you; or</li>
              <li><strong>13.1.8</strong> any other cause whatsoever arising from or relating to visiting or using the Website.</li>
            </ul>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">14. Limitation of Liability</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>14.1</strong> Ezee Solutions cannot be held liable for any inaccurate information published on the Website and/or any incorrect prices displayed on the Website, save where such liability arises from the gross negligence or wilful misconduct of Ezee Solutions, its employees, agents or authorised representatives.
            </p>
            <p className="text-neutral-700">
              <strong>14.2</strong> Ezee Solutions shall not be liable for any direct, indirect, incidental, special or consequential loss or damages which might arise from your use of, or reliance upon, the Website or the content contained in the Website; or your inability to use the Website, and/or unlawful activity on the Website and/or any linked Third-Party Website.
            </p>
            <p className="text-neutral-700">
              <strong>14.3</strong> You hereby indemnify Ezee Solutions against any loss, claim or damage which may be suffered by yourself or any third party arising in any way from your use of this Website and/or any linked Third-Party Website.
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">15. Monitoring, Interception and Access to Information</h4>
          <p className="text-neutral-700 mb-4">
            To comply with law and in line with international standards and best practice relating to the use of information technology in its business, Ezee Solutions may at its discretion, monitor and/or intercept, live communications such as email and website activity in compliance with the Regulation of Interception of Communications and Provision of Communication-related Information Act, 70 of 2002.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">16. Complaints and Notices</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>16.1</strong> You agree to submit all complaints relating to these Terms and Conditions to Ezee Solutions first in order to afford us an opportunity to resolve the complaint within a reasonable period before you proceed to refer any formal complaints to any relevant authority.
            </p>
            <p className="text-neutral-700">
              <strong>16.2</strong> Ezee Solutions chooses as its address at which it will receive all correspondence or legal notices for all purposes under these Terms and Conditions, whether in respect of court process, notice, or other documents or communication of whatsoever nature, the following address: In this regard, please direct all complaints to: Physical and postal address: 135 Beach Road Mouille Point, Cape Town, Western Cape, 8005 e-mail: compliance@pundixsa.co.za.
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">17. Governing Law and Jurisdiction</h4>
          <p className="text-neutral-700 mb-4">
            This Website is hosted, controlled and operated from the Republic of South Africa and therefore governed by South African law and you submit to the jurisdiction of the South African courts.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">18. General</h4>
          <div className="space-y-3">
            <p className="text-neutral-700">
              <strong>18.1</strong> These Terms and Conditions are severable, in that if any provision is determined to be illegal or unenforceable by any court of competent jurisdiction, then such provision shall be deemed to have been deleted without affecting the remaining provisions of the Terms and Conditions unless such invalidity, un-enforceability or illegality goes to the root of these Terms and Conditions.
            </p>
            <p className="text-neutral-700">
              <strong>18.2</strong> Ezee Solutions' failure to exercise any particular rights or provision of these terms and conditions shall not constitute a waiver of such right or provision, unless acknowledged and agreed to by us in writing.
            </p>
            <p className="text-neutral-700">
              <strong>18.3</strong> You may not cede, assign or otherwise transfer your rights and obligations in terms of these Terms and Conditions to any third party.
            </p>
            <p className="text-neutral-700">
              <strong>18.4</strong> No indulgence, extension of time, relaxation or latitude which any party (the "grantor") may show grant or allow to the other (the "grantee") shall constitute a waiver by the grantor of any of the grantor's rights and the grantor shall not thereby be prejudiced or stopped from exercising any of its rights against the grantee which may have arisen in the past or which might arise in the future.
            </p>
            <p className="text-neutral-700">
              <strong>18.5</strong> These Terms and Conditions contain the whole agreement between you and Ezee Solutions and no other warranty or undertaking is valid, unless contained in these Terms and Conditions.
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">19. Ezee Solutions Information</h4>
          <div className="bg-neutral-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Company Name:</strong> Ezee Solutions Group (Proprietary) Limited</p>
                <p><strong>Legal Status:</strong> Private Company</p>
                <p><strong>Registration Number:</strong> 2022/250578/07</p>
                <p><strong>Place of Registration:</strong> Republic of South Africa</p>
              </div>
              <div>
                <p><strong>Phone:</strong> +27 (21) 879-5074</p>
                <p><strong>Website:</strong> https://www.ezeebit.com</p>
                <p><strong>Email:</strong> compliance@ezeebit.com</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )

  const renderPrivacyPolicy = () => (
    <div className="max-w-none">
      <h3 className="text-2xl font-bold text-neutral-900 mb-4">Privacy Policy</h3>
      <p className="text-neutral-600 mb-6">Last updated: January 1, 2024</p>
      
      <div className="space-y-6">
        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">1. Definitions</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">2. Purpose of the Policy</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">3. Process of Collecting Personal Information</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">4. Lawful Processing of Personal Information</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">5. Special Personal Information and Personal Information of Children</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">6. Purpose for Processing Personal Information</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">7. Keeping Personal Information Accurate</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">8. Storage And Processing of Personal Information</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">9. Personal Information for Direct Marketing Purposes</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">10. Retention of Personal Information</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">11. Failure to Provide Personal Information</h4>
          <p className="text-neutral-700 mb-4">
            Should Ezee Solutions need to collect Personal Information by Applicable Laws or under its obligations as a service provider, and the Data Subject fails to provide the Personal Information when requested, Ezee Solutions may be unable to perform its duties as a service provider in terms of the Data Protection Laws.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">12. Safe-Keeping of Personal Information</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">13. Breaches of Personal Information</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">14. Provision of Personal Information to Third Party Service Providers</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">15. Access to Personal Information</h4>
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
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">16. Responses</h4>
          <p className="text-neutral-700 mb-4">
            Ezee Solutions will respond to each written request of a Data Subject not later than 30 (thirty) days after receipt of such requests. Under certain circumstances, Ezee Solutions may, however, extend the original period of 30 days once for a further period of not more than 30 (thirty) days.
          </p>
        </section>

        <section>
          <h4 className="text-xl font-semibold text-neutral-900 mb-3">17. Ezee Solutions Privacy Information Officer</h4>
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
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Regulatory Compliance</h3>
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
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center text-secondary-600">
                {item.icon}
              </div>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                {item.status}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h4>
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
          <h4 className="text-lg font-semibold text-neutral-900 mb-1">Trust Centre</h4>
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
        title="Legal"
        description="Terms of service, privacy policy and compliance information for Ezeebit, operated by Ezee Solutions Group (Pty) Ltd."
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
              <Link to="/contact" className="bg-primary-500 text-white hover:bg-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
                Contact Legal Team
              </Link>
              <a href="mailto:legal@ezeebit.com" className="border border-white/20 text-white hover:border-white/40 hover:bg-white/5 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center">
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