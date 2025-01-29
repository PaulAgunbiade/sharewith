import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import {QueryClient, QueryClientProvider} from "react-query";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import ToastMessage from "./components/toastMessage/ToastMessage.jsx";
import ErrorOccurred from "./screens/error/ErrorOccurred.tsx";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary.tsx";

import {AuthProvider} from "./services/context/authContext/AuthContext.js";
import store from "./services/redux/store.js";
import config from "./config.ts";

import {App} from "./App.tsx";

import "./index.css";

if (config.env === "production") {
  Sentry.init({
    dsn: config.sentryDsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost"],
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  });
} else {
  console.log("Sentry is disabled in development env.");
}

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Please check the index.html file.");
}

ReactDOM.createRoot(rootElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter
          future={{v7_relativeSplatPath: true, v7_startTransition: true}}
        >
          <ErrorBoundary fallback={<ErrorOccurred />}>
            <App />
          </ErrorBoundary>
          <ToastMessage />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
  // </React.StrictMode>
);
