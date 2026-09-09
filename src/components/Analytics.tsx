'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'ycpr6i6f15';
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export default function Analytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ─── 1. SMART REF TRACKER (?ref=visinema, ?ref=md, etc.) ───
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || params.get('utm_source');

    if (ref) {
      sessionStorage.setItem('recruiter_ref', ref);
      if (typeof (window as any).clarity === 'function') {
        (window as any).clarity('set', 'recruiter_ref', ref);
        (window as any).clarity('event', 'lead_opened', { ref });
      }
    }

    // ─── 2. DETAILED CITY, REGION & ISP GEO-TAGGING ───
    const fetchGeoData = async () => {
      try {
        const res = await fetch('/api/geo');
        if (res.ok) {
          const geo = await res.json();
          const sendGeo = () => {
            if (typeof (window as any).clarity === 'function') {
              if (geo.city && geo.city !== 'Unknown City') {
                (window as any).clarity('set', 'City', geo.city);
              }
              if (geo.region && geo.region !== 'Unknown Region') {
                (window as any).clarity('set', 'Region', geo.region);
              }
              if (geo.isp && geo.isp !== 'Direct Network') {
                (window as any).clarity('set', 'ISP', geo.isp);
              }
            }
          };

          // Retry briefly if clarity script is still initializing
          sendGeo();
          setTimeout(sendGeo, 2000);
          setTimeout(sendGeo, 5000);
        }
      } catch (_) {}
    };

    fetchGeoData();

    // ─── 3. RECRUITER ENGAGEMENT TIMER (High Intent Detection) ───
    const timer15 = setTimeout(() => {
      if (typeof (window as any).clarity === 'function') {
        (window as any).clarity('set', 'Engagement', 'Interested_15s+');
      }
    }, 15000);

    const timer45 = setTimeout(() => {
      if (typeof (window as any).clarity === 'function') {
        (window as any).clarity('set', 'Engagement', 'High_Intent_45s+');
        (window as any).clarity('event', 'high_intent_visitor');
      }
    }, 45000);

    const timer90 = setTimeout(() => {
      if (typeof (window as any).clarity === 'function') {
        (window as any).clarity('set', 'Engagement', 'Deep_Review_90s+');
        (window as any).clarity('event', 'deep_review_recruiter');
      }
    }, 90000);

    // ─── 4. ZERO-INTRUSIVE CLICK TRACKER (Mail, Projects) ───
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = target.textContent?.trim() || '';

      if (typeof (window as any).clarity === 'function') {
        if (href.startsWith('mailto:')) {
          (window as any).clarity('event', 'click_email');
          (window as any).clarity('set', 'Converted', 'Email_Inquiry');
        } else if (href.includes('instagram.com')) {
          (window as any).clarity('event', 'click_instagram');
        } else if (target.tagName.toLowerCase() === 'button' || target.closest('[data-project]')) {
          (window as any).clarity('event', 'project_interaction', { label: text.slice(0, 30) });
        }
      }
    };

    document.addEventListener('click', handleClick, { passive: true });

    return () => {
      clearTimeout(timer15);
      clearTimeout(timer45);
      clearTimeout(timer90);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* Microsoft Clarity - Session Recording, Heatmaps, & Location */}
      {CLARITY_PROJECT_ID && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `,
          }}
        />
      )}

      {/* Google Analytics 4 */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Vercel Web Analytics (Automatic on Vercel deployment) */}
      <VercelAnalytics />
    </>
  );
}
