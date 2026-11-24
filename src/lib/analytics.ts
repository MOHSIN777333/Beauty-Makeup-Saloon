export type AnalyticsEventName = 'whatsapp_click' | 'call_click' | 'directions_click';

export function trackEvent(
  event: AnalyticsEventName,
  details?: Record<string, string>
): void {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent('maheens:analytics', {
      detail: {event, ...details, timestamp: Date.now()},
    })
  );

  const win = window as unknown as {dataLayer?: Array<Record<string, unknown>>};
  if (Array.isArray(win.dataLayer)) {
    win.dataLayer.push({event, ...details});
  }
}
