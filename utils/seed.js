const connection = require('../config/connection');
const { User, Thoughts } = require('../models');
const { getRandomReaction, users, thoughts } = require ('./data')
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});

  await Thoughts.deleteMany({});

  for (let i = 0; i < 11; i++) {
    const reactions = getRandomReaction (2);
    // const thoughtText = thoughts.thoughtText;
    // const username = thoughts.username;

    thoughts.push({
      // thoughtText,
      // username,
      reactions,
    });

}

  // Add users to the collection and await the results
  await User.collection.insertMany(users);
  
  // Add thoughts to the collection and await the results
  await Thoughts.collection.insertMany(thoughts);
  
  console.table(users);
  console.info('Seeding complete!');
  process.exit(0);

});

