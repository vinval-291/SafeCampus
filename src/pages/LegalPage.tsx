import React from 'react';

const LegalPage = ({ title }: { title: string }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-black text-slate-900 mb-12 tracking-tight">{title}</h1>
      <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm text-slate-600 leading-relaxed space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
          <p>Welcome to SafeCampus. These terms and conditions outline the rules and regulations for the use of SafeCampus's Website, located at safecampus.com.</p>
          <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use SafeCampus if you do not agree to take all of the terms and conditions stated on this page.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. User Accounts</h2>
          <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
          <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Landlord Verification</h2>
          <p>Landlords must undergo a verification process. SafeCampus reserves the right to reject any landlord or property listing at its sole discretion. Verification does not constitute a guarantee of the property's condition or the landlord's behavior.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Limitation of Liability</h2>
          <p>In no event shall SafeCampus, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. SafeCampus, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Privacy Policy</h2>
          <p>Your privacy is important to us. It is SafeCampus's policy to respect your privacy regarding any information we may collect from you across our website, safecampus.com, and other sites we own and operate.</p>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
        </section>
      </div>
    </div>
  );
};

export default LegalPage;
