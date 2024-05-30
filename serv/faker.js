// const { Sequelize } = require('sequelize');
// const db = require('./Model/index');
// const { faker } = require('@faker-js/faker');
// const bcrypt = require('bcrypt');

// function getRandomElementFromArray(arr) {
//   const randomIndex = Math.floor(Math.random() * arr.length);
//   return arr[randomIndex];
// }

// function generateRandomCoordinates(centerLat, centerLong) {
//   const randomOffset = () => (Math.random() - 0.5) / 100; // Small random offset
//   return [
//     { lat: centerLat + randomOffset(), long: centerLong + randomOffset() },
//     { lat: centerLat + randomOffset(), long: centerLong + randomOffset() },
//     { lat: centerLat + randomOffset(), long: centerLong + randomOffset() },
//     { lat: centerLat + randomOffset(), long: centerLong + randomOffset() }
//   ];
// }

// module.exports = async (sequelize) => {
//   const userCount = 50;
//   const houseCount = 100;
//   const landCount = 75;
//   const optionCount = 1000;

//   const users = await Promise.all(
//     Array.from({ length: userCount }).map(async () => {
//       return await db.User.create({
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         email: faker.internet.email(),
//         password: await bcrypt.hash("12345", 10),
//         phoneNumber: faker.phone.number(),
//         age: faker.number.int({ min: 19, max: 65 }),
//         alt: faker.location.latitude({ max: 10, min: -10, precision: 5 }),
//         long: faker.location.longitude({ max: 10, min: -10 })
//       });
//     })
//   );

//   const houses = await Promise.all(
//     Array.from({ length: houseCount }).map(async () => {
//       const user = users[Math.floor(Math.random() * userCount)];
//       return await db.House.create({
//         title: faker.location.streetAddress(),
//         price: faker.commerce.price(),
//         numberbathrooms: faker.number.int({ min: 1, max: 5 }),
//         numberbedrooms: faker.number.int({ min: 1, max: 50 }),
//         garage: faker.datatype.boolean(),
//         parking: faker.datatype.boolean(),
//         alt: faker.location.latitude({ max: 10, min: -10, precision: 5 }),
//         long: faker.location.longitude({ max: 10, min: -10 }),
//         purchaseoption: getRandomElementFromArray(['Finance', 'cash', 'Unknown']),
//         propretyType: getRandomElementFromArray(['Villa', 'Rural', 'Retirement Living', 'All types']),
//         houseAge: getRandomElementFromArray(['Established', 'New', 'All types']),
//         UserId: user.id,
//       });
//     })
//   );

//   const lands = await Promise.all(
//     Array.from({ length: landCount }).map(async () => {
//       const user = users[Math.floor(Math.random() * userCount)];
//       const centerLat = faker.location.latitude({ max: 10, min: -10, precision: 5 });
//       const centerLong = faker.location.longitude({ max: 10, min: -10 });
//       const shapeCoordinates = generateRandomCoordinates(centerLat, centerLong);

//       const land = await db.Land.create({
//         title: faker.location.streetAddress(),
//         price: faker.commerce.price(),
//         size: faker.number.float({ min: 0.1, max: 100 }),
//         alt: centerLat,
//         long: centerLong,
//         purchaseoption: getRandomElementFromArray(['Finance', 'Cash', 'Unknown']),
//         TerrainType: getRandomElementFromArray(['Flat', 'Sloping', 'Hilly', 'Forested', 'Unknown']),
//         Zoning: getRandomElementFromArray(['Residential', 'Commercial', 'Agricultural', 'Industrial', 'Mixed-use', 'Unknown']),
//         isVerifie: faker.datatype.boolean(),
//         UserId: user.id,
//       });

//       // Store the shape coordinates as a JSON array in a single ShapeCoordinate entry
//       await db.ShapeCoordinate.create({
//         shapeCoordinates,
//         LandId: land.id
//       });

//       return land;
//     })
//   );

//   const indoorOption = await Promise.all(
//     Array.from({ length: optionCount }).map(async () => {
//       const house = houses[Math.floor(Math.random() * houseCount)];
//       return await db.Indoor.create({
//         options: getRandomElementFromArray(['Ensuite', 'Study', 'Alarm System', 'FloorBoards', 'Rumpus room', 'Dishwasher', 'Built in robe', 'Broadband', 'Gym', 'Workshop', 'Unknown']),
//         HouseId: house.id
//       });
//     })
//   );

