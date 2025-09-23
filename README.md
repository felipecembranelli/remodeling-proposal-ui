# Landscaping Proposal System

A modern web application that uses AI to generate professional landscaping proposals with accurate cost estimates, material requirements, and timelines.


## Application Overview
![alt text](doc/lsp_landing.JPG)

![alt text](doc/lsp_prop_detail.JPG)


## Architecture Overview

![alt text](doc/lsp_arch_overview.JPG)


## Features

- AI-powered proposal generation using GPT-4
- Accurate cost estimation based on property size, type, and region
- Material and labor cost calculations
- Seasonal pricing adjustments
- Regional pricing considerations
- Modern, responsive UI built with Next.js
- RESTful API built with .NET Core
- Entity Framework Core for data persistence
- Swagger documentation for API endpoints

## Prerequisites

- Node.js 18.x or later
- .NET 8.0 SDK
- SQL Server (LocalDB or full instance)
- OpenAI API key

## Setup

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Update the `appsettings.json` file with your OpenAI API key and database connection string.

3. Apply database migrations:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

4. Start the API:
   ```bash
   dotnet run --project LandscapingProposalSystem.API
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Fill in the property details form
3. Select the desired landscaping services
4. Review the generated proposal
5. Save or export the proposal

## API Endpoints

- `POST /api/proposals` - Create a new proposal
- `GET /api/proposals` - Get all proposals
- `GET /api/proposals/{id}` - Get a specific proposal
- `PUT /api/proposals/{id}` - Update a proposal
- `DELETE /api/proposals/{id}` - Delete a proposal

## Architecture

The solution follows a clean architecture pattern with the following layers:

- **Frontend**: Next.js application with Material-UI components
- **API**: .NET Core Web API with controllers and middleware
- **Core**: Domain models, interfaces, and business logic
- **Infrastructure**: Data access, external service integrations, and implementations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 