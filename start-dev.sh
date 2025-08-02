#!/bin/bash

# Kill any existing Next.js processes
pkill -f "next dev" 2>/dev/null || true

# Wait a moment
sleep 2

# Clear Next.js cache
rm -rf .next

# Start the development server
echo "Starting Next.js development server..."
npm run dev

echo "Server should be running at:"
echo "- http://localhost:3000"
echo "- http://127.0.0.1:3000"