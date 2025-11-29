import { MainLayout } from "@/components/layout/main-layout";

export const metadata = {
  title: "Privacy Policy | PavitInfoTech",
  description: "Privacy policy for PavitInfoTech IoT platform",
};

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 mt-16'>
        <h1 className='text-4xl font-bold font-serif mb-8'>Privacy Policy</h1>
        <p className='text-muted-foreground mb-8'>Last updated: January 2025</p>

        <div className='prose prose-invert max-w-none space-y-8'>
          <section>
            <h2 className='text-2xl font-semibold mb-4'>1. Introduction</h2>
            <p>
              PavitInfoTech ("Company", "we", "our", or "us") operates the
              PavitInfoTech.com website and IoT platform (the "Service"). This
              page informs you of our policies regarding the collection, use,
              and disclosure of personal data when you use our Service and the
              choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4'>
              2. Information Collection and Use
            </h2>
            <p>
              We collect several different types of information for various
              purposes to provide and improve our Service to you.
            </p>

            <h3 className='text-xl font-semibold mt-6 mb-3'>
              2.1 Types of Data Collected
            </h3>
            <ul className='list-disc pl-6 space-y-2'>
              <li>
                <strong>Personal Data:</strong> While using our Service, we may
                ask you to provide us with certain personally identifiable
                information that can be used to contact or identify you
                ("Personal Data"), including but not limited to:
                <ul className='list-circle pl-6 mt-2 space-y-1'>
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </li>
              <li>
                <strong>Usage Data:</strong> We may also collect information on
                how the Service is accessed and used ("Usage Data"). This may
                include information such as your computer's Internet Protocol
                address (e.g. IP address), browser type, browser version, the
                pages you visit, the time and date of your visit, and other
                diagnostic data.
              </li>
              <li>
                <strong>Device Data:</strong> Data collected from IoT devices
                and sensors connected to our platform, including device metrics,
                sensor readings, and operational data.
              </li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4'>3. Use of Data</h2>
            <p>PavitInfoTech uses the collected data for various purposes:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>
                To allow you to participate in interactive features of our
                Service when you choose to do so
              </li>
              <li>To provide customer support</li>
              <li>
                To gather analysis or valuable information so that we can
                improve our Service
              </li>
              <li>To monitor the usage of our Service</li>
              <li>
                To detect, prevent and address technical and security issues
              </li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4'>4. Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no
              method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4'>
              5. Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date at the top of this Privacy
              Policy.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold mb-4'>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
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
