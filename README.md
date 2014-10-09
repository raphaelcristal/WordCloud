WordCloud
=========

This is the repository for the WordCloud challenge.

## How to run
Clone this repository and then run:

```
npm install
npm start
```

This will start a local http server. Go visit [http://localhost:8080](http://localhost:8080) to find the application.

## How to test
Run

```
npm test
```

Then visit [http://localhost:9876/](http://localhost:9876/) to run the tests.

## Project structure

This is a very minimal solution. It only uses JQuery for DOM acces and UnderscoreJS for data transformations and templating. The main application code is located in src/app.js and is structured the following way:
* App.models.Topic: Creates a topic model from raw json. Unneeded data will be omited.
* App.viewHelpers: Transforms data for the view, e.g. picking the right color depending in the overall sentiment.
* App.view.topicView: Template for the word cloud.
* App.view.informationView: Template for the extended information on the right side after a topic was clicked.

There is also js/main.js where the data is pulled in and the event handlers are set up.
