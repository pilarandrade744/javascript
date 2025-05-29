// paso 1: declaracion e inicialización de la variable 
// paso 2: condicion de continuacion del bucle
// paso 3: incremento o decremento de la variable

for (let i = 1; i <= 5; i++) {
    if (i == 4) {
        continue; // salta a la siguiente iteración del bucle cuando i es igual a 12
    }
    document.write(i + "<br>");
}



// como usar for in 

let animales = ["perro", "gato", "conejo", "loro", "pez"];

for (animal in animales){
    document.write(animal + "<br>");  // muestra el índice del array    
} 

for (animal in animales){
    document.write(animales[animal] + "<br>");  // muestra el valor del índice del array
} 

document.write("<br>"); 

for (animal of animales){
    document.write(animal + "<br>");   // muestra el valor del índice del array    
}  
