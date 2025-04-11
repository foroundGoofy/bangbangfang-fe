
import { Card, Button } from "@douyinfe/semi-ui";
import React,{ useState } from "react";
import SubleaseModal from "./SubleaseModal";
import TerminationModal from "./TerminationModal";

const PropertyCard = ({ property, onSublet, onTerminate }) => {
  const [subleaseModalVisible, setSubleaseModalVisible] = useState(false);
  const [terminationModalVisible, setTerminationModalVisible] = useState(false);

  const handleSubleaseClick = () => {
    setSubleaseModalVisible(true);
  };

  const handleTerminationClick = () => {
    setTerminationModalVisible(true);
  };

  const handleSubleaseConfirm = (date) => {
    if (onSublet) {
      onSublet(date);
    }
    setSubleaseModalVisible(false);
  };

  const handleTerminationConfirm = (date) => {
    if (onTerminate) {
      onTerminate(date);
    }
    setTerminationModalVisible(false);
  };

  return (
    <>
      <Card className="shadow-md rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{property.name}</h2>
            <p className="text-gray-500 mt-1">{property.location}</p>
          </div>
          <div className="flex space-x-2">
            <Button theme="solid" type="primary" onClick={handleSubleaseClick}>
              一键转租
            </Button>
            <Button type="danger" onClick={handleTerminationClick}>
              提前退租
            </Button>
          </div>
        </div>
      </Card>

      <SubleaseModal 
        visible={subleaseModalVisible} 
        onCancel={() => setSubleaseModalVisible(false)}
        onConfirm={handleSubleaseConfirm}
      />

      <TerminationModal
        visible={terminationModalVisible}
        onCancel={() => setTerminationModalVisible(false)}
        onConfirm={handleTerminationConfirm}
      />
    </>
  );
};

export default PropertyCard;
