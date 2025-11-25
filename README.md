SaaS Task Management App

A minimal SaaS-style task management application built using:

Node.js + Express (Backend API)

Next.js (Frontend)

Agile Scrum practices (User Stories, Scrum board, Issues)

TDD & BDD using Jest and Cucumber.js

This project implements the required features:
Create, Read, Update, Delete tasks + Agile documentation + tests.

 Installation & Setup
Backend (server)
cd server
npm install
npm start      # runs development server


Backend runs at:
http://localhost:5000

Frontend (client)
cd client
npm install
npm run dev


Frontend runs at:
http://localhost:3000

Testing
Unit Tests (Jest)
npm test

BDD Tests (Cucumber.js)
npm run cucumber

User Stories (Agile Scrum Format)
1. Create Task

As a user
I want to add a new task with a title, description, and due date
So that I can organize what I need to do

2. View All Tasks

As a user
I want to view all my tasks
So that I can track what needs to be completed

3. Update Task Status

As a user
I want to mark a task as complete or incomplete
So that I can keep track of my progress

4. Delete Task

As a user
I want to delete a task
So that I can remove tasks I no longer need

5. BDD Acceptance Story

As a user
I want to add a task and see it appear in the task list
So that I can confirm it was successfully created

Acceptance Criteria:

Given I am using the system

When I create a task

Then I should see it appear in the tasks list

Scrum Artifacts

This project includes:

Issues on GitHub for each User Story

Scrum board (To Do → In Progress → Done)

Milestone for the Sprint

Feature files for BDD and unit tests

