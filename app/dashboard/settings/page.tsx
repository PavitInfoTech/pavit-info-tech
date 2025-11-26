import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Settings | PavitInfoTech Dashboard",
  description: "Dashboard settings",
};

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className='p-6 lg:p-8'>
        <div className='space-y-6'>
          <div>
            <h1 className='text-3xl font-bold font-serif mb-2'>Settings</h1>
            <p className='text-muted-foreground'>
              Manage your dashboard preferences
            </p>
          </div>

          <Card className='p-6 text-center py-12'>
            <p className='text-muted-foreground mb-4'>Settings Panel</p>
            <p className='text-lg font-semibold'>Coming Soon</p>
            <p className='text-sm text-muted-foreground mt-2'>
              Additional settings and preferences will be available soon
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
