import React, { useState } from 'react';
import { Upload, Button, message, Steps, Form, Input, InputNumber, Select } from 'antd';
import { VideoCameraAddOutlined, PictureOutlined } from '@ant-design/icons';

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

export default function LandlordForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  // 动态定价提示逻辑
  const calculateDynamicPrice = () => {
    const { layout, area } = form.getFieldsValue();
    if (layout && area) {
      // TODO: 调用后端定价接口
      return `同户型均价：¥2500 - ¥2800/月`;
    }
    return '请输入户型和面积获取定价建议';
  };

  const steps = [
    {
      title: '基本信息',
      content: (
        <Form.Item label="房屋位置" required>
          <Input.Group compact>
            <Form.Item name="street" noStyle>
              <Input placeholder="街道" style={{ width: '30%' }} />
            </Form.Item>
            <Form.Item name="community" noStyle>
              <Input placeholder="小区" style={{ width: '30%' }} />
            </Form.Item>
          </Input.Group>
        </Form.Item>
      ),
    },
    {
      title: '房屋详情',
      content: (
        <>
          <Form.Item label="户型" name="layout" required>
            <Select>
              <Option value="一室一厅">一室一厅</Option>
              <Option value="两室一厅">两室一厅</Option>
              <Option value="三室一厅">三室一厅</Option>
            </Select>
          </Form.Item>
          <Form.Item label="动态定价" extra={calculateDynamicPrice()}>
            <InputNumber placeholder="期望租金" style={{ width: '100%' }} />
          </Form.Item>
        </>
      ),
    },
    {
      title: '上传资料',
      content: (
        <>
          <Form.Item label="房屋照片">
            <Upload listType="picture-card" maxCount={10}>
              <Button icon={<PictureOutlined />}>上传照片</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="房屋视频">
            <Upload accept="video/*" maxCount={1}>
              <Button icon={<VideoCameraAddOutlined />}>上传视频</Button>
            </Upload>
          </Form.Item>
        </>
      ),
    },
  ];

  return (
    <div className="form-container">
      <Steps current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
        {steps[currentStep].content}
      </Form>
    </div>
  );
}