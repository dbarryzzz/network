import * as constants from '../constants';

const maxRating = 20.0
const totalRating = 60.0  // TODO: update when comparing entire timeslot
const baseLeadIn = 4.0;


const channelStickiness = 0.5;
const viewerFanAttachment = 0.9; // viewer's willingness to view a favorite shown
const viewerCuriosity = 0.4;    // viewer's willingness to view a known show
const viewerExploration = 0.1;  // viewer's willingness to view an unknown show

export function runWeek(episodes, seriesById, week){
    // for now this is single network
    var updatedEpisodes = [];

    // top rated ~15
    // 30th ~7-8

    var leadIn = 0;
    // eventually compare against other shows at that time, for now it's show-specific
    for(var d in constants.weekdays){
        // run day by day
        var dailyEpisodes = getDailyEpisodes(episodes, d);
        dailyEpisodes.forEach(e => {
            var series = seriesById[e.seriesId];
            leadIn = (e.time == 0 ? baseLeadIn : leadIn);
            var retainedRating = leadIn * channelStickiness;  // TODO: max flavor alignment affect retention
            var recruitedViewers = (series.stats.fandom * viewerFanAttachment) 
                + ((series.stats.awareness - series.stats.fandom)  * viewerCuriosity)
                + ((100 - series.stats.awareness) * viewerExploration);
               
            var rating = Math.floor((retainedRating 
                + ((maxRating - retainedRating) * recruitedViewers) / 100 )
                 * 10) / 10;  // round to 1 decimal

            var share = Math.floor(rating / totalRating * 100);

            leadIn = rating;
            e.rating = rating;
            e.share = share;
            updatedEpisodes.push(e);
        })
    }

    return updatedEpisodes;
}

function getDailyEpisodes(episodes, day){
    return episodes.filter((ep) => ep.dayOfWeek == day).sort((a,b) => a.time - b.time);
}
