## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* Tested on node v8.9.1

## Quick Install
The quickest way to get started with the Overloop tech test is to clone the project and utilize it like this:

Install dependencies:

    $ npm install

To start the development server you can use:

    $ npm start

Note that the server will be started on port 8000, and by default React will be served on port 3000. You will need to have a running MongoDB server.

## Which bit of code does what?
  * The Server is found under the `server/` directory
    - The Model, `server/models/article.js` - Where we define our object schema.
    - The Controller, `server/controllers/articles.js` - Where we take care of our backend logic.
    - Koa Routes, `server/routes/index.js` - Where we define our REST service routes.
    - The Config file, `server/config.js` - Where we define the Mongo connection string.
  * The React Front End is found under the `src/` directory.
    - The Main App, `src/App.js` - Renders the template and handles routing.
    - The Article Components, found in the `src/articles/` directory handle displaying things related to the articles.

## Package information
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

[Koa](http://koajs.com/) is being used for the Node server application, and [koa-router](https://github.com/alexmingoia/koa-router) is being used for server-side routing.

## What do I need to do?

The current application allows users to create and edit articles, which consist of a title and a body. There is also a way to see all the articles in the system.

The changes we'd like you to make are the following:
Currently an article has a title and content. We need to extend that model to store for each article a list of territories in which that article is available. The idea is similar to the way some YouTube videos might not be available in some countries.
So for example, one article might be available in France, Germany and Belgium.
Another article might be available in France, Belgium and UK.
The user needs to be able to see which territories an article is available in and be able to update that as well.

If you get that to work, then we need to create a way for a user to enter one or more territories and show the user all the articles that are available in all of those territories.
So in the above example, if the user entered Germany, only the first article would be returned.
If the user entered France, both articles would be returned.
If the user entered France and Belgium it would still return both articles.
If the user entered France and UK, only the second article would be returned.

Don't worry if you don't get all of that to work (obviously great if you do), the point is to see how you approach a problem like that. A system that works but only fulfils part of the requirements is preferable over a system that does not work but tries to fulfil more requirements.
