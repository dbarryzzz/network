import * as constants from '../constants';
import * as nameparts from '../randomNames';
import * as MathService from './MathService';

export function buildRandomSeries(networkId, counter, duration){
    var id = networkId + counter;
    var firstYear = 1950 + Math.floor(Math.random() * 70);
    var episodesAired = 0;
    var episodeCount = 22;
    var seasons = Math.ceil(Math.random() * 10);
    var name = randomName();
    var stats = generateSeriesStats();
    return {name: name, 
        id: id, 
        year: firstYear,
        seasons: seasons,
        duration: duration,
        networkId: networkId, 
        episodesAired: episodesAired,
        episodesOrdered: episodeCount,
        stats: stats}
}

export function randomName(){
    return nameparts.partA[Math.floor(Math.random() * nameparts.partA.length)] 
    + nameparts.partB[Math.floor(Math.random() * nameparts.partB.length)];
}


export function randomFlavor() {
    var icon = constants.flavorIcons[(Math.floor(Math.random() * constants.flavorIcons.length))];
    var color = constants.flavorColors[(Math.floor(Math.random() * constants.flavorColors.length))];

    return {icon: icon, color: color};
}

export function generateSeriesStats(){
    // all on 1-100 scale
    var buzz = MathService.random1to100();  
    var awareness = MathService.random1to100();
    var fandom = Math.ceil(awareness * MathService.random1to100() / 100);  // fandom rating should always be less than general awareness

    var writing = MathService.random1to100();
    var cast = MathService.random1to100();
    var production = MathService.random1to100();

    var totalQuality = Math.floor((writing + cast + production) /3);  //TODO: weight this?
    
    var flavors = [randomFlavor(), randomFlavor(), randomFlavor()];

    return{
        buzz: buzz,
        awareness: awareness,
        fandom: fandom,
        writing: writing,
        cast: cast,
        production: production,
        totalQuality: totalQuality,
        flavors: flavors
    };
}