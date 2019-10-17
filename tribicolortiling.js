(function(){
    window.onload = function(){
        console.log("hey");


        //console.log(triBicolorTiling(100, 2, 3, 4));

        pascal = makeModdedPascalTriable(100,12345787);

        console.log(pascal[50][4]);

        function triBicolorTiling(n, r, g, b) {
            // Your Code Here

            // some variables to use (globals)
            let prime = 12345787;

            let pascal = makeModdedPascalTriable(100,prime);

            let result = 0;
            // keep the tile lengths organized
            let tiles = [r,g,b];

            // start function definitions

            // finds and generates larger cases
            // of posible number of each tile and empty spaces
            // tileOne is the length of the tile
            // tileTwo is the length of the tile
            // myN is the length of available spaces
            function generateLargeCases(myN, tileOne, tileTwo){
                result = [];
                let maxOne = Math.floor(myN/tileOne);
                let maxTwo = Math.floor(myN/tileTwo);
                for(let iOne = 1; iOne <= maxOne; iOne++){
                    for(let iTwo = 1; iTwo <= maxTwo; iTwo++){
                        if( (iOne*tileOne + iTwo*tileTwo) <= myN){
                            result.push([iOne,iTwo,myN-(iOne*tileOne + iTwo*tileTwo)]);
                        }
                        else{
                            break;
                        }
                    }
                }
                return result;
            }

            function makeModdedPascalTriable(n,mod){
                result = [];
                // every row will have a trailing zero for (reasons :-) )
                result.push([1,0]);

                for(let i = 1; i <= n; i++){
                    result.push([]);
                    result[i] = new Array(i+2).fill(0);
                    result[i][0] = 1;

                    for(let j = 1; j <= i; j++){
                        result[i][j] = ( result[i-1][j] + result[i-1][j-1] ) % mod;
                    }

                }
                return result;
            }

            // calculates combination (binomial coeficient)
            // myN!/[myR!*(myN-myR)!]
            // "ancient" indian algorithm :-)
            function combination(myN,myR){
                if((myN-myR) < myR){
                    myR = myN-myR;
                }
                let result = 1;
                for(let i = 0; i < myR; i++){
                    result = result*(myN-i);
                    result = result/(i+1);
                }
                return result;
            }

            // calculates multinomial coeficient
            // n!/(n1!*n2!...)
            // where kBar = [n1,n2, ... ]
            // and n = n1 + n2 + ...
            // calculates by a sort of telescoping expansion
            function multCombination(kBar){
                let result = 1;
                let numerator = 0;
                for(let i = 0; i < kBar.length; i++){
                    numerator = numerator + kBar[i];
                    if(combination(numerator,kBar[i]) > Number.MAX_SAFE_INTEGER){
                        console.log(":-(")
                    }
                    //console.log(combination(numerator,kBar[i]))
                    result = safeMultiply(result,combination(numerator,kBar[i]));
                }
                return result;
            }

            function safeMultiply(a, b){
                let read = 12345787;
                return ( (a % read) * (b % read) ) % read
            }


            console.log(n + " " + tiles);
            // iterate over all posible two selections of tiles
            for(let i = 0; i < (tiles.length - 1); i++){
                for(let j = i+1; j < tiles.length; j++){
                    let tempCases = generateLargeCases(n, tiles[i], tiles[j]);
                    for(let k = 0; k < tempCases.length; k++){
                        //console.log(multCombination(tempCases[k]));
                        result = result + (multCombination(tempCases[k]) % 12345787);
                        result = result % 12345787;
                    }
                }
            }

            return result;
        }
        

        // // finds and generates larger cases
        // // of posible number of each tile and empty spaces
        // // tileOne is the length of the tile
        // // tileTwo is the length of the tile
        // // myN is the length of available spaces
        // function generateLargeCases(myN, tileOne, tileTwo){
        //     result = [];
        //     let maxOne = Math.floor(myN/tileOne);
        //     let maxTwo = Math.floor(myN/tileTwo);
        //     for(let iOne = 1; iOne <= maxOne; iOne++){
        //         for(let iTwo = 1; iTwo <= maxTwo; iTwo++){
        //             if( (iOne*tileOne + iTwo*tileTwo) <= myN){
        //                 result.push([iOne,iTwo,myN-(iOne*tileOne + iTwo*tileTwo)]);
        //             }
        //             else{
        //                 break;
        //             }
        //         }
        //     }
        //     return result;
        // }

        // function makeModdedPascalTriable(n,mod){
        //     result = [];
        //     // every row will have a trailing zero for (reasons :-) )
        //     result.push([1,0]);

        //     for(let i = 1; i <= n; i++){
        //         result.push([]);
        //         result[i] = new Array(i+2).fill(0);
        //         result[i][0] = 1;

        //         for(let j = 1; j <= i; j++){
        //             result[i][j] = ( result[i-1][j] + result[i-1][j-1] ) % mod;
        //         }

        //     }
        //     return result;
        // }

        // // calculates combination (binomial coeficient)
        // // myN!/[myR!*(myN-myR)!]
        // // "ancient" indian algorithm :-)
        // function combination(myN,myR){
        //     if((myN-myR) < myR){
        //         myR = myN-myR;
        //     }
        //     let result = 1;
        //     for(let i = 0; i < myR; i++){
        //         result = result*(myN-i);
        //         result = result/(i+1);
        //     }
        //     return result;
        // }

        // // calculates multinomial coeficient
        // // n!/(n1!*n2!...)
        // // where kBar = [n1,n2, ... ]
        // // and n = n1 + n2 + ...
        // // calculates by a sort of telescoping expansion
        // function multCombination(kBar){
        //     let result = 1;
        //     let numerator = 0;
        //     for(let i = 0; i < kBar.length; i++){
        //         numerator = numerator + kBar[i];
        //         if(combination(numerator,kBar[i]) > Number.MAX_SAFE_INTEGER){
        //             console.log(":-(")
        //         }
        //         //console.log(combination(numerator,kBar[i]))
        //         result = safeMultiply(result,combination(numerator,kBar[i]));
        //     }
        //     return result;
        // }

        // function safeMultiply(a, b){
        //     let read = 12345787;
        //     return ( (a % read) * (b % read) ) % read
        // }
    };
})();