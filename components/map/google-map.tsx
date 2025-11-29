"use client";

import { useEffect, useState, useCallback } from "react";
import { MapPin, Navigation, Map, Globe } from "lucide-react";
import { getMapEmbed, type MapsEmbedResponse } from "@/lib/maps-client";

interface GoogleMapProps {
  address?: string;
  zoom?: number;
  width?: number;
  height?: number;
  className?: string;
}

// PavitInfoTech headquarters
const DEFAULT_LOCATION = {
  address: "122 Galle Road, Colombo 03, Colombo, Sri Lanka",
};

export function GoogleMap({
  address = DEFAULT_LOCATION.address,
  zoom = 15,
  width = 600,
  height = 450,
  className = "",
}: GoogleMapProps) {
  const [mapData, setMapData] = useState<MapsEmbedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMap = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMapEmbed({
        address,
        zoom,
        width,
        height,
      });
      setMapData(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch map:", err);
      setError("Failed to load map");
      const encodedAddress = encodeURIComponent(address);
      setMapData({
        embed_url: `https://maps.google.com/maps?q=${encodedAddress}&z=${zoom}&output=embed`,
        maps_link: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
        iframe: "",
        address: address,
        zoom: zoom,
      });
    } finally {
      setLoading(false);
    }
  }, [address, zoom, width, height]);

  useEffect(() => {
    fetchMap();
  }, [fetchMap]);

  const googleMapsUrl =
    mapData?.maps_link ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;

  const embedUrl =
    mapData?.embed_url ||
    `https://maps.google.com/maps?q=${encodeURIComponent(
      address
    )}&z=${zoom}&output=embed`;

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className='w-full h-[400px] lg:h-[500px] bg-muted/50 rounded-2xl flex items-center justify-center overflow-hidden'>
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center'>
                <Globe className='w-8 h-8 text-primary animate-pulse' />
              </div>
              <div className='absolute inset-0 rounded-full border-2 border-primary/30 animate-ping' />
            </div>
            <div className='text-center'>
              <p className='text-sm font-medium text-foreground'>Loading map</p>
              <p className='text-xs text-muted-foreground mt-1'>
                Powered by Google Maps
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If we have an embed URL, display the Google Maps iframe
  if (mapData?.embed_url || embedUrl) {
    return (
      <div className={`relative ${className}`}>
        {/* Map Container with creative styling */}
        <div className='relative rounded-2xl overflow-hidden border border-border/50 shadow-xl h-[400px] lg:h-[500px]'>
          {/* Gradient overlay at top */}
          <div className='absolute top-0 left-0 right-0 h-16 bg-linear-to-b from-background/60 to-transparent z-10 pointer-events-none' />

          {/* Map Controls */}
          <div className='absolute top-3 right-3 z-20'>
            <div className='flex gap-1 bg-card/90 backdrop-blur-sm rounded-lg p-1 border border-border/50 shadow-lg'>
              <span className='px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground shadow-sm flex items-center gap-1.5'>
                <Map className='w-3.5 h-3.5' />
                Map
              </span>
              <a
                href={googleMapsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all flex items-center gap-1.5'
              >
                <Navigation className='w-3.5 h-3.5' />
                Directions
              </a>
            </div>
          </div>

          {/* Google Maps iframe */}
          <iframe
            src={mapData?.embed_url || embedUrl}
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            title='PavitInfoTech Location'
            className='w-full h-full'
          />

          {/* Bottom gradient */}
          <div className='absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background/40 to-transparent pointer-events-none' />
        </div>

        {/* Address Card */}
        <AddressCard address={address} googleMapsUrl={googleMapsUrl} />
      </div>
    );
  }

  // Fallback: Creative placeholder with link to Google Maps
  return (
    <div className={`relative ${className}`}>
      <div className='w-full h-[400px] lg:h-[500px] bg-linear-to-br from-muted/30 via-muted/10 to-muted/30 rounded-2xl flex items-center justify-center border border-border/50 overflow-hidden'>
        {/* Decorative map grid pattern */}
        <div className='absolute inset-0 opacity-5'>
          <div
            className='w-full h-full'
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Decorative circles */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='w-48 h-48 rounded-full border border-primary/10 animate-pulse' />
          <div className='absolute inset-4 rounded-full border border-primary/20' />
          <div className='absolute inset-8 rounded-full border border-primary/30' />
        </div>

        <div className='relative text-center p-8 max-w-md'>
          <div className='w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 rotate-3 shadow-lg'>
            <MapPin className='w-10 h-10 text-primary' />
          </div>

          <h3 className='font-serif text-xl font-semibold mb-2'>Find Us</h3>
          <p className='text-sm text-muted-foreground mb-6 leading-relaxed'>
            {address}
          </p>

          <a
            href={googleMapsUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all text-sm font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5'
          >
            <Navigation className='w-4 h-4' />
            Open in Google Maps
          </a>

          {error && (
            <p className='text-xs text-muted-foreground mt-6 flex items-center justify-center gap-1'>
              <span className='w-1.5 h-1.5 rounded-full bg-amber-500' />
              Interactive map temporarily unavailable
            </p>
          )}
        </div>
      </div>

      <AddressCard address={address} googleMapsUrl={googleMapsUrl} />
    </div>
  );
}

function AddressCard({
  address,
  googleMapsUrl,
}: {
  address: string;
  googleMapsUrl: string;
}) {
  return (
    <div className='absolute bottom-6 left-4 right-4 md:left-6 md:right-auto z-10'>
      <div className='bg-card/95 backdrop-blur-md border border-border/50 rounded-2xl p-5 shadow-2xl max-w-sm'>
        <div className='flex items-start gap-4'>
          {/* Location Icon with pulse effect */}
          <div className='relative shrink-0'>
            <div className='w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center'>
              <MapPin className='w-6 h-6 text-primary' />
            </div>
            <span className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card animate-pulse' />
          </div>

          <div className='flex-1 min-w-0'>
            <h4 className='font-semibold text-sm mb-0.5'>PavitInfoTech HQ</h4>
            <p className='text-xs text-muted-foreground mb-3 leading-relaxed'>
              {address}
            </p>

            {/* Action button */}
            <a
              href={googleMapsUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg'
            >
              <Navigation className='w-3 h-3' />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the default location for use elsewhere
export const PAVIT_LOCATION = DEFAULT_LOCATION;
