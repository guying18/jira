import React from "react";
import "./App.css";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useAuth } from "context/auth-context";
// import { AuthenticatedApp } from "authenticated-app";
// import { UnauthenticatedApp } from "unauthenticated-app";

// 注意：懒加载的组件需为 default export 的 React 组件。
const AuthenticatedApp = React.lazy(() => import("authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("unauthenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
