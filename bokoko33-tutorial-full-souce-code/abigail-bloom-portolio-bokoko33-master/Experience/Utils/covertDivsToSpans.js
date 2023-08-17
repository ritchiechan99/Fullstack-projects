export default function (element) {
    element.style.overflow = "hidden"; // Set the element's overflow to "hidden"
    
    element.innerHTML = element.innerText // Replace the element's content with processed spans
        .split("") // Split the inner text into an array of characters
        .map((char) => { // Map over each character in the array
            if (char === " ") { // If the character is a space
                return `<span>&nbsp;</span>`; // Replace it with a non-breaking space wrapped in a span
            }
            return `<span class="animatedis">${char}</span>`; // Wrap each character in a span with the class "animatedis"
        })
        .join(""); // Join the array of processed spans back into a string

    return element; // Return the modified element
}