//   const outdoorOption = await Promise.all(
//     Array.from({ length: optionCount }).map(async () => {
//       const house = houses[Math.floor(Math.random() * houseCount)];
//       return await db.Outdoor.create({
//         options: getRandomElementFromArray(['Swimming pool', 'Balcony', 'Undercover parking', 'Fully fenced', 'Tennis court', 'Garage', 'Outdoor area', 'Shed', 'Outdoor spa', 'Unknown']),
//         HouseId: house.id
//       });
//     })
//   );

//   const mediasHouse = await Promise.all(
//     Array.from({ length: houseCount }).map(async () => {
//       const house = houses[Math.floor(Math.random() * houseCount)];
//       return await db.Media.create({
//         type: 'jpg',
//         name: 'photo',
//         link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/295090917.jpg?k=d17621b71b0eaa0c7a37d8d8d02d33896cef75145f61e7d96d296d88375a7d39&o=&hp=1',
//         HouseId: house.id,
//       });
//     })
//   );

//   const mediasLand = await Promise.all(
//     Array.from({ length: landCount }).map(async () => {
//       const land = lands[Math.floor(Math.random() * landCount)];
//       return await db.Media.create({
//         type: 'jpg',
//         name: 'photo',
//         link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFVitqdZ6GAh7K_wR9znpWcDZnAU5xFi9tcH2F10JiA&s',
//         LandId: land.id,
//       });
//     })
//   );

//   const mediasUser = await Promise.all(
//     Array.from({ length: userCount }).map(async () => {
//       const user = users[Math.floor(Math.random() * userCount)];
//       return await db.Media.create({
//         type: 'jpg',
//         name: 'photo',
//         link: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
//         UserId: user.id,
//       });
//     })
//   );

//   const access = await Promise.all(
//     Array.from({ length: optionCount }).map(async () => {
//       const land = lands[Math.floor(Math.random() * landCount)];
//       return await db.Access.create({
//         options: getRandomElementFromArray(['Airport', 'Public transportation', 'Highway', 'Road access', 'Unknown']),
//         LandId: land.id
//       });
//     })
//   );

//   const viewLands = await Promise.all(
//     Array.from({ length: optionCount }).map(async () => {
//       const land = lands[Math.floor(Math.random() * landCount)];
//       return await db.View.create({
//         options: getRandomElementFromArray(['Mountain', 'Water views', 'City skyline', 'Unknown']),
//         LandId: land.id
//       });
//     })
//   );

//   const viewHouses = await Promise.all(
//     Array.from({ length: optionCount }).map(async () => {
//       const house = houses[Math.floor(Math.random() * houseCount)];
//       return await db.View.create({
//         options: getRandomElementFromArray(['Mountain', 'Water views', 'City skyline', 'Unknown']),
//         HouseId: house.id
//       });
//     })
//   );

//   const requestHouses = await Promise.all(
//     Array.from({ length: 25 }).map(async () => {
//       const user = users[Math.floor(Math.random() * userCount)];
//       const house = houses[Math.floor(Math.random() * houseCount)];
//       return await db.RequestHouse.create({
//         status: getRandomElementFromArray(['pending', 'accepted', 'rejected']),
//         houseId: house.id,
//         userId: user.id,
//       });
//     })
//   );

//   const requestLands = await Promise.all(
//     Array.from({ length: 25 }).map(async () => {
//       const user = users[Math.floor(Math.random() * userCount)];
//       const land = lands[Math.floor(Math.random() * landCount)];
//       return await db.RequestLand.create({
//         status: getRandomElementFromArray(['pending', 'accepted', 'rejected']),
//         landId: land.id,
//         userId: user.id,
//       });
//     })
//   );
// };

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
  const userCount = 2;
  const houseCount = 2;
  const landCount = 2;
  const indoo = 2
  const  optionCount=2

function generateRectangleCoordinates(centerLat, centerLong) {
  const randomSize = Math.random() / 100; // Small random size for the rectangle
  return [
    { latitude: centerLat, longitude: centerLong },
    { latitude: centerLat + randomSize, longitude: centerLong },
    { latitude: centerLat + randomSize, longitude: centerLong + randomSize },
    { latitude: centerLat, longitude: centerLong + randomSize }
  ];
}

