
import { Modal, DatePicker, Button } from "@douyinfe/semi-ui";
import React,{ useState } from "react";

const SubleaseModal = ({ visible, onCancel, onConfirm }) => {
  const [startDate, setStartDate] = useState(null);

  const handleConfirm = () => {
    onConfirm(startDate);
  };

  return (
    <Modal
      title="确认转租"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      closeOnEsc={true}
      width={400}
    >
      <div className="py-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            转租开始时间
          </label>
          <DatePicker 
            onChange={setStartDate}
            value={startDate}
            placeholder="年/月/日"
            style={{ width: '100%' }}
          />
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button type="tertiary" onClick={onCancel}>
            取消
          </Button>
          <Button type="primary" theme="solid" onClick={handleConfirm} disabled={!startDate}>
            确定
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SubleaseModal;
