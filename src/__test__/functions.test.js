const { sumArray, countWords, findMax, isDivisible} = require('../functions.js');

describe("Testing a la función sumArrays", () => {
    it("Debería sumar todos los números positivos", ()=> {
        expect(sumArray([2,3,1])).toEqual(6);
    });
    it("Debería sumar todos los números negativos", ()=> {
        expect(sumArray([-2,-3,-1])).toEqual(-6);
    });
    it("Arrojar 0 si el array no tiene elementos", ()=> {
        expect(sumArray([])).toEqual(0);
    });
    it("Debería sumar todos los elementos cuando uno de los elementos es 0", ()=> {
        expect(sumArray([1,1,3,0,1])).toEqual(6);
    });
});

describe("Testing a la función countWords", ()=> {
    it("Debería sumar todas las palabras de la cadena", ()=> {
        expect(countWords("Hola mundo")).toEqual(2);
    });
    it("Debería sumar todas las palabras de la cadena omitiendo los espacios al inicio y al final", ()=> {
        expect(countWords(" Hola mundo ")).toEqual(2);
    });
    it("Debería retornar 0 si la cadena esta vacía", ()=> {
        expect(countWords("")).toEqual(0);
    });
    it("Debería sumar todas las palabras de la cadena omitiendo los espacios consecutivos entre palabras", ()=> {
        expect(countWords(" Hola Mundo esto  es una   gran    prueba")).toEqual(7);
    });
});

describe("Testing a la función findMax", () => {

    it("Debería encontrar el número mayor en un arreglo de números positivos", () => {
        expect(findMax([4, 3, 7])).toEqual(7);
    });
    it("Debería encontrar el número mayor en un arreglo de números negativos", () => {
        expect(findMax([-4, -3, -7])).toEqual(-3);
    });
    it("Debería retornar null si no hay un arreglo", () => {
        expect(findMax([])).toBeNull();
    });
    it("Debería encontrar el número mayor en un arreglo de números iguales", () => {
        expect(findMax([1, 1, 1, 1])).toEqual(1);
    });

});

describe("Testing a la función isDivisible", ()=> {

    it("Debería ser divisible con números divisibles", ()=> {
        expect(isDivisible(4,2)).toBeTruthy();
    });
    it("No Debería ser divisible con números NO divisibles", ()=> {
        expect(isDivisible(4,3)).toBeFalsy();
    });
    it("Debería retornar un mensaje de error cuando el divisor es 0", ()=> {
        expect(isDivisible(4,0)).toBe('No se puede dividir entre cero');
    });
    it("Debería ser divisible con números negativos divisibles", ()=> {
        expect(isDivisible(-4,-2)).toBeTruthy();
    });
    
});