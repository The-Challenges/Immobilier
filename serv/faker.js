const { Sequelize } = require('sequelize');
const db = require('./Model/index');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

function getRandomElementFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

module.exports = async (sequelize) => {
    // Adjust the number of seeds you want for each model
    const userCount = 500;
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
          password: await bcrypt.hash("12345", 10),
          phoneNumber: faker.phone.number(),
          age: faker.number.int({ min: 19, max: 65 }),
          alt: faker.location.latitude({ max: 10, min: -10, precision: 5 }),
          long: faker.location.longitude({ max: 10, min: -10 })
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
          alt: faker.location.latitude({ max: 10, min: -10, precision: 1 }),
          long: faker.location.longitude({ max: 10, min: -10, precision: 1 }),
          purchaseoption: getRandomElementFromArray(['Finance', 'cash', 'Unknown']),
          propretyType: getRandomElementFromArray(['Villa', 'Rural', 'Retirement Living', 'All types']),
          houseAge: getRandomElementFromArray(['Established', 'New', 'All types']),
          UserId: user.id,
        });
      })
    );
  
    const lands = await Promise.all(
      Array.from({ length: landCount }).map(async () => {
        const user = users[Math.floor(Math.random() * userCount)];
        return await db.Land.create({
          title: faker.location.streetAddress(),
          price: faker.commerce.price(),
          size: faker.number.float({ min: 0.1, max: 100 }),
          alt: faker.location.latitude({ max: 10, min: -10, precision: 5 }),
          long: faker.location.longitude({ max: 10, min: -10 }),
          purchaseoption: getRandomElementFromArray(['Finance', 'Cash', 'Unknown']),
          TerrainType: getRandomElementFromArray(['Flat', 'Sloping', 'Hilly', 'Forested', 'Unknown']),
          Zoning: getRandomElementFromArray(['Residential', 'Commercial', 'Agricultural', 'Industrial', 'Mixed-use', 'Unknown']),
          isVerifie: faker.datatype.boolean(),
          UserId: user.id,
        });
      })
    );
  
    const indoorOptions = await Promise.all(
      Array.from({ length: indoo }).map(async () => {
        const house = houses[Math.floor(Math.random() * houseCount)];
        return await db.Indoor.create({
          options: getRandomElementFromArray(['Ensuite', 'Study', 'Alarm System', 'FloorBoards', 'Rumpus room', 'Dishwasher', 'Built in robe', 'Broadband', 'Gym', 'Workshop', 'Unknown']),
          HouseId: house.id
        });
      })
    );
  
    const outdoorOptions = await Promise.all(
      Array.from({ length: indoo }).map(async () => {
        const house = houses[Math.floor(Math.random() * houseCount)];
        return await db.Outdoor.create({
          options: getRandomElementFromArray(['Swimming pool', 'Balcony', 'Undercover parking', 'Fully fenced', 'Tennis court', 'Garage', 'Outdoor area', 'Shed', 'Outdoor spa', 'Unknown']),
          HouseId: house.id
        });
      })
    )
      const mediasHouse = await Promise.all(
        Array.from({ length: houseCount }).map(async () => {
          const user = houses[Math.floor(Math.random() * houseCount)];
          return await db.Media.create({
            type:'jpg',
            name:'photo',
            link:'https://cf.bstatic.com/xdata/images/hotel/max1024x768/295090917.jpg?k=d17621b71b0eaa0c7a37d8d8d02d33896cef75145f61e7d96d296d88375a7d39&o=&hp=1',
            HouseId: user.id, 
           
          });
        })
      );
      const mediasLand = await Promise.all(
        Array.from({ length: landCount }).map(async () => {
          const user = lands[Math.floor(Math.random() * landCount)];
          return await db.Media.create({
            type:'jpg',
            name:'photo',
            link:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFVitqdZ6GAh7K_wR9znpWcDZnAU5xFi9tcH2F10JiA&s',
            LandId: user.id, 
           
          });
        })
      );
      const mediasUser = await Promise.all(
        Array.from({ length: userCount }).map(async () => {
          const user = users[Math.floor(Math.random() * userCount)];
          return await db.Media.create({
            type:'jpg',
            name:'photo',
            link:'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
            UserId: user.id, 
           
          });
        })
      );

  const indoorOption = await Promise.all(
    Array.from({ length: optionCount }).map(async () => {
      const house = houses[Math.floor(Math.random() * houseCount)];
      return await db.Indoor.create({
        options: getRandomElementFromArray(['Ensuite', 'Study', 'Alarm System', 'FloorBoards', 'Rumpus room', 'Dishwasher', 'Built in robe', 'Broadband', 'Gym', 'Workshop', 'Unknown']),
        HouseId: house.id
      });
    })
  );

  const outdoorOption = await Promise.all(
    Array.from({ length: optionCount }).map(async () => {
      const house = houses[Math.floor(Math.random() * houseCount)];
      return await db.Outdoor.create({
        options: getRandomElementFromArray(['Swimming pool', 'Balcony', 'Undercover parking', 'Fully fenced', 'Tennis court', 'Garage', 'Outdoor area', 'Shed', 'Outdoor spa', 'Unknown']),
        HouseId: house.id
      });
    })
  );

 


  

  const climate = await Promise.all(
    Array.from({ length: optionCount }).map(async () => {
      const house = houses[Math.floor(Math.random() * houseCount)];
      return await db.Climate.create({
        options: getRandomElementFromArray(['Air conditioning', 'Heating', 'Solar panels', 'High energy efficiency', 'Unknown']),
        HouseId: house.id
      });
    })
  );

  const access = await Promise.all(
    Array.from({ length: optionCount }).map(async () => {
      const land = lands[Math.floor(Math.random() * landCount)];
      return await db.Access.create({
        options: getRandomElementFromArray(['Airport', 'Public transportation', 'Highway', 'Road access', 'Unknown']),
        LandId: land.id
      });
    })
  );

}

