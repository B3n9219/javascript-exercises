const findTheOldest = function(people) {
    const ages = people.map(person => {
        if (!("yearOfDeath" in person)) {
            return {person: person, age: 2025 - person.yearOfBirth};
        } else {
            return {person: person, age: person.yearOfDeath - person.yearOfBirth};
            }
    })
    ages.sort((a, b)=> b.age - a.age);
    return ages[0].person

};

// Do not edit below this line
module.exports = findTheOldest;
