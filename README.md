# 🧪 MCP AI Travel Agent (Demo Project)

A simple CLI project that combines Bright Data’s **Browser API (MCP)** with **OpenAI** to scrape hotel listings and generate a 3-day travel itinerary using AI.

This is **not** a full-featured travel planner — it's a real-world, minimal example that shows:
- How to bypass bot detection on modern websites using Bright Data's MCP
- How to extract structured data with Playwright
- How to use OpenAI to generate meaningful summaries or plans from scraped content

I made this for a video to show how to use MCP with OpenAI and Playwright.

## 🚀 What This Does

- ✅ Scrapes hotel listings from [Booking.com](https://booking.com)
- ✅ Bypasses CAPTCHAs and bot detection with **Bright Data's Browser API**
- ✅ Uses **OpenAI GPT-4** to turn scraped data into an itinerary
- ✅ CLI-based and easy to run
- ✅ Great for devs learning agent workflows, scraping, or real-time data use in AI apps


## 🛠️ Requirements

- Node.js v16+
- npm or yarn
- Bright Data account with **Browser API (MCP)** access
- OpenAI API key

## 🔧 Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/mcp-ai-travel-agent.git
cd mcp-ai-travel-agent
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Bright Data

1. Sign up for a [Bright Data account](https://brdta.com/fknight) if you don't have one
2. Go to the Bright Data dashboard
3. Click "Add Zone" and select "Browser"
4. Configure the Browser API:
   - Enable "CAPTCHA Solver"
   - Note the WebSocket URL (it will look like `wss://brd-customer-...`)
5. Find your authentication credentials in the "Access parameters" section

### 4. Set up OpenAI

1. Go to [OpenAI's API keys page](https://platform.openai.com/account/api-keys)
2. Create a new secret key if you don't have one
3. Copy the API key

### 5. Configure Environment Variables

Create a `.env` file in the project root with the following content:

```env
# Bright Data MCP
PLAYWRIGHT_WS_ENDPOINT=wss://brd-customer-<YOUR_CUSTOMER_ID>-<RANDOM_STRING>:<PASSWORD>@brd.superproxy.io:9222

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here
```

Replace the placeholders with your actual credentials.

## 🏃‍♂️ Usage

Run the travel agent with:

```bash
./travelAgent.js <city> <checkin YYYY-MM-DD> <checkout YYYY-MM-DD>
```

Example:
```bash
./travelAgent.js "New York" "2025-06-15" "2025-06-20"
```

## 🤖 How It Works

The MCP magic happens with just one line of code:

```javascript
const browser = await chromium.connectOverCDP(process.env.PLAYWRIGHT_WS_ENDPOINT);
```

This single line connects to Bright Data's Browser API, which handles:
- Browser automation
- IP rotation
- CAPTCHA solving
- Headless browser management

## 🔒 Security

Never commit your `.env` file or share your API keys. The `.gitignore` file is already set up to prevent accidental commits of sensitive information.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Bright Data](https://brdta.com/fknight) for their powerful Browser API
- [OpenAI](https://openai.com/) for their amazing AI capabilities
- [Playwright](https://playwright.dev/) for reliable browser automation
