import React, { useReducer } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import StepsIndicator from './StepsIndicator';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 };
    case 'PREV_STEP':
      return { ...state, currentStep: state.currentStep - 1 };
    default:
      return state;
  }
};

const steps = [
  {
    id: 'basic-info',
    title: '基本信息',
    fields: [
      { name: 'name', label: '姓名', rules: [{ required: true }] },
      { name: 'phone', label: '联系电话', rules: [{ pattern: /^1[3-9]\d{9}$/ }] },
      {
        name: 'workLocation',
        label: '工作地点',
        component: <Cascader options={cityOptions} />,
        rules: [{ required: true }]
      }
    ]
  },
  {
    id: 'location',
    title: '位置需求',
    fields: [
      {
        name: 'districts',
        label: '偏好区域',
        component: <Checkbox.Group options={DISTRICT_OPTIONS} />,
        rules: [{ required: true }]
      },
      {
        name: 'commuteTime',
        label: '通勤时间（分钟）',
        component: <InputNumber min={0} max={999} />,
        rules: [{ required: true }]
      },
      {
        name: 'metroAccessibility',
        label: '地铁可达性',
        component: <Select options={METRO_OPTIONS} />
      }
    ]
  },
  {
    id: 'facilities',
    title: '设施需求',
    fields: [
      {
        name: 'hasElevator',
        label: '电梯需求',
        component: <Radio.Group options={[
          { label: '是', value: true },
          { label: '否', value: false }
        ]} />
      },
      {
        name: 'parking',
        label: '停车位需求',
        component: <Radio.Group options={YES_NO_OPTIONS} />
      },
      {
        name: 'furniture',
        label: '家具家电',
        component: <Select options={FURNITURE_OPTIONS} />
      }
    ]
  },
  {
    id: 'terms',
    title: '租期预算',
    fields: [
      {
        name: 'budget',
        label: '月预算（元）',
        component: <InputNumber min={1000} max={999999} />,
        rules: [{ required: true }]
      },
      {
        name: 'leaseTerm',
        label: '租期要求',
        component: <Select options={LEASE_TERM_OPTIONS} />
      },
      {
        name: 'moveInDate',
        label: '入住时间',
        component: <Select options={MOVE_IN_OPTIONS} />
      }
    ]
  },
  {
    id: 'special',
    title: '特殊要求',
    fields: [
      {
        name: 'communityFacilities',
        label: '社区设施',
        component: <Checkbox.Group options={FACILITY_OPTIONS} />
      },
      {
        name: 'specialNeeds',
        label: '其他需求',
        component: <TextArea placeholder="可办理居住证/养宠物等" />
      }
    ]
  }
];

export default function MultiStepForm({ onSubmit }) {
  const [state, dispatch] = useReducer(formReducer, {
    currentStep: 0,
    formData: {}
  });

  const validateCurrentStep = () => {
    const currentFields = steps[state.currentStep].fields;
    return currentFields.every(field => {
      const value = state.formData[field.name];
      return field.rules.every(rule => {
        if (rule.required && !value) return false;
        if (rule.pattern && !rule.pattern.test(value)) return false;
        return true;
      });
    });
  };

  const handleSubmit = () => {
    fetch('/api/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...state.formData,
        districts: state.formData.districts.join(','),
        metroAccessibility: state.formData.metroAccessibility?.label
      })
    }).then(() => {
      setShowBlessing(true);
      onSubmit();
    });
  };

  return (
    <div className="multi-step-form">
      {showBlessing ? (
        <div className="blessing-message">
          <SmileOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: 16 }} />
          <h3 style={{ marginBottom: 8 }}>我已充分了解你的需求</h3>
          <p style={{ marginBottom: 4 }}>我会翻山越岭、日夜兼程帮你找到适合你的房子</p>
          <p style={{ fontWeight: 500 }}>记住租房不看房，就找帮帮房</p>
        </div>
      ) : (
        <div>
        <StepsIndicator 
          currentStep={state.currentStep}
          steps={steps}
          onChange={step => dispatch({ type: 'UPDATE_STEP', payload: step })}
        />

        <Form layout="vertical" className="form-content">
          {steps[state.currentStep].fields.map(field => (
            <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              rules={field.rules}
            >
              {field.component || <Input />}
            </Form.Item>
          ))}
        </Form>

        <div className="form-actions">
          {state.currentStep > 0 && (
            <Button onClick={() => dispatch({ type: 'PREV_STEP' })}>上一步</Button>
          )}
          {state.currentStep < steps.length - 1 ? (
            <Button 
              type="primary" 
              onClick={() => validateCurrentStep() && dispatch({ type: 'NEXT_STEP' })}
            >
              下一步
            </Button>
          ) : (
            <Button 
              type="primary" 
              disabled={!validateCurrentStep()}
              onClick={handleSubmit}
            >
              开始找房
            </Button>
          )}
        </div>
      </div>
    );
}

const DISTRICT_OPTIONS = ['杨浦区', '黄浦区', '宝山区', '虹口区', '闵行区', '松江区', '浦东新区'];
const METRO_OPTIONS = [
  { label: '5分钟以内', value: 5 },
  { label: '10分钟以内', value: 10 },
  { label: '15分钟以内', value: 15 },
  { label: '20分钟以内', value: 20 },
  { label: '30分钟以内', value: 30 }
];
const FURNITURE_OPTIONS = [
  { label: '全部家具家电', value: 'full' },
  { label: '常用家具家电', value: 'basic' },
  { label: '不需要家具家电', value: 'none' }
];
const FACILITY_OPTIONS = ['安保', '健身器械', '停车位', '篮球场', '门禁'];