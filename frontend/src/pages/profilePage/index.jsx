
import React, { useState } from "react";
import Header from "../HomePage/components/Header";
import UserProfile from "./components/UserProfile";
import StatisticsCards from "./components/StatisticsCards";
import UnreadMessages from "./components/UnreadMessages";
import CurrentRental from "./components/CurrentRental";
import RentalHistory from "./components/RentalHistory";
import FavoriteProperties from "./components/FavoriteProperties";
import ActivityCenter from "./components/ActivityCenter";
import ShoppingCenter from "./components/ShoppingCenter";

function App() {
  const [user, setUser] = useState({
    username: "admin",
    avatar: "A",
    registrationDate: "2025/3/21",
  });

  const [statistics, setStatistics] = useState({
    rentedCount: 0,
    currentRentals: 1,
    favoriteCount: 0,
  });

  const [unreadMessages, setUnreadMessages] = useState([
    {
      id: 1,
      type: "租客咨询",
      content: "请问有房东需要管理员，我可不可以做管理员?",
      date: "2025/01/05 37:41",
    },
    {
      id: 2,
      type: "房屋检查通知",
      content: "请确认您的房屋是否符合《上海市居住房屋租赁合同管理实施细则》",
      date: "2025/01/05 37:41",
    },
  ]);

  const [currentRental, setCurrentRental] = useState({
    name: "阳光城现代公寓",
    description: "朝阳区望京新城",
    price: "¥6000/月",
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    status: "正在居住",
  });

  const markAsRead = (id) => {
    setUnreadMessages(unreadMessages.filter(message => message.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <UserProfile user={user} />
          <StatisticsCards statistics={statistics} />
          <UnreadMessages messages={unreadMessages} markAsRead={markAsRead} />
          <CurrentRental rental={currentRental} />
          <RentalHistory />
          <FavoriteProperties />
          <ActivityCenter />
          <ShoppingCenter />
        </div>
      </div>
    </div>
  );
}

export default App;
