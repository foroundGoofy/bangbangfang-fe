
import { Modal, DatePicker, Button } from "@douyinfe/semi-ui";
import React,{ useState } from "react";

const TerminationModal = ({ visible, onCancel, onConfirm }) => {
  const [endDate, setEndDate] = useState(null);

  const handleConfirm = () => {
    onConfirm(endDate);
  };

  return (
    <Modal
      title="提前退租"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      closeOnEsc={true}
      width={400}
    >
      <div className="py-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            退租日期
          </label>
          <DatePicker 
            onChange={setEndDate}
            value={endDate}
            placeholder="年/月/日"
            style={{ width: '100%' }}
          />
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button type="tertiary" onClick={onCancel}>
            取消
          </Button>
          <Button type="primary" theme="solid" onClick={handleConfirm} disabled={!endDate}>
            确定
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TerminationModal;
