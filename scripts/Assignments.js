import { getPets, getWalkerCities, getWalkers, getCities } from "./database.js"

// Get copy of state for use in this module
const pets = getPets()
const walkers = getWalkers()
const walkerCities = getWalkerCities()
const cities = getCities()



// Function whose responsibility is to find the walker assigned to a pet
const findWalker = (pet, allWalkers) => {
    let petWalker = null

    for (const walker of allWalkers) {
        if (walker.id === pet.walkerId) {
            petWalker = walker
        }
    }

    return petWalker
}

const findWalkerCity = (walker, allCities) => {
    let walkerCities = []

    for (const walkerCity of allCities) {
        if (walker.id === walkerCity.walkerId) {
            walkerCities.push(walkerCity)
        }
    }

    return walkerCities
}

const findCity = (currentWalkerCities) =>{
    let currentCity = "" 

    for (const walkerCity of currentWalkerCities){
        for (const city of cities){
            if (walkerCity.cityId === city.id){
                currentCity += `${city.name}`
            }
        }
    } 
    return currentCity
}



export const Assignments = () => {
    let assignmentHTML = ""
    assignmentHTML = "<ul>"

    for (const currentPet of pets) {
        const currentPetWalker = findWalker(currentPet, walkers)
        const currentWalkerCities = findWalkerCity(currentPetWalker, walkerCities)
        const currentCity = findCity(currentWalkerCities)

        assignmentHTML += `
            <li>
                ${currentPet.name} is being walked by
                ${currentPetWalker.name} in ${currentCity}
            </li>
        `
    }

    assignmentHTML += "</ul>"

    return assignmentHTML
}

