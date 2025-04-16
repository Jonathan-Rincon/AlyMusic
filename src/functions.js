// Función que suma todos los elementos de un arreglo
const sumArray = (numbers) => {
    let total = 0;
    for (let num of numbers) {
      total += num;
    }
    return total;
  };
  
  // Función que cuenta cuántas palabras hay en una cadena de texto
  const countWords = (text) => {
    if (!text || text.trim() === '') return 0;
    const words = text.split(' ');
    return words.filter(word => word !== '').length;
  };
  
  // Función que devuelve el número más grande en un arreglo
  const findMax = (numbers) => {
    if (numbers.length === 0) return null;
    let max = numbers[0];
    for (let num of numbers) {
      if (num > max) max = num;
    }
    return max;
  };
  
  // Función que verifica si un número es divisible entre otro
  const isDivisible = (num, divisor) => {
    if (divisor === 0) return 'No se puede dividir entre cero';
    return num % divisor === 0;
  };
  module.exports = {sumArray, countWords, findMax, isDivisible};