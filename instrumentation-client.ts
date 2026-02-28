// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // 100% in dev; lower in production to control volume
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Sample 10% of sessions, 100% when an error occurs
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Sends user emails/IPs to Sentry — useful for debugging but review for GDPR compliance
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
