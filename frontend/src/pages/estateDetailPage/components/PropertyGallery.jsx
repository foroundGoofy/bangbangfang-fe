
import React from "react";
import { Carousel } from '@douyinfe/semi-ui';
import PropertyGalleryDetail from "./PropertyGalleryDetail";

// 引入 assets 目录下的图片
import image1 from '../assets/estate-detail1.jpeg';
import image2 from '../assets/estate-detail2.png';
import image3 from '../assets/estate-detail3.jpeg';
import image4 from '../assets/estate-detail4.jpeg';

// 将图片存储在一个数组中
const images = [image1, image2, image3, image4];

const PropertyGallery = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">房源实拍</h2>
        {/* 使用 Arco Design 的 Carousel 组件 */}
        <Carousel
          style={{ width: '80%',aspectRatio: 1.6,margin: '20px auto' }}
          autoplay
          animation='card'
          showArrow='never'
          autoplaySpeed={3000}
          indicatorPosition='outer'
        >
          {/* 使用 map 方法循环渲染图片 */}
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover',borderRadius: '8px', border: '1px solid #e5e5e5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'  }}
            />
          ))}
        </Carousel>
      </div>
      <PropertyGalleryDetail/>
    </div>
  );
};

export default PropertyGallery;
