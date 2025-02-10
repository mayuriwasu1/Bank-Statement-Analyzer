# Bank Statement Analyzer

A modern web application for analyzing bank statements and visualizing financial data.

## Features

- File upload for CSV bank statements
- Transaction list with sorting and filtering
- Financial summary metrics
- Interactive data visualizations
  - Monthly spending trends
  - Category breakdown
- Responsive design for all devices
- Error handling and loading states

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Design Decisions

1. **Component Structure**
   - Modular components for reusability
   - Clear separation of concerns
   - TypeScript for type safety

2. **User Experience**
   - Intuitive file upload with drag-and-drop
   - Loading states for async operations
   - Clear error messages
   - Responsive design for all devices

3. **Data Visualization**
   - Interactive charts for better understanding
   - Consistent color scheme
   - Clear labels and tooltips

4. **API Integration**
   - Mock API for development
   - Easy to replace with real endpoints
   - Proper error handling

## Assumptions

1. CSV file format for bank statements
2. Backend API will handle data parsing
3. All amounts are in USD
4. Transactions have consistent categorization

## Future Improvements

1. Add search and filtering
2. Export functionality
3. Custom date ranges
4. More detailed analytics
5. Multiple file upload support