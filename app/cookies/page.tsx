import { MainLayout } from "@/components/layout/main-layout";

export const metadata = {
  title: "Cookie Policy | PavitInfoTech",
  description: "Cookie policy for PavitInfoTech IoT platform",
};

export default function CookiesPage() {
  return (
    <MainLayout>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 mt-16'>
        <h1 className='text-4xl font-bold font-serif mb-8'>Cookie Policy</h1>
        <p className='text-muted-foreground mb-8'>Last updated: January 2025</p>

        <div className='prose prose-invert max-w-none space-y-8'>
          <section>
            <h2 className='text-2xl font-semibold mb-4'>
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small files of letters and numbers that we store on
              your browser or the hard drive of your computer if you agree.
              Cookies contain information that is transferred to your computer's
              hard drive.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4'>
              2. How Do We Use Cookies?
            </h2>
            <p>
              We use cookies for a number of different purposes. Some cookies
              are necessary for technical reasons for our website and services
              to operate, and we refer to these as "essential" or "strictly
              necessary" cookies. Other cookies also enable us to track and
              target the interests of our users to enhance the experience on our
              online properties. Third parties also serve cookies through our
              website for advertising, analytics, and other purposes.
            </p>

            <h3 className='text-xl font-semibold mt-6 mb-3'>
              Types of Cookies We Use:
            </h3>
            <ul className='list-disc pl-6 space-y-3'>
              <li>
                <strong>Essential Cookies:</strong> These cookies are necessary
                for the website to function properly. They enable you to move
                around our website and use essential features.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> These cookies allow us to
                recognize and count the number of users and see how users move
                around our website. This helps us improve the way our website
                works.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> These cookies record your
                visit to our website, the pages you have visited and the links
                you have followed. We use this information to make our website
                and the advertising displayed on it more relevant to your
                interests.
              </li>
              <li>
                <strong>Session Cookies:</strong> These cookies are temporary
                cookies that expire at the end of your browser session.
              </li>
              <li>
                <strong>Persistent Cookies:</strong> These cookies remain in
                your browser until you manually delete them or until they
                expire.
              </li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4'>
              3. Third-Party Cookies
            </h2>
            <p>
              We use third-party services such as Google Analytics to help us
              analyze how you use our website. These service providers may use
              cookies and other tracking technologies to collect information
              about your use of our website.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4'>
              4. How to Control Cookies
            </h2>
            <p>
              You can control and/or delete cookies as you wish. You can delete
              all cookies that are already on your computer and you can set most
              browsers to prevent them from being placed. If you do this,
              however, you may have to manually adjust some preferences every
              time you visit our website and some services and functionalities
              may not work.
            </p>

            <h3 className='text-xl font-semibold mt-6 mb-3'>
              Browser Settings:
            </h3>
            <ul className='list-disc pl-6 space-y-2'>
              <li>
                For Chrome: Visit{" "}
                <code className='bg-muted px-2 py-1 rounded'>
                  chrome://settings/cookies
                </code>
              </li>
              <li>
                For Firefox: Click the menu button and select Preferences →
                Privacy & Security → Cookies and Site Data
              </li>
              <li>
                For Safari: Click Safari → Preferences → Privacy → Manage
                Website Data
              </li>
              <li>
                For Edge: Click Settings → Privacy, search, and services → Clear
                browsing data
              </li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4'>5. Your Consent</h2>
            <p>
              By using PavitInfoTech's website and platform, you consent to our
              use of cookies as described in this policy. You can withdraw your
              consent at any time by changing your cookie preferences in your
              browser settings.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4'>
              6. Updates to Cookie Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify
              you of significant changes by posting a prominent notice on our
              website or by sending you an email notification.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4'>7. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact
              us at:
            </p>
            <div className='mt-4 p-4 bg-muted rounded-lg space-y-1'>
              <p>
                <strong>Email:</strong> hello@pavitinfotech.com
              </p>
              <p>
                <strong>Phone:</strong> 0768924153
              </p>
              <p>
                <strong>Address:</strong> 122 Galle Road, Colombo 03, Colombo,
                00300
              </p>
              <p>
                <strong>Website:</strong> https://pavitinfotech.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
