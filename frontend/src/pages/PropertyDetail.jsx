import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { getPropertyDetail } from '../api/property';
import { Spin, Alert } from 'antd';

const PropertyDetail = ({ match }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPropertyDetail(match.params.id);
        setProperty(data);
      } catch (err) {
        setError('获取房源详情失败');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [match.params.id]);

  if (loading) return <Spin tip="加载中..." />;

  return (
    <div className="property-container">
      {error && <Alert message={error} type="error" showIcon />}
      
      {/* 视频展示模块 */}
      {property?.video_url ? (
        <div className="video-section">
          <ReactPlayer
            url={property.video_url}
            controls
            width="100%"
            height="500px"
            config={{
              file: {
                attributes: { controlsList: 'nodownload' },
              },
            }}
          />
          <div className="video-meta">
            <span>视频生成时间：{new Date(property.video_created_at).toLocaleString()}</span>
            {property.video_status === 'processing' && (
              <span className="processing-badge">云端生成中，预计5分钟内完成</span>
            )}
          </div>
        </div>
      ) : (
        <div className="video-placeholder">
          <p>📹 视频正在生成中，请稍后刷新查看...</p>
        </div>
      )}

      <style jsx>{`
        .property-container {
          max-width: 1200px;
          margin: 20px auto;
          padding: 20px;
        }
        .video-section {
          margin: 30px 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          background: #f8f9fa;
        }
        .video-meta {
          padding: 15px;
          background: #fff;
          border-top: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .processing-badge {
          padding: 6px 12px;
          background: #fff3cd;
          border-radius: 20px;
          color: #856404;
          font-size: 0.9em;
        }
        .video-placeholder {
          padding: 40px;
          text-align: center;
          background: #f8f9fa;
          border-radius: 12px;
          color: #6c757d;
        }
      `}</style>
    </div>
  );
};

export default PropertyDetail;