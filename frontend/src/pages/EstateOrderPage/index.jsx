
import React,{ useState } from "react";
import Header from "../HomePage/components/Header";
import ContractDetail from "./components/ContractDetail";
import { Layout } from "@douyinfe/semi-ui";

function App() {
  const [activeTab, setActiveTab] = useState("management");
  
  // Mock data for the contract
  const contractData = {
    property: {
      name: "阳光城现代公寓",
      location: "朝阳区望京新城"
    },
    contract: {
      id: "CT2024010101001",
      startDate: "2024-01-01",
      endDate: "2025-01-01",
      monthlyRent: 6800,
      deposit: 13600,
      status: "正在履行"
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <Layout.Content className="p-6">
        <div className="max-w-5xl mx-auto">
          <ContractDetail contractData={contractData} />
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default App;
