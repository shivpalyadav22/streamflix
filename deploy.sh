#!/bin/bash

# 1. Install Vercel CLI
npm i -g vercel

# 2. Build the project
npm run build

# 3. Deploy to Vercel (free tier)
vercel --prod

# 4. Your app will be live at:
# https://streamflix-clone-[random].vercel.app

echo "🎉 Your StreamFlix is now live!"
echo "📱 Free domain: Check your terminal output"
echo "🔧 Custom domain: Add in Vercel dashboard"
