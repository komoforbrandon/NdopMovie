# Ndop Movie App (NdopFlix)

Your ultimate destination for movies and TV shows. Explore thousands of titles and find your next favorite entertainment. The app is built with React, Vite, and TypeScript, and uses the TMDB API to fetch movie data.

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** 16.x or higher
- **npm** 7.x or higher (or yarn, pnpm)
- A TMDB API key (get it for free at [TMDB API](https://www.themoviedb.org/settings/api))

## Getting Started (Usage)
To get started with the Ndop Movie App, follow these steps:
1. Clone the repository
```bash
git clone https://github.com/komoforbrandon/NdopMovie.git
cd NdopMovie
```
2. Install dependencies
```bash
npm install
```
3. Set up environment variables
   - Create a `.env.local` file in the root directory of the project
   - Add your TMDB API key:
   ```env
   VITE_TMD_API_KEY=your_tmdb_api_key_here
   ```
   - Replace `your_tmdb_api_key_here` with your actual TMDB API key
4. Run the development server
```bash
npm run dev
```
5. Open your browser and navigate to `http://localhost:5173` to see the app


## Features
- Browse popular movies and TV shows
- Search for specific titles
- View detailed information about movies and TV shows
- Responsive design for mobile and desktop
- Save your favorite movies and shows
- Watch trailers and clips

## Project Structure
```
src/
├── components/       # Reusable React components (navbar, footer, movie cards, etc.)
├── pages/           # Page components (Home, Movie, TV Shows, Profile, Saved)
├── Router/          # Routing configuration
├── service/         # API calls and external service integrations
├── types/           # TypeScript type definitions
├── hooks/           # Custom React hooks
├── assets/          # Images, icons, and other static assets
├── App.tsx          # Main App component
├── main.tsx         # Application entry point
├── App.css          # Global styles
└── index.css        # Base styles
```

## Example Output
![Ndop Movie App Screenshot](/public/screenshot.png)

## Technologies Used
- React
- Vite
- TypeScript
- TMDB API
- Tailwind CSS

## Build for Production
To create an optimized production build:
```bash
npm run build
```
This will generate a `dist/` folder with the optimized production files.

## Available Scripts
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Troubleshooting

### Issue: "VITE_TMD_API_KEY is not defined"
- **Solution**: Make sure you've created the `.env.local` file in the root directory and added your TMDB API key correctly.

### Issue: Movies/TV shows are not loading
- **Solution**: 
  - Verify your TMDB API key is valid
  - Check that your API key has the correct permissions at [TMDB Settings](https://www.themoviedb.org/settings/api)
  - Check browser console (F12) for network errors

### Issue: Port 5173 is already in use
- **Solution**: Either kill the process using port 5173 or run `npm run dev -- --port 3000` to use a different port.

## Contributing
Contributions are welcome! If you have any suggestions or improvements, please feel free to submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details

## Acknowledgements
- [TMDB API](https://www.themoviedb.org/documentation/api) for providing movie data
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [TypeScript](https://www.typescriptlang.org/) for type safety

## Contact
If you have any questions or feedback, please feel free to contact me at [kbrandn25@gmail.com](mailto:kbrandn25@gmail.com)
