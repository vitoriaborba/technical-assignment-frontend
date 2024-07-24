## Overview
The Technical Assignment Frontend is a web application designed to interact with the brewery API. It allows users to search for breweries, view details, and manage a list of favorite breweries. The application includes a loading spinner to enhance user experience by indicating when data is being fetched.

## Features

Search Breweries: Search breweries by name, city, state, and type.
View Details: View detailed information about a selected brewery.
Favorites: Add or remove breweries from a list of favorites.
Pagination: Navigate through pages of search results.
Loading Spinner: Provides visual feedback during data loading operations.

## Technologies Used
Angular: Frontend framework for building the application.
RxJS: Reactive programming library used for managing asynchronous data.

## Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js (version 14 or later)
npm (Node Package Manager) or yarn
Angular CLI (Command Line Interface)

## Setup Instructions
Clone the repository to your local machine.
Install the necessary dependencies using npm or yarn.
Start the project using 'ng serve'.
Do not forget to run the backend so you will have the data available.

## Usage
Search for Breweries: Use the search form to filter breweries by name, city, state, and type. Click the "Search" button to see results.
View Details: Click on a brewery to view more details about it.
Manage Favorites: Add or remove breweries from your favorites list by clicking the heart icon next to the brewery.
Loading Spinner: When performing searches or fetching data, a spinning loader will appear to indicate that data is being loaded. This provides visual feedback and improves user experience by showing that the application is actively working.

