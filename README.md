# library-seat-api-simulator
A small project for my samrt agent homework in grade 1.

# Library Seat API

This API fetches library seat data from GitHub Pages and formats it for Coze knowledge base import.

## API Endpoint

- `GET /api/seats` - Returns formatted library seat data

## Response Format

```json
{
  "data": [
    {
      "seat_id": "L0-101",
      "occupied": false,
      "occupancy_rate": 0.25,
      "has_outlet": true,
      "near_window": false,
      "air_conditioning": "中",
      "floor": "L0（地下自习区）",
      "recommend_score": 82,
      "features": "24小时开放, 插座充足, 安静",
      "last_updated": "2026-01-16T15:58:30Z",
      "sensor_health": "正常"
    }
  ],
  "total": 8,
  "timestamp": "2026-01-17T10:00:00Z",
  "source": "https://kookaeu.github.io/library-seat-demo/"
}
