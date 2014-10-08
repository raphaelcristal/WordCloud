'use strict';

describe('view helpers', function() {

    var topics = [
        {totalMentions: 12, sentimentScore: 20},
        {totalMentions: 13, sentimentScore: 40},
        {totalMentions: 22, sentimentScore: 50},
        {totalMentions: 52, sentimentScore: 60},
        {totalMentions: 79, sentimentScore: 80},
        {totalMentions: 89, sentimentScore: 100},
    ];

    describe('init', function() {

        it('should choose the correct window size', function() {
            App.viewHelpers.init(topics, 3)
            expect(App.viewHelpers.windowSize).toEqual(2);

            App.viewHelpers.init(topics, 2)
            expect(App.viewHelpers.windowSize).toEqual(3);

            App.viewHelpers.init(topics, 4)
            expect(App.viewHelpers.windowSize).toEqual(1);
        });

    });

    describe('getClassBySentiment', function() {
        it('should choose the right css class by popularity', function() {
            var negative = App.viewHelpers.getClassBySentiment(topics[0]);
            expect(negative).toEqual('negative');

            var neutral = App.viewHelpers.getClassBySentiment(topics[2]);
            expect(neutral).toEqual('neutral');

            var positive = App.viewHelpers.getClassBySentiment(topics[5]);
            expect(positive).toEqual('positive');
        });
    });

    describe('getSizeByPopularity', function() {
        it('should choose the right size depending on the popularity', function() {
            App.viewHelpers.init(topics, 3);

            expect(App.viewHelpers.getSizeByPopularity(topics[0])).toEqual('size0');
            expect(App.viewHelpers.getSizeByPopularity(topics[1])).toEqual('size0');
            expect(App.viewHelpers.getSizeByPopularity(topics[2])).toEqual('size1');
            expect(App.viewHelpers.getSizeByPopularity(topics[3])).toEqual('size1');
            expect(App.viewHelpers.getSizeByPopularity(topics[4])).toEqual('size2');
            expect(App.viewHelpers.getSizeByPopularity(topics[5])).toEqual('size2');
        });

    });

});
