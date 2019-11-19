import { calcUOMPrecision } from "./MathUtils";
import { calcPercentFromRank1 } from "./MathUtils";
import { calcDiffFromRank1 } from "./MathUtils";
import { determineWinner } from "./MathUtils";

/*
* calcUOMPrecision
*/
//Simple millisecond to second
test ('Converts 1000ms into 1 second', () => {
    expect(calcUOMPrecision(1000, 's', 0)).toBe(1);
});

//Rounding milliseconds to second
test ('Converts 994ms into .99 second', () => {
    expect(calcUOMPrecision(994, 's', 2)).toBe(.99);
});

//Conversion bytes to kb
test ('Converts 2048 bytes into 2 kb', () => {
    expect(calcUOMPrecision(2048, 'KB', 0)).toBe(2);
});

//Conversion & rounding bytes to kb
test ('Converts 2016 bytes into 2 kb', () => {
    expect(calcUOMPrecision(2048, 'KB', 0)).toBe(2);
});

/*
* calcPercentFromRank1
*/
//Test 50/100
test ('100%, 50/100', () => {
    expect(calcPercentFromRank1(100, 50)).toBe(100);
});

/*
* calcDiffFromRank1
*/
//Also converts using  calcUOMPrecision
test ('1000ms from 500ms should be .50 seconds', () => {
    expect(calcDiffFromRank1(1000, 500, "s", 2)).toBe(.50);
});

/*
* determineWinner
*/
//Returns a winner (mob or desk) with a percentage
test ('Mobile 900 vs Desk 1000', () => {
    expect(determineWinner(900, 1000, "Mob", "Desk")).toBe("Mob (10%)");
});
