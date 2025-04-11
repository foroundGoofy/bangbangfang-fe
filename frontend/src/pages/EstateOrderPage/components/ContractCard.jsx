
import React,{ useState } from "react";
import { Card, Descriptions } from "@douyinfe/semi-ui";

const ContractCard = ({ contract }) => {
  return (
    <Card className="shadow-md rounded-lg">
      <h3 className="text-lg font-bold mb-4">合同信息</h3>
      <Descriptions
        data={[
          { key: '合同编号', value: contract.id },
          { key: '月租金', value: `¥${contract.monthlyRent}` },
          { key: '起租时间', value: contract.startDate },
          { key: '押金', value: `¥${contract.deposit}` },
          { key: '结束时间', value: contract.endDate },
          { key: '状态', value: contract.status },
        ]}
        column={2}
      />
    </Card>
  );
};

export default ContractCard;
