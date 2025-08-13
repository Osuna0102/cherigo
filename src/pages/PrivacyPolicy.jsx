import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="w-full min-h-screen p-2 sm:p-4" style={{ backgroundImage: "url('/assets/bg-trans.png')", backgroundSize: 'cover'}}>
      <div className="max-w-[1200px] mx-auto min-h-screen flex flex-col">
        {/* Back Button */}
        <div className="flex items-start mb-4 sm:mb-8">
          <button
            onClick={() => window.history.back()}
            className="bg-[#ecc236] text-white rounded-full hover:bg-[#eb8194] transition-colors duration-300"
          >
            <img src='/assets/back.png' alt='back' className='h-6 sm:h-8'/>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-[#fff6e1] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border-4 border-[#f66d76] flex-grow">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f66d76] text-center font-[Dynapuff] mb-8">
            Privacy Policy
          </h1>
          
          <div className="space-y-6 text-[#333] font-[Dynapuff]">
            {/* Introduction */}
            <section>
              <p className="text-lg leading-relaxed">
                CheriGo values your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or make a purchase.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Information We Collect</h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <div>
                    <strong>Personal Information:</strong> Name, email address, phone number, billing and shipping address, and payment details.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <div>
                    <strong>Order Information:</strong> Details of products you've purchased, order history, and preferences.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <div>
                    <strong>Usage Data:</strong> Your IP address, browser type, device information, pages visited, and time spent on the site.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <div>
                    <strong>Communication Data:</strong> Records of your communications with us, including customer service interactions.
                  </div>
                </li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">How We Use Your Information</h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Process and deliver your orders efficiently</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Communicate with you about your purchases, inquiries, or account</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Improve our website, products, and customer experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Send you updates, promotions, or news (only with your consent)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Prevent fraud and enhance security</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Comply with legal obligations</span>
                </li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Information Sharing</h2>
              <p className="mb-3">
                We do not sell, rent, or trade your personal information to third parties. We only share information with:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Trusted third-party services (e.g., payment processors, shipping carriers, analytics providers) necessary for fulfilling your order</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Legal authorities, only when required by law or to protect our rights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Service providers who help us operate our business under strict confidentiality agreements</span>
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Data Security</h2>
              <p>
                We take reasonable and appropriate steps to protect your personal information through secure technologies, encryption, and industry-standard best practices. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can disable cookies in your browser settings, but some site features may not function properly. We may also use analytics tools to understand how users interact with our website.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. When data is no longer needed, we securely delete or anonymize it.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Access and review your personal information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Request corrections to inaccurate information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Request deletion of your personal data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Opt-out of marketing communications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Data portability (receive your data in a structured format)</span>
                </li>
              </ul>
            </section>

            {/* Updates to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-[#f9f9f9] p-6 rounded-2xl border-2 border-[#c0d763]">
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please reach out to us:
              </p>
              <div className="space-y-2">
                <p><strong>CheriGo</strong></p>
                <p>Email: <a href="mailto:cherigo715@gmail.com" className="text-[#c0d763] hover:underline">cherigo715@gmail.com</a></p>
                <p>Instagram: <a href="https://instagram.com/cherig0" target="_blank" rel="noopener noreferrer" className="text-[#c0d763] hover:underline">@cherig0</a></p>
              </div>
            </section>

            {/* Last Updated */}
            <div className="text-center text-sm text-gray-600 mt-8 pt-4 border-t border-[#c0d763]">
              <p>Last Updated: August 7, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
