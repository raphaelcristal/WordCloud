'use strict';

var App = {
    Models: {},
    Views: {},
};

App.Models.Topic = function(topic) {

    this.id = topic.id;
    this.label = topic.label;
    this.totalMentions = topic.volume;
    this.sentiment = topic.sentiment;
    this.sentimentScore = topic.sentimentScore;

};

App.viewHelpers = {
    init: function(topics, numOfTextSizes) {
        this.numOfTextSizes = numOfTextSizes;
        this.popularities = _
            .chain(_.values(topics))
            .map(function(topic) {
                    return topic.totalMentions;
                })
            .uniq()
            .sortBy()
            .value();
        this.windowSize = parseInt(this.popularities.length / this.numOfTextSizes);
    },

    getClassBySentiment: function(topic) {
        if(topic.sentimentScore < 40) {
            return 'negative';
        } else if(topic.sentimentScore > 60) {
            return 'positive';
        } else {
            return 'neutral';
        }
    },

    getSizeByPopularity: function(topic) {
        var index = this.popularities.indexOf(topic.totalMentions);
        var popularity = parseInt(index / this.windowSize, 10);

        //cap to max value
        popularity = popularity >= this.numOfTextSizes ? this.numOfTextSizes - 1 : popularity;

        return 'size' + popularity;
    },
};

App.Views.topicsView = _.template(
    '<% _.each(topics, function(topic) { %>' +
        '<a id="<%= topic.id %>" class="topic ' +
                                           '<% print(h.getClassBySentiment(topic));' +
                                           'print(" ");' +
                                           'print(h.getSizeByPopularity(topic))%>">' +
            '<%= topic.label %>' +
        '</a>' +
    '<% }); %>'
);

App.Views.informationView = _.template(
        '<h4>Information on topic "<%= topic.label %>"</h4>' +
        '<p>Total Mentions: <%= topic.totalMentions || 0 %></p>' +
        '<ul>' +
            '<li>Positive Mentions: <%= topic.sentiment.positive || 0 %></li>' +
            '<li>Neutral Mentions: <%= topic.sentiment.neutral || 0 %></li>' +
            '<li>Negative Mentions: <%= topic.sentiment.negative || 0%></li>' +
        '</ul>'
    );

