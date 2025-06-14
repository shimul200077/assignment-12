import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load components for better performance
const Home = React.lazy(() => import('./pages/Home'));
const ProviderList = React.lazy(() => import('./pages/ProviderList'));
const ProviderDetail = React.lazy(() => import('./pages/ProviderDetail'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Contact = React.lazy(() => import('./pages/Contact'));
const MyBookings = React.lazy(() => import('./pages/MyBookings'));
const PatientBookings = React.lazy(() => import('./pages/PatientBookings'));
const PatientDetail = React.lazy(() => import('./pages/PatientDetail'));
const HospitalDashboard = React.lazy(() => import('./pages/HospitalDashboard'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>Something went wrong.</h1>
          <p>Please try refreshing the page or contact support if the problem persists.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

// Scroll to Top Component
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/providers" element={<ProviderList />} />
                <Route path="/providers/:id" element={<ProviderDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/patients/:patientName" element={<PatientDetail />} />
                <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
                <Route path="*" element={
                  <div className="not-found">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                  </div>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
