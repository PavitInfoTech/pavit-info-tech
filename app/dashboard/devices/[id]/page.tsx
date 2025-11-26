import { DeviceDetailClient } from "./client";

export async function generateStaticParams() {
  // Generate static params for all 36 devices
  return Array.from({ length: 36 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export default function DeviceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <DeviceDetailClient params={params} />;
}
