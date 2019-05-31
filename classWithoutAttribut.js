class TextManipulator {

    loadText(text) {

        this.text = text;

    }



    splitIntoWords() {

        // if this.text is empty ...

        if (typeof this.text === "undefined" || this.text.length < 1) {

            console.log("Please load some text before trying to split!");

            return;

        }



        this.words = this.text.split(" "); // split(" ") = "I love bole" --> ["I", "love", "bole"]

    }



    // method that isolates all the words starting with a vowel // consonants

    isolateVowels() {

        // vowels = a, o, u, i, e, y

        this.wordsStartingWithVowel = this.words.filter(word => {

            const firstLetterOfWord = word.charAt(0); // word.split('')[0] e.g: marcus --> ['m', 'a', 'r']

            const vowelsLowerCase = ["a", "e", "i", "o", "u", "y"];

            const vowelsUpperCase = vowelsLowerCase.map(vowel =>

                vowel.toUpperCase()

            );

            const vowels = [...vowelsLowerCase, ...vowelsUpperCase]; // this is ES6!!

            const startsWithVowel = vowels.includes(firstLetterOfWord);

            return startsWithVowel;

        });

    }



    isolateConsonants() {

        this.wordsStartingWithConsonant = this.words.filter(word => {

            const firstLetterOfWord = word.charAt(0);

            const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

            const vowels = "aeiouy".split(""); // ['a','e','i','o', 'u','y']

            const consonantsLC = alphabet.filter(

                letter => !vowels.includes(letter)

            );

            const myFunction = function(consonant) {

                return consonant.toUpperCase();

            };

            const consonantsUC = consonantsLC.map(myFunction);

            const consonants = [...consonantsLC, ...consonantsUC];

            const startsWithConsonant = consonants.includes(firstLetterOfWord);

            return startsWithConsonant;

        });

    }



    isolatePluralWords() {

        // look for lastCharacter of word

        // if = s then plural else not plural

        this.wordsEndPlural = this.words.filter(word => {

            const lastLetterOfWord = word.charAt(word.length - 1);

            if (lastLetterOfWord === "s") {

                return true;

            } else {

                return false;

            }

        });

    }

    isolateSingWords() {

        // look for lastCharacter of word

        // if = s then plural else not plural

        this.wordsEndSing = this.words.filter(word => {

            const lastLetterOfWord = word.charAt(word.length - 1);

            if (lastLetterOfWord !== "s") {

                return true;

            } else {

                return false;

            }

        });

    }

}



// let's instantiate an object



const manipulator = new TextManipulator();

manipulator.loadText("I love coming to WCS on Saturdays");

manipulator.splitIntoWords();

manipulator.isolateVowels();

manipulator.isolateConsonants();

manipulator.isolatePluralWords();

manipulator.isolateSingWords();

console.log(manipulator.wordsStartingWithVowel, manipulator.wordsEndSing);



// function testFilter() {

//     const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//     const filtered = arr.filter(function(num) {

//         return num > 5;

//     });

//     //console.log(filtered);

// }



// testFilter();



// function map(arr, func) {

//     // const arr = ["a", "b", "c"];

//     const transformed = [];



//     for (let i = 0; i < arr.length; i++) {

//         const element = arr[i];

//         const resultatPourCetteIteration = func(element);

//         transformed.push(resultatPourCetteIteration);

//     }

//     return transformed;

// }



// // proof

// const arr = [1, 2, 3, 4, 5];

// // control

// const res1 = arr.map(element => element * 2);

// console.log(res1);

// // ours

// const res2 = map(arr, element => element * 2);

// console.log(res2);