import { getWalkers } from "./database.js"
import { getCities } from "./database.js"
import { getWalkerCities } from "./database.js"

const walkerCity = getWalkerCities()

//Define a function that will get all Objects in walkerCities
const findWalkerCitiesByWalker = (walker) => {
    //Define empty array to store all assignment objects 
    const assignmentArray = []
    // iterate array value of walkerCities
    for (const assignment of walkerCity){
        // check if primary key of walker equals the foreign key on assignement
        if (assignment.walkerId === walker.id){
            // if yes, add current object to assignmentArray
            assignmentArray.push(assignment)
        }
    }
    return assignmentArray
    // after loop is done return assignments array
}

const cities = getCities()
//define a function that makes a string of city names.
//take parameter of assignments Array
const cityNamesString = (assignmentArray) => {
    //define an empty string that will be appended 
    let cityNames = ""
    //iterate through assignmentsArray
    for (const assignment of assignmentArray) {
        //for each assignment iterate the cities array to find match
        for (const city of cities) {
            // if it finds a match
            if (city.id === assignment.cityId) {
                if(cityNames === ""){
                    cityNames = `${city.name}`
                } else {
                    cityNames += ` and ${city.name}`  

                }
                //add name of matching city to string of city names
            } 
        }
    } 
    //Return string 
    return cityNames
    
    
}






document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("walker")) {
            const [,walkerId] = itemClicked.id.split("--")

            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    const assignments = findWalkerCitiesByWalker (walker)
                    const cityNames = cityNamesString (assignments)

                    window.alert(`${walker.name} services ${cityNames}`)
                }
            }
        }
    }
)

const walkers = getWalkers()


export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"
    return walkerHTML

}

