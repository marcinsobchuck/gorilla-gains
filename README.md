# Gorilla gains

This is a web application that lets the user to track and plan his fitness activity.

## Table of Contents

1. [Motivation](#motivation)
2. [Test credentials](#test-credentials)
3. [APIs used](#apis-used)
4. [Features](#features)
5. [Screenshots and GIFs](#screenshots-and-gifs)
6. [Project status and potential expansions](#project-status-and-potential-expansions)
7. [Frameworks and libraries](#frameworks-and-libraries)
8. [Launch](#launch)

---

### Motivation

The main reason I've made this applications was to easily note activities with specific exercises as well as track overall fitness progress.\
It was also made for educational purposes.

## Test credentials

If you don't want to go through the process of creating an account (credentials + 3 step form) here is a test account with already prefilled data.

- email: test@test.pl
- password: test123

## APIs used

- [**gorilla-gains-api**](https://github.com/marcinsobchuck/gorilla-gains-api)

## Features

#### Account

- user can create an account using email and password
- login and logout using JWT access token
- all the data collected from account creation can be changed in user settings (name, surname, age, gender, height, weight, desired weight, due date weight, activity level, current focus, password, e-mail)
- ability to reset password:
  - "forgot password" feature on entry view (reset link sent to provided e-mail)
  - changing password in user settings (must be logged in and provide current password)
- health related data is used to calculate indicators such as BMI, BMR, TDEE, PAL
- dark/light mode

#### Activities

- ability to create an activity with exercises specific to four activity types (strength, endurance, flexiblity, endurance) as well as other data like title, notes, perceived exertion
- ability to create preset from already created activity or via activity creation form
- ability to delete and edit activities
- ability to delete activity preset
- activities statistics such as activities per month in last the last year, average activities per week, overall activities done, etc.
- history of activities done (infinite scrolling)
- ability to view all activities (planned, resolved, unresolved) on calendar
- ability to view activity details

#### Exercises

- ability to track progress of specific exercises using charts (e.g. duration/date, load/date, etc.)
- exercises catalogue with filtering by activity type (infinite scrolling)
- ability to view exercise details (muscle groups, description, video etc.)
- ability to add/delete exercise to favourites (favourite exercises will appear on the top of the catalogue list and in the "choose exercise" select input when creating an activity)

**Note**

> The application was made with RWD in mind so it should look good on all devices although it is recommended to use on larger devices.

## Screenshots and GIFs

#### Account creation

![Account creation](https://res.cloudinary.com/dlqowgnyr/image/upload/v1749578640/account-creation-gif_juqqcn.gif)

#### Activity creation

![Activity creation](https://res.cloudinary.com/dlqowgnyr/image/upload/v1749824317/activity-creation-gif-compressed_fkflbx.gif)

#### Activities managing

![Activities managing](https://res.cloudinary.com/dlqowgnyr/image/upload/v1751316201/managing-activities-gif-compressed_pt8dxm.gif)

#### Charts

![Charts](https://res.cloudinary.com/dlqowgnyr/image/upload/v1751315553/charts-gif_sd33cy.gif)
      
#### Dashboard

![Dashboard light](https://res.cloudinary.com/dlqowgnyr/image/upload/v1749822384/dashboard-light_tstalg.png)
![Dashboard dark](https://res.cloudinary.com/dlqowgnyr/image/upload/v1749822758/dashboard-dark_ty5vo2.png)

#### History

![History light](https://res.cloudinary.com/dlqowgnyr/image/upload/v1749822639/history-light_vm5t3q.png)
![History dark](https://res.cloudinary.com/dlqowgnyr/image/upload/v1749822392/history-dark_we6wun.png)

#### Calendar

![Calendar light](https://res.cloudinary.com/dlqowgnyr/image/upload/v1749822377/calendar-light_ki8hm9.png)
![Calendar dark](https://res.cloudinary.com/dlqowgnyr/image/upload/v1749822703/calendar-dark_vk9rmq.png)

#### Exercises catalogue

![Exercises catalogue light](https://res.cloudinary.com/dlqowgnyr/image/upload/v1749822667/exercises-light_dijowc.png)
![Exercises catalogue dark](https://res.cloudinary.com/dlqowgnyr/image/upload/v1749822387/exercises-dark_tq9gui.png)

## Project status and potential expansions

Minimal requirements for the project to serve it's main purpose have been met, although there are some potential features that could be added in the future:

- AI coach that would suggest activities for the next **_n_** weeks/months
- ability to create your own training plan (basically adding several activities at once at specific intervals)
- ability to change profile picture
- add social media aspect to the application (activity feed, adding friends, etc.)

## Frameworks and libraries

### Core libraries

- React v18.2 + Typescript

### Routing & state Management

- react-router-dom v6
- react-redux + toolkit

### Styling

- styled-components
- react-loading-skeleton

### Forms & validation

- react-hook-form
- yup

### Date & time utilities

- date-fns
- react-datepicker
- fullcalendar

### Data visualization

- recharts

### UI Utilities & enhancements

- react-toastify
- react-select
- react-popper
- react-inlinevg

### Other utilities

- lodash

## Launch

To run the app use `npm install` then `npm run dev`.

**Note**

> To fully access the app's functionality, you need to have the [**gorilla-gains-api**](https://github.com/marcinsobchuck/gorilla-gains-api) server running, and a `.env` file configured with the `VITE_BASE_URL` variable pointing to the API's base URL (e.g., `http://localhost:3000/api`).
