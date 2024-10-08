# Job Application Tracker

The Job Application Tracker is a web application designed to help users manage and track their job applications. It allows users to add, edit, delete, search, filter, sort, and paginate job applications. Additionally, it provides a summary of the total number of applications and their statuses.

## Features

- **Add Job Applications:** Users can add new job applications with details such as company, position, status, application date, and notes.
- **Edit Job Applications:** Users can edit existing job applications to update their details.
- **Delete Job Applications:** Users can delete job applications with a confirmation popup to prevent accidental deletions.
- **Search and Filter:** Users can search for job applications by company or position and filter by status (Accepted, In-Progress, Rejected).
- **Sort and Paginate:** Users can sort job applications by various criteria (company, position, status, date applied) and navigate through pages of job applications.
- **Summary:** A summary section at the top of the page displays the total number of applications and the count for each status.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - Sequelize (ORM for database interactions)
  - SQLite (or any other SQL database)

- **Frontend:**
  - EJS (Embedded JavaScript templates)
  - Tailwind CSS (for styling)

## Project Structure

- **app.js:** The main application file that sets up the Express server, routes, and middleware.
- **models/jobApplication.js:** Sequelize model for the JobApplication entity.
- **views/index.ejs:** EJS template for displaying the list of job applications, search/filter/sort controls, and summary.
- **views/edit.ejs:** EJS template for editing a job application.
- **views/add.ejs:** EJS template for adding a new job application.

## Routes

- **GET /**: Displays the list of job applications with search, filter, sort, and pagination functionality. Fetches summary data for the total number of applications and their statuses.
- **GET /edit/:id**: Renders the form to edit a job application.
- **POST /edit/:id**: Handles the submission of the edit form to update a job application.
- **POST /delete/:id**: Handles the deletion of a job application with a confirmation popup.
- **GET /add**: Renders the form to add a new job application.
- **POST /add**: Handles the submission of the add form to create a new job application.

## How to Run

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd job-application-tracker

2. **Install dependencies:**
   ```sh
    npm install

3. **Run the applications:**
   ```sh
    node app.js

4. **Open your browser and navigate to:**
    http://localhost:3000


