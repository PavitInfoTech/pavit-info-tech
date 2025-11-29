"use client";

import { useEffect, useState, useCallback } from "react";
import { MapPin, ExternalLink, Navigation, Map, Globe } from "lucide-react";
import { getMapEmbed, type MapsEmbedResponse } from "@/lib/maps-client";

interface InteractiveMapProps {
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
}: InteractiveMapProps) {
  const [mapData, setMapData] = useState<MapsEmbedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapView, setMapView] = useState<"interactive" | "satellite">(
    "interactive"
  );

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
        google_maps_link: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
        osm_search_link: `https://www.openstreetmap.org/search?query=${encodedAddress}`,
        iframe: "",
        leaflet_html: "",
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
    mapData?.google_maps_link ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;

  const osmUrl =
    mapData?.osm_search_link ||
    `https://www.openstreetmap.org/search?query=${encodeURIComponent(address)}`;

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className='w-full min-h-[400px] bg-muted/50 rounded-2xl flex items-center justify-center overflow-hidden'>
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center'>
                <Globe className='w-8 h-8 text-primary animate-pulse' />
              </div>
              <div className='absolute inset-0 rounded-full border-2 border-primary/30 animate-ping' />
            </div>
            <div className='text-center'>
              <p className='text-sm font-medium text-foreground'>
                Loading interactive map
              </p>
              <p className='text-xs text-muted-foreground mt-1'>
                Powered by OpenStreetMap
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If we have an iframe from the API, use the embedded Leaflet map
  if (mapData?.iframe) {
    return (
      <div className={`relative ${className}`}>
        {/* Map Container with creative border */}
        <div className='relative rounded-2xl overflow-hidden border border-border/50 shadow-xl'>
          {/* Gradient overlay at top */}
          <div className='absolute top-0 left-0 right-0 h-16 bg-linear-to-b from-background/80 to-transparent z-10 pointer-events-none' />

          {/* Map View Toggle */}
          <div className='absolute top-3 right-3 z-20'>
            <div className='flex gap-1 bg-card/90 backdrop-blur-sm rounded-lg p-1 border border-border/50 shadow-lg'>
              <button
                onClick={() => setMapView("interactive")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  mapView === "interactive"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Map className='w-3.5 h-3.5 inline-block mr-1' />
                Map
              </button>
              <a
                href={googleMapsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all'
              >
                <Navigation className='w-3.5 h-3.5 inline-block mr-1' />
                Satellite
              </a>
            </div>
          </div>

          {/* Leaflet Map iframe */}
          <div
            className='w-full min-h-[400px] lg:min-h-[500px]'
            dangerouslySetInnerHTML={{ __html: mapData.iframe }}
          />

          {/* Bottom gradient */}
          <div className='absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background/60 to-transparent pointer-events-none' />
        </div>

        {/* Address Card */}
        <AddressCard
          address={address}
          googleMapsUrl={googleMapsUrl}
          osmUrl={osmUrl}
        />

        {/* Map attribution */}
        <div className='absolute bottom-2 right-2 z-10'>
          <span className='text-[10px] text-muted-foreground/60 bg-background/50 backdrop-blur-sm px-2 py-0.5 rounded'>
            © OpenStreetMap contributors
          </span>
        </div>
      </div>
    );
  }

  // Fallback: Creative placeholder with multiple map options
  return (
    <div className={`relative ${className}`}>
      <div className='w-full min-h-[400px] bg-linear-to-br from-muted/30 via-muted/10 to-muted/30 rounded-2xl flex items-center justify-center border border-border/50 overflow-hidden'>
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

          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <a
              href={googleMapsUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all text-sm font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5'
            >
              <Navigation className='w-4 h-4' />
              Google Maps
            </a>
            <a
              href={osmUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-card border border-border rounded-xl hover:bg-muted/50 transition-all text-sm font-medium hover:-translate-y-0.5'
            >
              <Globe className='w-4 h-4' />
              OpenStreetMap
            </a>
          </div>

          {error && (
            <p className='text-xs text-muted-foreground mt-6 flex items-center justify-center gap-1'>
              <span className='w-1.5 h-1.5 rounded-full bg-amber-500' />
              Interactive map temporarily unavailable
            </p>
          )}
        </div>
      </div>

      <AddressCard
        address={address}
        googleMapsUrl={googleMapsUrl}
        osmUrl={osmUrl}
      />
    </div>
  );
}

function AddressCard({
  address,
  googleMapsUrl,
  osmUrl,
}: {
  address: string;
  googleMapsUrl: string;
  osmUrl: string;
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

            {/* Action buttons */}
            <div className='flex flex-wrap gap-2'>
              <a
                href={googleMapsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg'
              >
                <Navigation className='w-3 h-3' />
                Directions
              </a>
              <a
                href={osmUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors bg-muted/50 hover:bg-muted px-3 py-1.5 rounded-lg'
              >
                <ExternalLink className='w-3 h-3' />
                View Larger
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the default location for use elsewhere
export const PAVIT_LOCATION = DEFAULT_LOCATION;
