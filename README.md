# YouTube Clone

A responsive and performant video streaming application built with React, leveraging the YouTube Live API for fetching and displaying video streams. The application mimics core functionalities of YouTube, providing an engaging user experience with advanced features like optimized search and data caching.

## Features

- **Live Video Streaming**: Fetches and displays live video streams using the YouTube Live API.
- **Search Optimization**: Enhanced search functionality with debouncing for better performance and user experience.
- **Data Caching**: Implements Tanstack Query to minimize network calls and improve app performance.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS, ensuring compatibility across devices.
- **State Management**: Efficiently handles app state with Redux for seamless user interactions.

## Tech Stack

- **Frontend**: React, JavaScript, Tailwind CSS
- **State Management**: Redux
- **API Integration**: YouTube Live API
- **Caching**: Tanstack Query

## Getting Started

Follow these steps to get the project up and running locally:

### Prerequisites

- Node.js (v16 or above)
- NPM or Yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/zafarimam8588/youtube_clone.git
   cd youtube-clone
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your YouTube API key:

   ```env
   REACT_APP_YOUTUBE_API_KEY=your_api_key_here
   ```

4. Run the application:

   ```sh
   npm start
   # or
   yarn start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Screenshots

- **Homepage**
- **Search Results**

## Folder Structure

youtube-clone/
├── public/
├── src/
│ ├── components/ # Reusable components (e.g., VideoCard, Navbar)
│ ├── pages/ # Pages (e.g., Home, SearchResults)
│ ├── redux/ # Redux slices and store setup
│ ├── utils/ # Utility functions (e.g., API calls, debouncing)
│ ├── App.js # Main app component
│ └── index.js # Entry point
├── .env # Environment variables
├── package.json # Dependencies and scripts
└── README.md # Project documentation
