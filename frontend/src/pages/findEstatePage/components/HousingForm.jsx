
import React,{ useState } from 'react';
import FormSection from './FormSection';

function HousingForm({onSearch}) {
  const [formData, setFormData] = useState({
    preferredArea: {
      city: '',
      district: '',
      neighborhood: ''
    },
    roomType: '',
    floorHeight: '',
    elevator: '',
    budget: 5000,
    budgetRange: [3000, 7000],
    commuteTime: 30,
    workLocation: {
      city: '',
      district: '',
      address: ''
    },
    nearSubway: '',
    parking: '',
    subwayAccess: '',
    furniture: '',
    kitchenFacilities: [],
    leaseTerm: '',
    moveInDate: '',
    communityFacilities: [],
    specialRequirements: []
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWorkLocationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      workLocation: {
        ...prev.workLocation,
        [field]: value
      }
    }));
  };

  const handlePreferredAreaChange = (field, value) => {
    // Reset child selections when parent changes
    if (field === 'city') {
      setFormData(prev => ({
        ...prev,
        preferredArea: {
          city: value,
          district: '',
          neighborhood: ''
        }
      }));
    } else if (field === 'district') {
      setFormData(prev => ({
        ...prev,
        preferredArea: {
          ...prev.preferredArea,
          district: value,
          neighborhood: ''
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        preferredArea: {
          ...prev.preferredArea,
          [field]: value
        }
      }));
    }
  };

  const handleBudgetRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      budget: value
    }));
  };

  const handleCommuteTimeChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      commuteTime: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    onSearch(formData)
  };

  // City options for cascade selector
  const cities = ['上海市', '北京市', '广州市', '深圳市'];
  
  const districts = {
    '北京市': ['东城区', '西城区', '朝阳区', '海淀区'],
    '上海市': ['杨浦区', '黄浦区', '宝山区', '虹口区', '闵行区', '松江区', '浦东新区'],
    '广州市': ['天河区', '越秀区', '海珠区', '白云区'],
    '深圳市': ['福田区', '南山区', '罗湖区', '宝安区']
  };
  
  const neighborhoods = {
    '杨浦区': ['五角场街道', '控江路街道', '新江湾城街道', '大桥街道', '五角场镇街道'],
    '黄浦区': ['南京东路街道', '人民广场街道', '外滩街道', '豫园街道', '老西门街道'],
    '宝山区': ['大场镇街道', '顾村街道', '罗店街道', '淞南街道', '高境街道'],
    '虹口区': ['曲阳街道', '四川北路街道', '北外滩街道', '凉城街道', '江湾街道'],
    '闵行区': ['莘庄街道', '七宝街道', '颛桥街道', '浦江街道', '梅陇街道'],
    '松江区': ['松江老城街道', '泗泾街道', '九亭街道', '佘山街道', '洞泾街道'],
    '浦东新区': ['陆家嘴街道', '张江街道', '金桥街道', '世纪公园街道', '八佰伴街道'],
    '朝阳区': ['国贸街道', '三里屯街道', '望京街道', '大望路街道', '亚运村街道'],
    '海淀区': ['北下关街道', '中关村街道', '五道口街道', '清河街道', '万柳街道', '苏州街街道'],
    '东城区': ['东华门街道', '王府井街道', '东单街道', '东四街道', '安定门街道', '崇文门街道'],
    '西城区': ['西单街道', '金融街街道', '德胜门街道', '月坛街道', '什刹海街道'],
    '天河区': ['珠江新城街道', '天河路街道', '岗顶街道', '五山街道', '林和街道'],
    '越秀区': ['北京路街道', '环市东街道', '越秀公园街道', '东山口街道', '农讲所街道'],
    '海珠区': ['江南大道街道', '琶洲街道', '赤岗街道', '新港街道', '昌岗街道'],
    '白云区': ['白云大道街道', '同和街道', '京溪街道', '嘉禾街道', '太和街道'],
    '福田区': ['福田中心区街道', '华强北街道', '车公庙街道', '香蜜湖街道', '梅林街道'],
    '南山区': ['科技园街道', '蛇口街道', '南头街道', '前海街道', '华侨城街道'],
    '罗湖区': ['东门街道', '水贝街道', '布心街道', '笋岗街道', '清水河街道'],
    '宝安区': ['西乡街道', '新安街道', '福永街道', '沙井街道', '松岗街道']
  };

  // Subway access options with icons and descriptions
  const subwayAccessOptions = [
    { value: '5分钟以内', label: '5分钟以内', description: '极度便捷', icon: '🚶‍♂️' },
    { value: '10分钟以内', label: '10分钟以内', description: '非常方便', icon: '🚶‍♂️' },
    { value: '15分钟以内', label: '15分钟以内', description: '适中距离', icon: '🚶‍♂️' },
    { value: '20分钟以内', label: '20分钟以内', description: '可接受范围', icon: '🚶‍♂️' },
    { value: '30分钟以内', label: '30分钟以内', description: '稍远但可行', icon: '🚶‍♂️' }
  ];

  // Lease term options with descriptions
  const leaseTerms = [
    { value: '3个月', label: '3个月', description: '短期灵活' },
    { value: '6个月', label: '6个月', description: '半年期限' },
    { value: '1年', label: '1年', description: '标准租期' },
    { value: '2年', label: '2年', description: '长期优惠' },
    { value: '3年', label: '3年', description: '超长稳定' }
  ];

  // Move-in date options with descriptions
  const moveInDates = [
    { value: '立即', label: '立即', description: '随时可入住' },
    { value: '1周内', label: '1周内', description: '本周内入住' },
    { value: '1个月内', label: '1个月内', description: '本月内入住' },
    { value: '2个月内', label: '2个月内', description: '下月内入住' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection title="区域偏好">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">您偏好哪个区域？</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-blue-100 rounded-lg bg-blue-50/30">
            <div>
              <label className="block text-xs text-gray-500 mb-1">城市</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={formData.preferredArea.city}
                onChange={(e) => handlePreferredAreaChange('city', e.target.value)}
              >
                <option value="">选择城市</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1">区域</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={formData.preferredArea.district}
                onChange={(e) => handlePreferredAreaChange('district', e.target.value)}
                disabled={!formData.preferredArea.city}
              >
                <option value="">选择区域</option>
                {formData.preferredArea.city && districts[formData.preferredArea.city]?.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1">街道/社区</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={formData.preferredArea.neighborhood}
                onChange={(e) => handlePreferredAreaChange('neighborhood', e.target.value)}
                disabled={!formData.preferredArea.district}
              >
                <option value="">选择街道/社区</option>
                {formData.preferredArea.district && neighborhoods[formData.preferredArea.district]?.map(neighborhood => (
                  <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            您可以选择多个偏好区域，请在提交前完成所有选择
          </div>
        </div>
      </FormSection>

      <FormSection title="房型与楼层">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">您需要的房型？</label>
            <div className="space-y-2">
              {['一室一厅', '两室一厅', '三室一厅', '一个卧室'].map(type => (
                <label key={type} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="roomType"
                    value={type}
                    checked={formData.roomType === type}
                    onChange={() => handleInputChange('roomType', type)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">您偏好的楼层高度是？</label>
            <div className="space-y-2">
              {['低楼层', '中楼层', '高楼层'].map(floor => (
                <label key={floor} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="floorHeight"
                    value={floor}
                    checked={formData.floorHeight === floor}
                    onChange={() => handleInputChange('floorHeight', floor)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{floor}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">是否需要电梯？</label>
          <div className="space-x-4">
            {['是', '否'].map(option => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="elevator"
                  value={option}
                  checked={formData.elevator === option}
                  onChange={() => handleInputChange('elevator', option)}
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection title="预算与位置">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">您期望的月租预算是多少？</label>
            <div className="mt-3 px-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">2000元</span>
                <span className="text-sm font-medium text-blue-600">{formData.budget}元</span>
                <span className="text-sm text-gray-500">20000元</span>
              </div>
              <input
                type="range"
                min="2000"
                max="20000"
                step="100"
                value={formData.budget}
                onChange={handleBudgetRangeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">低预算</span>
                <span className="text-xs text-gray-500">高预算</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">您可以接受的最长通勤时间是多少？</label>
            <div className="mt-3 px-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">10分钟</span>
                <span className="text-sm font-medium text-blue-600">{formData.commuteTime}分钟</span>
                <span className="text-sm text-gray-500">120分钟</span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={formData.commuteTime}
                onChange={handleCommuteTimeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">短通勤</span>
                <span className="text-xs text-gray-500">长通勤</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">您的工作地点在哪里？</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-blue-100 rounded-lg bg-blue-50/30">
            <div>
              <label className="block text-xs text-gray-500 mb-1">城市</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={formData.workLocation.city}
                onChange={(e) => handleWorkLocationChange('city', e.target.value)}
              >
                <option value="">选择城市</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1">区域</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={formData.workLocation.district}
                onChange={(e) => handleWorkLocationChange('district', e.target.value)}
                disabled={!formData.workLocation.city}
              >
                <option value="">选择区域</option>
                {formData.workLocation.city && districts[formData.workLocation.city]?.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1">具体地址</label>
              <input
                type="text"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="具体地址"
                value={formData.workLocation.address}
                onChange={(e) => handleWorkLocationChange('address', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">是否临近地铁？</label>
          <div className="space-x-4">
            {['必须临近', '优先考虑', '不需要'].map(option => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="nearSubway"
                  value={option}
                  checked={formData.nearSubway === option}
                  onChange={() => handleInputChange('nearSubway', option)}
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection title="设施与便利性">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">您是否需要停车位？</label>
            <div className="space-x-4">
              {['是', '否'].map(option => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="parking"
                    value={option}
                    checked={formData.parking === option}
                    onChange={() => handleInputChange('parking', option)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">对地铁可达性的要求是？</label>
            <div className="relative">
              <select
                className="appearance-none block w-full pl-3 pr-10 py-3 text-base border border-blue-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-blue-50/30"
                value={formData.subwayAccess}
                onChange={(e) => handleInputChange('subwayAccess', e.target.value)}
              >
                <option value="">请选择地铁可达性要求</option>
                {subwayAccessOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label} - {option.description}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
              
              {formData.subwayAccess && (
                <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded-md flex items-center">
                  <span className="text-lg mr-2">
                    {subwayAccessOptions.find(opt => opt.value === formData.subwayAccess)?.icon}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">
                      {subwayAccessOptions.find(opt => opt.value === formData.subwayAccess)?.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      {subwayAccessOptions.find(opt => opt.value === formData.subwayAccess)?.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">您对家具家电的要求？</label>
          <div className="space-x-4">
            {['全部家具家电', '常用家具家电', '不需要家具家电'].map(option => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="furniture"
                  value={option}
                  checked={formData.furniture === option}
                  onChange={() => handleInputChange('furniture', option)}
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">对厨房设施的要求？</label>
          <div className="flex flex-wrap gap-2">
            {['燃气灶', '微波炉', '烤箱', '电磁炉', '空气炸锅'].map(facility => (
              <label key={facility} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={formData.kitchenFacilities.includes(facility)}
                  onChange={(e) => {
                    const newFacilities = e.target.checked
                      ? [...formData.kitchenFacilities, facility]
                      : formData.kitchenFacilities.filter(f => f !== facility);
                    handleInputChange('kitchenFacilities', newFacilities);
                  }}
                />
                <span className="ml-2 text-sm text-gray-700">{facility}</span>
              </label>
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection title="租期与入住">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">您偏好的租期是？</label>
            <div className="space-y-3">
              {leaseTerms.map(term => (
                <label 
                  key={term.value} 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.leaseTerm === term.value 
                      ? 'bg-blue-50 border-blue-300' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="leaseTerm"
                    value={term.value}
                    checked={formData.leaseTerm === term.value}
                    onChange={() => handleInputChange('leaseTerm', term.value)}
                    hidden
                  />
                  <div className="ml-2 flex-grow">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">{term.label}</span>
                      {formData.leaseTerm === term.value && (
                        <span className="text-blue-600 text-sm">✓ 已选择</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{term.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">您希望的入住日期？</label>
            <div className="space-y-3">
              {moveInDates.map(date => (
                <label 
                  key={date.value} 
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.moveInDate === date.value 
                      ? 'bg-blue-50 border-blue-300' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="moveInDate"
                    value={date.value}
                    checked={formData.moveInDate === date.value}
                    onChange={() => handleInputChange('moveInDate', date.value)}
                    hidden
                  />
                  <div className="ml-2 flex-grow">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">{date.label}</span>
                      {formData.moveInDate === date.value && (
                        <span className="text-blue-600 text-sm">✓ 已选择</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{date.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection title="社区与特殊需求">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">您希望社区有哪些设施？</label>
          <div className="flex flex-wrap gap-2">
            {['安保', '健身器械', '停车位', '篮球场', '门禁'].map(facility => (
              <label key={facility} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={formData.communityFacilities.includes(facility)}
                  onChange={(e) => {
                    const newFacilities = e.target.checked
                      ? [...formData.communityFacilities, facility]
                      : formData.communityFacilities.filter(f => f !== facility);
                    handleInputChange('communityFacilities', newFacilities);
                  }}
                />
                <span className="ml-2 text-sm text-gray-700">{facility}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">您的其他特殊需求？</label>
          <div className="flex flex-wrap gap-2">
            {['可以办理居住证', '可以养宠物', '附近有学校'].map(req => (
              <label key={req} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={formData.specialRequirements.includes(req)}
                  onChange={(e) => {
                    const newReqs = e.target.checked
                      ? [...formData.specialRequirements, req]
                      : formData.specialRequirements.filter(r => r !== req);
                    handleInputChange('specialRequirements', newReqs);
                  }}
                />
                <span className="ml-2 text-sm text-gray-700">{req}</span>
              </label>
            ))}
          </div>
        </div>
      </FormSection>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
          >
            重置
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            提交需求
          </button>
        </div>
      </div>
      
      {submitted && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700 font-medium text-center">
            我已充分了解你的需求，我会翻山越岭、日夜兼程帮你找到适合你的房子，记住租房不看房，就找帮帮房
          </p>
        </div>
      )}
    </form>
  );
}

export default HousingForm;
