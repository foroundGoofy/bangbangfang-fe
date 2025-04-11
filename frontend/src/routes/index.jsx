import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/profilePage';
import PropertyDetail from '../pages/PropertyDetail';
import FindEstatePage from '../pages/findEstatePage';
import RentEstatePage from '../pages/rentEstatePage';
import EstateDetailPage from '../pages/estateDetailPage';
import EstateListPage from '../pages/estateListPage';
import RentOrderDetailPage from '../pages/rentOrderDetailPage';
import OrderConfirmPage from '../pages/orderConfirmPage';
import ManagementListPage from '../pages/managementListPage';
import ManagementDetailPage from '../pages/managementDetailPage';
import EstateOrderPage from '../pages/EstateOrderPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/property-detail" element={<PropertyDetail />} />
        <Route path="/find-estate" element={<FindEstatePage />} />
        <Route path="/rent-estate" element={<RentEstatePage />} />

        <Route path="/estate-list" element={<EstateListPage />} />
        <Route path="/estate-detail" element={<EstateDetailPage />} />

        <Route path="/rent-order-detail" element={<RentOrderDetailPage />} />
        <Route path="/order-confirm" element={<OrderConfirmPage />} />
        <Route path="/estate-order" element={<EstateOrderPage />} />


        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/manage-list" element={<ManagementListPage />} />
        <Route path="/manage-detail" element={<ManagementDetailPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;