"use client";

import { useEffect, useState, useCallback } from "react";
import { MapPin, ExternalLink, Loader } from "lucide-react";
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
  address: "100 Innovation Drive, San Francisco, CA 94105",
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
      // API is public and handles caching internally
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
      // Fallback if API fails
      const encodedAddress = encodeURIComponent(address);
      setMapData({
        embed_url: "",
        maps_link: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
        iframe: "",
        address: address,
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

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className='w-full min-h-[400px] bg-muted/50 rounded-xl flex items-center justify-center'>
          <div className='flex flex-col items-center gap-3'>
            <Loader className='w-8 h-8 animate-spin text-primary' />
            <span className='text-sm text-muted-foreground'>
              Loading map...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // If we have an embed URL from the API, use the iframe
  if (mapData?.embed_url) {
    return (
      <div className={`relative ${className}`}>
        <iframe
          src={mapData.embed_url}
          width='100%'
          height='100%'
          style={{ border: 0, minHeight: "400px" }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          title='PavitInfoTech Location'
          className='rounded-xl'
        />
        <AddressOverlay address={address} googleMapsUrl={googleMapsUrl} />
      </div>
    );
  }

  // Fallback: Show a styled placeholder with link to Google Maps
  return (
    <div className={`relative ${className}`}>
      <div className='w-full min-h-[400px] bg-muted/30 rounded-xl flex items-center justify-center border border-border'>
        <div className='text-center p-8'>
          <MapPin className='w-12 h-12 text-primary mx-auto mb-4' />
          <h3 className='font-semibold mb-2'>View on Google Maps</h3>
          <p className='text-sm text-muted-foreground mb-4 max-w-xs'>
            {address}
          </p>
          <a
            href={googleMapsUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium'
          >
            Open in Google Maps
            <ExternalLink className='w-4 h-4' />
          </a>
          {error && (
            <p className='text-xs text-muted-foreground mt-4'>
              Interactive map unavailable
            </p>
          )}
        </div>
      </div>
      <AddressOverlay address={address} googleMapsUrl={googleMapsUrl} />
    </div>
  );
}

function AddressOverlay({
  address,
  googleMapsUrl,
}: {
  address: string;
  googleMapsUrl: string;
}) {
  return (
    <div className='absolute bottom-4 left-4 right-4 md:left-4 md:right-auto'>
      <div className='bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg max-w-sm'>
        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
            <MapPin className='w-5 h-5 text-primary' />
          </div>
          <div className='flex-1 min-w-0'>
            <h4 className='font-semibold text-sm mb-1'>PavitInfoTech HQ</h4>
            <p className='text-xs text-muted-foreground mb-2'>{address}</p>
            <a
              href={googleMapsUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 text-xs text-primary hover:underline'
            >
              Get Directions
              <ExternalLink className='w-3 h-3' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the default location for use elsewhere
export const PAVIT_LOCATION = DEFAULT_LOCATION;
