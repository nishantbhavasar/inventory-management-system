import NotFound from "./pages/NotFound";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Toaster />
        <Routes>
          <Route path="/" element={<>ROOT</>} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<>PROTECTED</>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