module.exports = async (sequelize) => {
  const userCount = 100;
  const houseCount = 50;
  const landCount = 50;
  const optionCount = 50;

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
        alt: faker.location.latitude({ max: 10, min: -10, precision: 5 }),
        long: faker.location.longitude({ max: 10, min: -10 }),
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
      const centerLat = faker.location.latitude({ max: 10, min: -10, precision: 5 });
      const centerLong = faker.location.longitude({ max: 10, min: -10 });
      const shapeCoordinates = generateRectangleCoordinates(centerLat, centerLong);

      const land = await db.Land.create({
        title: faker.location.streetAddress(),
        price: faker.commerce.price(),
        size: faker.number.float({ min: 0.1, max: 100 }),
        alt: centerLat,
        long: centerLong,
        purchaseoption: getRandomElementFromArray(['Finance', 'Cash', 'Unknown']),
        TerrainType: getRandomElementFromArray(['Flat', 'Sloping', 'Hilly', 'Forested', 'Unknown']),
        Zoning: getRandomElementFromArray(['Residential', 'Commercial', 'Agricultural', 'Industrial', 'Mixed-use', 'Unknown']),
        isVerifie: faker.datatype.boolean(),
        UserId: user.id,
      });

      // Store each coordinate as a separate entry
      await Promise.all(
        shapeCoordinates.map(async (coord) => {
          await db.ShapeCoordinate.create({
            latitude: coord.latitude,
            longitude: coord.longitude,
            LandId: land.id,
          });
        })
      );

      return land;
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

  const mediasHouse = await Promise.all(
    Array.from({ length: houseCount }).map(async () => {
      const house = houses[Math.floor(Math.random() * houseCount)];
      return await db.Media.create({
        type: 'jpg',
        name: 'photo',
        link: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/295090917.jpg?k=d17621b71b0eaa0c7a37d8d8d02d33896cef75145f61e7d96d296d88375a7d39&o=&hp=1',
        HouseId: house.id,
      });
    })
  );

  const mediasLand = await Promise.all(
    Array.from({ length: landCount }).map(async () => {
      const land = lands[Math.floor(Math.random() * landCount)];
      return await db.Media.create({
        type: 'jpg',
        name: 'photo',
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFVitqdZ6GAh7K_wR9znpWcDZnAU5xFi9tcH2F10JiA&s',
        LandId: land.id,
      });
    })
  );

  const mediasUser = await Promise.all(
    Array.from({ length: userCount }).map(async () => {
      const user = users[Math.floor(Math.random() * userCount)];
      return await db.Media.create({
        type: 'jpg',
        name: 'photo',
        link: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
        UserId: user.id,
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

  const viewLands = await Promise.all(
    Array.from({ length: optionCount }).map(async () => {
      const land = lands[Math.floor(Math.random() * landCount)];
      return await db.View.create({
        options: getRandomElementFromArray(['Mountain', 'Water views', 'City skyline', 'Unknown']),
        LandId: land.id
      });
    })
  );

  const viewHouses = await Promise.all(
    Array.from({ length: optionCount }).map(async () => {
      const house = houses[Math.floor(Math.random() * houseCount)];
      return await db.View.create({
        options: getRandomElementFromArray(['Mountain', 'Water views', 'City skyline', 'Unknown']),
        HouseId: house.id
      });
    })
  );

  const statusOptions = ['pending', 'accepted', 'rejected'];
  const requestLands = await Promise.all(
    Array.from({ length: 1000 }).map(async () => {
      const user = users[Math.floor(Math.random() * userCount)];
      const land = lands[Math.floor(Math.random() * landCount)];
      const status = getRandomElementFromArray(statusOptions); // Get status
      console.log(`Inserting: Status - ${status}, Land ID - ${land.id}, User ID - ${user.id}`); // Log it
      return await db.RequestLand.create({
        status,
        landId: land.id,
        userId: user.id,
      });
    })
  );

  const requestHouses = await Promise.all(
    Array.from({ length: 1000 }).map(async () => {
      const user = users[Math.floor(Math.random() * userCount)];
      const house = houses[Math.floor(Math.random() * houseCount)];
      const status = getRandomElementFromArray(statusOptions); // Get status
      console.log(`Inserting: Status - ${status}, House ID - ${house.id}, User ID - ${user.id}`); // Log it
      return await db.RequestHouse.create({
        status,
        houseId: house.id,
        userId: user.id,
      });
    })
  );


}
};
