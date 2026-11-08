# Wikipedia Rabbit Hole

Wikipedia Rabbit Hole is a browser game built with React, JavaScript, and CSS. The idea came from the way you can start reading one Wikipedia article and somehow end up on a completely unrelated topic after following links for a while.

I wanted to turn that experience into a game.

You get a starting article and a target article. Your job is to reach the target by clicking only the related Wikipedia articles shown on the screen. You have a limited number of moves, depending on the difficulty you choose.

## How to Play

1. The game randomly selects two articles from popular Wikipedia pages.
2. One becomes your starting article and the other becomes your target.
3. Click the **Related Links** button to see articles connected to your current article.
4. Choose one of the related articles to move forward.
5. Keep following links until you reach the target.

You win if you reach the target within the allowed number of moves. Otherwise, you lose when you reach the maximum depth.

## Difficulty Levels

| Difficulty | Maximum Depth |
|---|---:|
| Easy | 30 |
| Medium | 20 |
| Hard | 10 |

## Features

- Randomly selected starting and target articles.
- Article titles, descriptions, and thumbnails fetched from Wikipedia.
- Related articles generated dynamically based on the current article.
- Animated connection lines between the current article and related links.
- Related-link buttons with fade-in and hover animations.
- Visited article history with horizontal scrolling.
- Ability to change difficulty during a game.
- Rabbit hole depth counter and progress bar.
- Win and loss popups.
- Restart functionality.
- Background and card styling that change the overall look of the game.

## How the Data Is Retrieved

The project uses Wikimedia's APIs to get the articles and information needed for the game.

### Wikimedia Pageviews API

Used to get a list of popular Wikipedia articles. These are used to randomly select the starting and target articles.

API: `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/`

### Wikipedia REST API

Used to retrieve article summaries, thumbnails, and descriptions.

API: `https://en.wikipedia.org/api/rest_v1/page/summary/`

### MediaWiki Action API

Used to retrieve links from the current article and get additional information about those related articles.

API: `https://en.wikipedia.org/w/api.php`

## Tech Stack

- React
- JavaScript
- HTML
- CSS
- Vite
- Wikimedia APIs



This started as a regular HTML, CSS, and JavaScript project. I later rebuilt it in React to get more comfortable with components, props, state management, hooks, and handling API data.

The idea was to make something interactive rather than another basic API-based project. There was also quite a bit of experimenting with CSS positioning, animations, and dynamically updating the UI.

Try starting with a random topic and see how far you can get from it.