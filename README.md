# Event Planner

Event Planner is a web application that allows users to manage a list of their events. Users can add new events, delete existing, edit events, search events by many filters and by title or description.

## Features

- View a list of events with their details.
- Add a new events to the list.
- Delete a events from the list.
- Edit events.
- Search for events based on specific criteria.
- Apply filters to sort the events list.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Tailwind-CSS: A popular CSS framework for web-applications.
- React-router: Client side routing library for React applications.
- Axios: A promise-based HTTP client for making API requests.
- Context API: A state management solution provided by React for sharing data between components.
- React-hook-form: A library for handling forms in a React application.
- Yup: A library for validation inputs.
- React-toastify: A library for notifications.

## Getting Started

To get started with the Event Planner, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/vitaliy-kro/softryzen-test.git
```

2. Install the dependencies:

```shell
npm install
```

3. Configure environment variables:
   Add the .env file with **REACT_APP_CLOUDINARY_CLOUD_NAME** and **REACT_APP_CLOUDINARY_PRESET_NAME** to have access to load images to you cloudinary.

4. Starting development server

```shell
npm start
```

5. Open an application. Open your web browser and visit `http://localhost:3000` to access Event Planner.

## Usage

1. Add a new event:
- Click on the **"+/Add new event"** button.
- Fill in the required details in the form.
- Click on the **"Add"** button to add the event to the list.

2. Delete an event:

- Locate the event you want to delete in the event list.
- Click on the event.
- Click on the **"Delete"** button.
- Confirm the deletion when prompted.

3. Edit an event:

- Locate the event you want to edit in the event list.
- Click on the event.
- Click on the **"Edit"** button.
- Update the details in the form.
- Click on the **"Save"** button to save the changes.

4. Search for events:

- Enter a search term in the search bar.
- The event list will be filtered based on the search term.

5. Apply filters:
- Select a filter option from the dropdown menu.
- The event list will be sorted based on the selected filter.

## Contributing
Contributions to the Event Planner are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://choosealicense.com/licenses/mit/) file for details.