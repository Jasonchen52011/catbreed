# What Breed Is My Cat? 🐱

An AI-powered cat breed identification tool that helps you discover your cat's breed using advanced image recognition technology.

## Features

- 📸 **Easy Photo Upload** - Drag & drop or click to upload your cat's photo
- 🤖 **AI-Powered Analysis** - Uses Google Gemini Flash 2.0 for accurate breed identification
- 🎯 **Top 3 Results** - Get the most likely breeds with confidence percentages
- 📱 **Mobile Friendly** - Responsive design works great on all devices
- 🔍 **Detailed Breed Info** - Learn about your cat's characteristics, temperament, and care needs
- 🏆 **83 Recognized Breeds** - Supports breeds recognized by TICA, CFA, and FIFe

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini Flash 2.0
- **Architecture**: App Router

## Getting Started

### Prerequisites

- Node.js 18+ 
- Google AI API key (get one at [ai.google.dev](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd catbreed-identifier
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   ```

4. **Add cat images** (optional)
   Place cat breed images in the `public/cat/` directory. The JSON file references these images.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── api/identify/route.ts     # AI analysis API endpoint
│   ├── CatBreedIdentifier/       # Upload component
│   ├── result/page.tsx           # Results display page
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── public/
│   ├── cat.json                  # Cat breed database
│   └── cat/                      # Cat breed images
└── README.md
```

## How It Works

1. **Upload**: User uploads a cat photo
2. **Analysis**: Image is sent to Google Gemini Flash 2.0 for breed identification
3. **Matching**: AI results are matched with our breed database
4. **Display**: Top 3 breeds shown with confidence scores and detailed information

## Supported Cat Breeds

The app recognizes 83 cat breeds from major registries:
- TICA (The International Cat Association)
- CFA (Cat Fanciers' Association)  
- FIFe (Fédération Internationale Féline)

## API Usage

### POST /api/identify

Upload an image for breed identification.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: FormData with 'image' field

**Response:**
```json
{
  "breeds": [
    {"breed": "Persian", "confidence": 85},
    {"breed": "Ragdoll", "confidence": 12},
    {"breed": "Maine Coon", "confidence": 3}
  ],
  "originalImage": "data:image/jpeg;base64,..."
}
```

## Customization

### Adding New Breeds

1. Add breed information to `public/cat.json`
2. Add breed image to `public/cat/` directory
3. Update the `SUPPORTED_BREEDS` array in `app/api/identify/route.ts`

### Styling

The app uses Tailwind CSS. Customize colors and styling in:
- `tailwind.config.js` - Theme configuration
- `app/globals.css` - Global styles
- Component files - Component-specific styles

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `GOOGLE_AI_API_KEY` environment variable
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes!

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ for cat lovers everywhere! 🐾