export const random1to100 = () => {return randomRange(100)}

export const randomRange = (top) => {return Math.ceil(Math.random() * top)}

export const randomRangeRepeated = (top, repeats) => {
    var result = 0;

    for(let i = 0 ; i < repeats; i++){
        result += randomRange(top);
    }

    return result;
}