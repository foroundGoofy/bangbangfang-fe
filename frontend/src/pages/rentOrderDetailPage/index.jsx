import React from 'react';
import { Layout } from "@douyinfe/semi-ui";
import PropertyDetails from "./components/PropertyDetails";
import Header from '../rentEstatePage/components/Header';

function RentOrderDetailPage() {
  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header/>
      <Layout.Content className="p-4">
        <PropertyDetails />
      </Layout.Content>
    </Layout>
  );
}

export default RentOrderDetailPage;
