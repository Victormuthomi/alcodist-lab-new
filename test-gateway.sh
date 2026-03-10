#!/bin/bash
BASE_URL="http://localhost:3000"

echo "🚀 [GATEWAY TEST] Starting unified flow..."

# 1. Create Worker
WORKER=$(curl -s -X POST $BASE_URL/workers \
-H "Content-Type: application/json" \
-d '{"firstName": "Muthomi", "lastName": "Victor", "email": "mv@alcodist.io"}')
W_ID=$(echo $WORKER | jq -r '.id')
echo "👤 Worker Created via 3000: $W_ID"

# 2. Create Workplace
WP=$(curl -s -X POST $BASE_URL/workplaces \
-H "Content-Type: application/json" \
-d '{"name": "Alcodist Labs HQ", "address": "Nairobi, Kenya"}')
WP_ID=$(echo $WP | jq -r '.id')
echo "🏢 Workplace Created via 3000: $WP_ID"

sleep 1

# 3. Create Shift
echo "⏳ Scheduling Shift via 3000..."
curl -s -X POST $BASE_URL/shifts \
-H "Content-Type: application/json" \
-d "{
  \"workerId\": \"$W_ID\",
  \"workplaceId\": \"$WP_ID\",
  \"startTime\": \"2026-03-12T08:00:00Z\",
  \"endTime\": \"2026-03-12T17:00:00Z\"
}" | jq '.'
