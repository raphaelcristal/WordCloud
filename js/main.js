$(function() {

    $.getJSON('data/topics.json', function(data) {
        var topics = {};

        _.each(data.topics, function(topic) {
            topics[topic.id] = new App.Models.Topic(topic);
        });

        App.viewHelpers.init(_.values(topics), 6);

        var topicsViewRendered = App.Views.topicsView({
            h: App.viewHelpers,
            topics: _.chain(topics).values().shuffle().value(),
        });

        $('#wordcloud').html(topicsViewRendered);

        $('.topic').click(function(e) {
            e.preventDefault();
            var topic = topics[$(this).attr('id')];
            var informationViewRendered = App.Views.informationView({topic: topic});
            $('#information').html(informationViewRendered);
        });


    });

});
