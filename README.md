# React Portfolio Demo - 2023

[Live Site](https://www.mackenziebaksh.com)

This project was created with [Create React App](https://github.com/facebook/create-react-app).

`This project is a demo react app styled using Material UI that showcases some of my skill set.`

I plan to make this my official portfolio/reference guide going forward.

I will build on it over time to make a hub containing optimized code snippets & other cool things that can be done with programming.

Note: Charts are displayed using mock data.

## Key Features

- Customizable theme setup - changes made in ./src/theme.js , Dark/Light mode enabled.
- Auto complete search bar.
- Integrated charting library.
- Drag & Drop enabled for memes page.
- GET & POST API calls initiated.
- Map over data for filtering & pagination.
- Exportable CSV from data tables.
- Toast notifications enabled.
- Validate form inputs & capture to database solution.
- Page load interaction.
- Integrated sidebar w/ custom css.
- Firebase hosting used for deployment.

## Branches

### `addAPI`

- express API for mockData - configured with firebase cloud functions

  > - [ ] req param validation via typescript
  > - [ ] update authorization via jwt
  > - [ ] add all data & files to endpoint

  - GET: /api/data/skills - get all skills
  - POST: /api/data/updateSkills - update skills

  ```
  {
      "Ajax": { "title": "Ajax", "start": 2015, "info": "", "status": "active" },
      "PHP": { "title": "PHP", "start": 2015, "info": "", "status": "active" }
  }
  ```

### `configureTesting`

- restructure files for scalability & initiate testing suite

  > - [ ] test all components
  > - [ ] utilize cypress

### `configureCI/CD`

- added yaml configuration for github actions

  > - [ ] add deploy to multiple hosting sources

## Folders

```
/src
/public
/server
```

## Available Scripts

In the project directory after installing all dependencies using `npm i`, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view the project in your browser.

The page will reload when you make changes.\
You may also see some lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
This process bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

## Issues/Fixes Needed

- Topbar component has a slight padding issue. Without padding the icon hover effect turns into an oval instead of a circle. If padding is added the background of the search box in dark mode bleeds outside the outline. Can be fixed by adding the required padding and changing the color scheme for dark mode.

- Sidebar component does not persist page selected after page reload. Also does not capture page selected if link is visited directly. Solution would be to set a global state for the current page.

- Responsive mobile design needed.

## Tasklist

- [x] Transfer mockData to DB solution & serve via API
- [x] Add unit testing
- [ ] Decouple components
- [x] Integrate CI/CD solution
- [ ] Configure load balancing
- [ ] Add analytics solution
- [ ] Add authentication/authorization

## Deployment

- Build the final application by running `npm run build`
- This application can be served locally by installing the Serve package globally and running\
  `serve ./build`
