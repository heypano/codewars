// https://www.codewars.com/kata/music-fun-number-1-major-scale/train/javascript

/**
 * Returns which major scale the melody passed belongs to (if any)
 * @param melody
 * @returns {string}
 */
function majorScale(melody)
{
    let notes = getNoteListFromMelody(melody);
    let majorOfNote = "No";


    // We attempt to rotate the list of notes 7 times (for each of the 7 notes it should have)
    for(let i = 0; i < 7; i++){
        if(notes.length !== 7){
            break;
        }
        notes = rotateArray(notes);
        const firstNote = notes[0];
        let isMajorScaleOfNote = isFullMajorScaleOfFirst(notes);
        if(isMajorScaleOfNote){
            majorOfNote = firstNote;
            // console.log(`${notes} is a major scale of note ${firstNote}`);
            break;
        }
    }


    const result = `${majorOfNote} major scale`;

    // your code here...
    // enjoy! :)
    return result;
}


/**
 * Takes a list of notes and returns whether or not it is the major scale of the first note in the array
 * @param {array} notes
 */
function isFullMajorScaleOfFirst(notes){
    const expectedPattern = [2,2,1,2,2,2];
    const actualPattern = [];
    let isFullMajorScale = true; // Assume scale is major unless we find a reason why it's not

    if(notes.length !== 7){
        // console.log(`Not a major scale - more than 7 notes: ${notes}`);
        return false;
    }

    // Through each iteration we look at the next note, so we stop one note early
    for(let i = 0; i < notes.length - 1; i++){
        const note = notes[i];
        const nextNote = notes[i+1];
        const expectedDistance = expectedPattern[i];
        const actualDistance = getNoteDistance(note, nextNote);
        actualPattern.push(actualDistance);
        if(actualDistance !== expectedDistance){
            isFullMajorScale = false;
            break;
        }
    }
    // console.log(`Actual Pattern: ${actualPattern}`);

    return isFullMajorScale;
}

/**
 * Returns the list of sorted, unique notes in a melody string
 * @param {string} melody
 * @returns {Array}
 */
function getNoteListFromMelody(melody){
    const pattern = /([ABCDEFGA][#b]?)/g;
    const matches = new Set(melody.match(pattern)); // We only care about unique notes
    const sortedMelody = Array.from(matches).sort();
    return sortedMelody;
}

/**
 * Return the distance between note A and note B (in half-tones)
 * @param {string} noteA
 * @param {string} noteB
 * @returns {number}
 */
function getNoteDistance(noteA, noteB){
    const allNotes = getAllNotes();
    const numNotes = 12; // we consider 12 unique notes
    const positionA = allNotes[noteA];
    const positionB = allNotes[noteB];

    if(positionA === undefined){
        throw `${noteA} could not be found in the list of available notes`;
    }
    if(positionB === undefined){
        throw `${noteB} could not be found in the list of available notes`;
    }

    let distance = Math.abs(positionA - positionB);
    if(distance > numNotes/2){
        distance = numNotes - distance;
    }
    // console.log(`Distance between ${noteA} and ${noteB} is ${distance}`);
    return distance;
}



/**
 * Returns a new copy of a rotated array (in returned array, first item is last item)
 * @param arr
 * @returns {Array}
 */
function rotateArray(arr){
    return [...arr.splice(1), arr[0]];
}

/**
 * Returns a map of all notes and their "position" (with C being at 0 and B being at 11)
 * Covers alternative naming (including B#, Cb, E#, Fb)
 * @returns {string[]}
 */
function getAllNotes(){
    return {
        'B#': 0,
        'C': 0,
        'C#': 1,
        'Db': 1,
        'D': 2,
        'D#': 3,
        'Eb': 3,
        'E': 4,
        'Fb': 4,
        'E#': 5,
        'F': 5,
        'F#': 6,
        'Gb': 6,
        'G': 7,
        'G#': 8,
        'Ab': 8,
        'A': 9,
        'A#': 10,
        'Bb': 10,
        'B': 11,
        'Cb': 11
    }
}