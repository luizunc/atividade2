function verificarNumeroPrimo(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

console.log(`verificarNumeroPrimo(0); // ${verificarNumeroPrimo(0)}`);
console.log(`verificarNumeroPrimo(1); // ${verificarNumeroPrimo(1)}`);
console.log(`verificarNumeroPrimo(2); // ${verificarNumeroPrimo(2)}`);
console.log(`verificarNumeroPrimo(3); // ${verificarNumeroPrimo(3)}`);
console.log(`verificarNumeroPrimo(7); // ${verificarNumeroPrimo(7)}`);
console.log(`verificarNumeroPrimo(83); // ${verificarNumeroPrimo(83)}`);
console.log(`verificarNumeroPrimo(100); // ${verificarNumeroPrimo(100)}`);
console.log(`verificarNumeroPrimo(991); // ${verificarNumeroPrimo(991)}`);
console.log(`verificarNumeroPrimo(104729); // ${verificarNumeroPrimo(104729)}`);
console.log(`verificarNumeroPrimo(14348907); // ${verificarNumeroPrimo(14348907)}`);
