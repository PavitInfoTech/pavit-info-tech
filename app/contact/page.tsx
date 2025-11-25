import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <MainLayout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 mt-16'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold font-serif mb-4'>Get in Touch</h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Have questions about PavitInfoTech? Our team is here to help you get
            started.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Contact Info */}
          <div className='space-y-6'>
            <Card className='p-6'>
              <h3 className='text-lg font-semibold mb-2'>Email</h3>
              <p className='text-muted-foreground'>support@pavitinfotech.com</p>
              <p className='text-muted-foreground text-sm'>
                Response time: 2 hours
              </p>
            </Card>

            <Card className='p-6'>
              <h3 className='text-lg font-semibold mb-2'>Sales</h3>
              <p className='text-muted-foreground'>sales@pavitinfotech.com</p>
              <p className='text-muted-foreground text-sm'>
                For enterprise inquiries
              </p>
            </Card>

            <Card className='p-6'>
              <h3 className='text-lg font-semibold mb-2'>Location</h3>
              <p className='text-muted-foreground'>San Francisco, CA</p>
              <p className='text-muted-foreground text-sm'>Headquarters</p>
            </Card>

            <Card className='p-6'>
              <h3 className='text-lg font-semibold mb-2'>Support Hours</h3>
              <p className='text-muted-foreground'>24/7 for Enterprise</p>
              <p className='text-muted-foreground text-sm'>
                9 AM - 6 PM PT for other plans
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className='lg:col-span-2'>
            <Card className='p-8'>
              <form className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Name</label>
                    <Input placeholder='Your name' />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Email</label>
                    <Input placeholder='your@email.com' type='email' />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Company</label>
                  <Input placeholder='Your company name' />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Device Count</label>
                    <Input placeholder='e.g., 500' type='number' />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Industry</label>
                    <select className='w-full px-3 py-2 bg-input border border-input rounded-md text-sm'>
                      <option>Select industry...</option>
                      <option>Manufacturing</option>
                      <option>Energy</option>
                      <option>Healthcare</option>
                      <option>Utilities</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Message</label>
                  <Textarea
                    placeholder='Tell us about your needs...'
                    rows={6}
                  />
                </div>

                <Button className='w-full' size='lg'>
                  Send Message
                </Button>

                <p className='text-sm text-muted-foreground'>
                  We&#39;ll get back to you within 2 hours during business
                  hours.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
