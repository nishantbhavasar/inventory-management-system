import NotFound from "./pages/NotFound";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoutes";
import SignUp from "./pages/Signup";
import Signin from "./pages/Signin";
import Layout from "./pages/Layout";
import Inventories from "./pages/Inventories";
import Categories from "./pages/Categories";

// const Signin = lazy(() => import("./pages/Signin"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Toaster />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="inventories" element={<Inventories />} />
              <Route path="categories" element={<Categories />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
