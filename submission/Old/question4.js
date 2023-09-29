function helloWorld(languageCode) {

    const greetings = {
        en: "Hello, World",
        es: "¡Hola, Mundo",
        de: "Hallo, Welt",
       
    };


    const greeting = greetings[languageCode] || greetings['en'];

    return greeting;
}


console.log(helloWorld("en")); 
console.log(helloWorld("es")); 
console.log(helloWorld("de")); 
console.log(helloWorld("fr")); 