import React from 'react';

const TermsConditions = () => {
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
            Terms & Conditions
          </h1>
          
          <div className="space-y-6 text-[#333] font-[Dynapuff]">
            {/* Introduction */}
            <section>
              <p className="text-lg leading-relaxed">
                Welcome to CheriGo! These Terms and Conditions govern your use of our website and purchase of products from our store. By accessing our site or placing an order, you agree to be bound by these terms.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Acceptance of Terms</h2>
              <p>
                By using our website, making a purchase, or accessing our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or services.
              </p>
            </section>

            {/* Products and Pricing */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Products and Pricing</h2>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>All products are subject to availability and we reserve the right to discontinue any product at any time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Colors and appearance may vary slightly from what appears on your screen due to monitor settings and lighting conditions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Prices are subject to change without prior notice</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>We reserve the right to limit quantities per customer or refuse service to anyone</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>All prices are displayed in USD and include applicable taxes where required</span>
                </li>
              </ul>
            </section>

            {/* Orders and Payments */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Orders and Payments</h2>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>All orders are subject to acceptance and product availability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Payment must be made in full at the time of checkout</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>We accept major credit/debit cards, FPX, and PayPal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>We reserve the right to refuse or cancel orders for any reason, including suspected fraudulent activity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Order confirmation does not guarantee product availability; we will notify you if any items are unavailable</span>
                </li>
              </ul>
            </section>

            {/* Shipping and Delivery */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Shipping and Delivery</h2>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Shipping times are estimates only and may vary based on location and external factors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>We are not responsible for delays caused by third-party courier services, customs, weather, or other circumstances beyond our control</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Shipping costs are calculated at checkout and may vary by destination and order size</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>International customers are responsible for any customs duties, taxes, or fees imposed by their country</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Please ensure shipping addresses are accurate; we are not responsible for packages delivered to incorrect addresses provided by the customer</span>
                </li>
              </ul>
            </section>

            {/* Returns and Exchanges */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Returns and Exchanges</h2>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Returns and exchanges are only accepted if the item is defective, damaged during shipping, or incorrect</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Return/exchange requests must be made within 7 days of receiving your order</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Customer must provide proof (photo/video evidence) for defect or damage claims</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Items must be in original condition, unused, and in original packaging</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Custom or made-to-order items cannot be returned unless defective</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Return shipping costs are the responsibility of the customer unless the return is due to our error</span>
                </li>
              </ul>
            </section>

            {/* Cancellations */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Order Cancellations</h2>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Orders may only be cancelled within 1 hour of placing them</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Custom or made-to-order items cannot be cancelled once production has started</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Cancellation requests must be submitted via email to cherigo715@gmail.com</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Refunds for cancelled orders will be processed within 5-10 business days</span>
                </li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Intellectual Property</h2>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>All content on this website, including designs, text, graphics, logos, and images, is the property of CheriGo or our licensors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>You may not reproduce, distribute, modify, or create derivative works from our content without written permission</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Fan merchandise sold respects fair use guidelines and supports original creators</span>
                </li>
              </ul>
            </section>

            {/* User Conduct */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">User Conduct</h2>
              <p className="mb-3">When using our website, you agree not to:</p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Use the site for any illegal or unauthorized purpose</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Attempt to gain unauthorized access to our systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Use automated systems or bots to access the site</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c0d763] mr-2">•</span>
                  <span>Interfere with the proper functioning of the website</span>
                </li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, CheriGo shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the specific product giving rise to the claim.
              </p>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your personal information when you use our services.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Changes to Terms</h2>
              <p>
                We may update these Terms and Conditions from time to time to reflect changes in our practices, services, or legal requirements. Please review this page regularly. Continued use of our site after any changes constitutes acceptance of the new terms. Material changes will be communicated via email or website notification.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Governing Law</h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with the laws of Malaysia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the Malaysian courts.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-[#f9f9f9] p-6 rounded-2xl border-2 border-[#c0d763]">
              <h2 className="text-2xl font-bold text-[#f66d76] mb-4">Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>CheriGo</strong></p>
                <p>Email: <a href="mailto:cherigo715@gmail.com" className="text-[#c0d763] hover:underline">cherigo715@gmail.com</a></p>
                <p>Instagram: <a href="https://instagram.com/cherig0" target="_blank" rel="noopener noreferrer" className="text-[#c0d763] hover:underline">@cherig0</a></p>
                <p>Hours: 7am - 9pm (GMT+8)</p>
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

export default TermsConditions;
