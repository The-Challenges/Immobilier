const { Sequelize } = require('sequelize');
const db = require('./Model/index')
const { faker ,Randomizer} = require('@faker-js/faker');
function getRandomElementFromArray(arr) {
    // Generate a random index within the bounds of the array
    const randomIndex = Math.floor(Math.random() * arr.length);
    // Return the element at the random index
    return arr[randomIndex];
  }
module.exports = async (sequelize) => {
    // Adjust the number of seeds you want for each model
    const userCount = 50;
    const houseCount = 100;
    const landCount = 75;
    const indoo = 1000
  
    // Generate random users
    const users = await Promise.all(
      Array.from({ length: userCount }).map(async () => {
        return await db.User.create({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: 'hashed_password', // Replace with a secure password hashing mechanism
          phoneNumber: faker.phone.number(), // Uncomment if you want phone numbers
          age: faker.number.int({ min: 19, max: 65 }), // Uncomment if you want user ages
        
        alt:faker.location.latitude({ max: 10, min: -10, precision: 5 }), 
        long:faker.location.longitude({ max: 10, min: -10 })
        });
      })
    );
    const houses = await Promise.all(
        Array.from({ length: houseCount }).map(async () => {
          const user = users[Math.floor(Math.random() * userCount)];
          return await db.House.create({
            title: faker.location.streetAddress(),
            price: faker.commerce.price(),
            numberbathrooms: faker.number.int({ min: 1, max: 5 }),
            numberbedrooms: faker.number.int({ min: 1, max: 50 }),
            garage: faker.datatype.boolean(),
            parking: faker.datatype.boolean(),
            alt:faker.location.latitude({ max: 10, min: -10, precision: 5 }), 
            long:faker.location.longitude({ max: 10, min: -10 }),
            purchaseoption:getRandomElementFromArray(['Finance','cash','Unknown']),
            propretyType:getRandomElementFromArray(['Villa', 'Rural', 'Retirement Living','All types']),
            houseAge:getRandomElementFromArray(['Established', 'New', 'All types']),
            UserId: user.id, 
           
          });
        })
      );
      const lands =await Promise.all(
        Array.from({ length: houseCount }).map(async () => {
          const user = users[Math.floor(Math.random() * userCount)];
          return await db.Land.create({
            title: faker.address.streetAddress(),
            price: faker.commerce.price(),
            size: faker.number.float({ min: 0.1, max: 100 }),
            alt:faker.location.latitude({ max: 10, min: -10, precision: 5 }), 
            long:faker.location.longitude({ max: 10, min: -10 }),
            purchaseoption: getRandomElementFromArray(['Finance', 'Cash', 'Unknown']),
            TerrainType: getRandomElementFromArray(['Flat', 'Sloping', 'Hilly', 'Forested', 'Unknown']),
            Zoning: getRandomElementFromArray(['Residential', 'Commercial', 'Agricultural', 'Industrial', 'Mixed-use', 'Unknown']),
            isVerifie: faker.datatype.boolean(),
            UserId: user.id, 
           
          });
        })
      )
      const indoorOption =await Promise.all(
        Array.from({ length: indoo }).map(async () => {
          const house = houses[Math.floor(Math.random() * houseCount)];
          return await db.Indoor.create({
            options:getRandomElementFromArray(['Ensuite','Study','Alarm System','FloorBoards','Rumpus room','Dishwasher','Built in robe','Broadband','Gym','Workshop','Unknown']),
            HouseId:house.id
          });
        })
      )
      const outdooroption =await Promise.all(
        Array.from({ length: indoo }).map(async () => {
          const house = houses[Math.floor(Math.random() * houseCount)];
          return await db.Outdoor.create({
            options:getRandomElementFromArray(['Swimming pool','Balcony','Undercover parking','Fully fenced','Tennis court','Garage','Outdoor area','Shed','Outdoor spa','Unknown']),
            HouseId:house.id
          });
        })
      )

      const viewl =await Promise.all(
     Array.from({ length: indoo }).map(async () => {
       const land = lands[Math.floor(Math.random() * landCount)];
       return await db.View.create({
         options:getRandomElementFromArray(['mountain','water views','city skyline','Unknown']),
         LandId:land.id
         
       });
     })
   )
      const view =await Promise.all(
        Array.from({ length: indoo }).map(async () => {
          const house = houses[Math.floor(Math.random() * houseCount)];
          return await db.View.create({
            options:getRandomElementFromArray(['mountain','water views','city skyline','Unknown']),
            HouseId:house.id
            
          });
        })
      )


  const climate =await Promise.all(
        Array.from({ length: indoo }).map(async () => {
          const house = houses[Math.floor(Math.random() * houseCount)];
          return await db.Climat.create({
            options:getRandomElementFromArray(['Air conditioning','Heating','Solar panets','High energy effcincy','Unknown']),
            HouseId:house.id
            
          });
        })
      )

      const acees =await Promise.all(
        Array.from({ length: indoo }).map(async () => {
          const house = lands[Math.floor(Math.random() * landCount)];
          return await db.View.create({
            options:getRandomElementFromArray(['Airport','Public transportation','Highway','road access','Unknown']),
            LandId:house.id
            
          });
        })
      )

}


