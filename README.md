# Movie Search App

This is a small React app that lets you search for movies and TV shows using a public API. It shows the title, picture, year, rating, and a short description for each result.

## What this app does

- You type a movie or show name into the search box.
- The app sends that name to the TVMaze API.
- The API sends back a list of shows that match your search.
- The app shows those results as cards on the page.

This is a great first React app because it uses data from the internet and displays it in a simple, nice way.

## Files in this project and what they do

### `package.json`

This file tells the computer what packages the app needs.

- `react` and `react-dom` are the main React tools.
- `vite` is the tool that runs the app while you build it.
- `@vitejs/plugin-react` helps Vite understand React files.
- The `scripts` section has commands like `npm run dev` to start the app.

### `vite.config.js`

This file tells Vite how to run the app.

- It uses the React plugin so Vite can load `.jsx` files.
- It also sets the local server port to `4173`.

### `index.html`

This is the small page that loads the React app.

- It has a `<div id="root"></div>` where React puts the app.
- It loads `src/main.jsx`, which starts React.

### `src/main.jsx`

This file is the app starter.

- It imports React and the main `App` component.
- It imports the `styles.css` file so the app looks nice.
- It tells React to put the app inside the `root` div from `index.html`.

### `src/App.jsx`

This is the main app code.

- `useState` is a React tool that keeps track of data.
- `query` stores what you type in the search box.
- `movies` stores the list of results from the API.
- `loading` shows when the app is waiting for the API.
- `error` stores any message if something goes wrong.

The app has a function called `searchMovies`:

- It sends the search word to `https://api.tvmaze.com/search/shows?q=`.
- It waits for the API to answer.
- If the answer is good, it stores the list of shows in `movies`.
- If there are no results, it shows a message like "No matches found.".
- If the API does not work, it shows an error.

The app also has a `handleSubmit` function:

- When you press Search, it stops the browser from reloading.
- It makes sure the search box is not empty.
- Then it calls `searchMovies`.

Inside the `return` part, the app builds the page:

- A header with a title, explanation, and the search form.
- The search form has a box and a button.
- If there is an error, it shows a red message.
- If there are no results yet, it shows a note telling you to search.
- If there are results, it shows cards with:
  - the movie picture
  - the movie name
  - the year it started
  - the type (like "Scripted")
  - the rating
  - the description
  - the genres

The `cleanSummary` function removes HTML tags from the summary text. The API sends some summaries with HTML, and this makes them look like plain words.

### `src/styles.css`

This file makes the app look good.

- It sets dark background colors and readable text.
- It makes the search box and button look clean.
- It makes the cards line up nicely on the page.
- It also makes the layout work on small screens like phones.

### `.gitignore`

This file tells Git which files not to save.

- `node_modules` is where downloaded packages live, and it is not saved.
- `dist` is the build folder, and it is not saved.
- `.env` is for secret settings, and it is not saved.
- `.DS_Store` is a Mac file, and it is not saved.

## How the app works like a story

1. The page loads and React starts.
2. You type a search word into the box.
3. You press the Search button.
4. The app asks the TVMaze API for matches.
5. The API sends back shows.
6. The app shows those shows as cards.

If the search is empty, the app does not ask the API.
If the API cannot be reached, the app shows an error message.

## Run the app locally

```bash
cd 'React Project'
npm install
npm run dev
```

Then open the local URL that Vite shows in the terminal.

## Why this is a good first project

- It uses real data from the internet.
- It shows how React keeps track of information with state.
- It has a search form and results page.
- It has very simple files that work together.

If you want, I can also add a button to show only the top results or save favorite movies next.

