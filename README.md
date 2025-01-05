# Second Harvest Produce Mobile Calendar 🥬

[![Deploy to GitHub Pages](https://github.com/BradleyHo/shsv-produce-mobile/actions/workflows/deploy.yml/badge.svg)](https://github.com/BradleyHo/shsv-produce-mobile/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, bilingual web application for accessing Second Harvest Food Bank's Produce Mobile schedule in Santa Clara County. Built with React 19 and modern web technologies.

## 🌟 Features

- 📅 Interactive calendar view with recurring event support
- 🗺️ Location-based map interface using OpenStreetMap
- 📱 Mobile-responsive design with dark mode support
- 🌍 Bilingual support (English/Spanish)
- 🔍 Search and filter capabilities
- 📍 Geolocation for finding nearest distribution points

## 🚀 Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/BradleyHo/shsv-produce-mobile.git

# Install dependencies
cd shsv-produce-mobile
npm install

# Start development server
npm run dev
\`\`\`

## 🏗️ Project Structure

\`\`\`
src/
├── components/          # React components
│   ├── Calendar/       # Calendar related components
│   │   ├── CalendarView.jsx
│   │   └── EventCard.jsx
│   ├── Map/           # Map related components
│   │   └── MapView.jsx
│   ├── List/          # List view components
│   │   └── ListView.jsx
│   └── common/        # Shared components
│       ├── ErrorBoundary.jsx
│       └── LoadingSpinner.jsx
├── data/              # Static data and configurations
│   └── locations.js
├── utils/             # Utility functions
│   └── dateUtils.js
├── i18n/              # Translation files
│   └── translations.js
└── test/             # Test setup and configurations
    └── setup.ts

public/               # Static assets
docs/                # Documentation site
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
\`\`\`

## 🚀 Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## 📚 Documentation

For more detailed documentation, visit our [documentation site](https://bradleyho.github.io/shsv-produce-mobile/docs).

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Data provided by [Second Harvest Food Bank](https://www.shfb.org/)
- Map data © [OpenStreetMap](https://www.openstreetmap.org/) contributors
- Icons by [Lucide](https://lucide.dev/)
