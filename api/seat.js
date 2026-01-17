// 获取图书馆座位数据并转换为扣子知识库格式 - Node.js 24兼容版本
export default async function handler(req, res) {
  try {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    // 获取原始数据
    const response = await fetch('https://kookaeu.github.io/library-seat-demo/');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const originalData = await response.json();
    
    // 转换为扁平化格式，适合表格导入
    const formattedData = [];
    
    // 遍历每个楼层
    Object.keys(originalData.data).forEach(floorKey => {
      const floorData = originalData.data[floorKey];
      
      floorData.forEach(seat => {
        formattedData.push({
          seat_id: seat.seat_id,
          occupied: seat.occupied,
          occupancy_rate: seat.occupancy_rate,
          has_outlet: seat.has_outlet,
          near_window: seat.near_window,
          air_conditioning: seat.air_conditioning,
          floor: seat.floor,
          recommend_score: seat.recommend_score,
          features: Array.isArray(seat.features) ? seat.features.join(', ') : seat.features,
          last_updated: seat.last_updated,
          sensor_health: seat.sensor_health
        });
      });
    });
    
    // 返回扣子知识库要求的标准格式
    res.status(200).json({
      data: formattedData,
      total: formattedData.length,
      timestamp: new Date().toISOString(),
      source: "https://kookaeu.github.io/library-seat-demo/"
    });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: "Failed to fetch library seat data",
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
