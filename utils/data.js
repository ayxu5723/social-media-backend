const users = [
  {
    username: 'Anonymous1',
    email: 'anon1@gmail.com',
  },   {
    username: 'Anonymous2',
    email: 'anon2@gmail.com',
  },
  {
    username: 'Oscar Wilde',
    email: 'oscarwilde@gmail.com',
  },
  {
    username: 'Frank Zappa',
    email: 'franlzappa@gmail.com',
  },
  {
    username: 'Marcus Tullius Cicero',
    email: 'marcus123@gmail.com',
  },
  {
    username: 'Mae West',
    email: 'mae1234@gmail.com',
  },
  {
    username: 'Mahatma Gandhi',
    email: 'therealgandhi@gmail.com',
  },
  {
    username: 'Robert Frost',
    email: 'frosty123@gmail.com',
  },
  {
    username: 'Mark Twain',
    email: 'marktwain12@gmail.com',
  },
  {
    username: 'Friedrich Nietzsche',
    email: 'therealnietzsche@gmail.com',
  },
]

const thoughts = [
  {
    thoughtText: 'I am awesome',
    username: 'Anonymous1',
  },
  {
    thoughtText: 'Today is great',
    username: 'Anonymous2',
  },
  {
    thoughtText: 'Be yourself; everyone else is already taken',
    username: 'Oscar Wilde',
  },
  {
    thoughtText: 'So many books, so little time.',
    username: 'Frank Zappa',
  },
  {
    thoughtText: 'A room without books is like a body without a soul.',
    username: 'Marcus Tullius Cicero',
  },
  {
    thoughtText: 'You only live once, but if you do it right, once is enough.',
    username: 'Mae West',
  },
  {
    thoughtText: 'Be the change that you wish to see in the world.',
    username: 'Mahatma Gandhi',
  },
  {
    thoughtText: 'In three words I can sum up everything I\'ve learned about life: it goes on.',
    username: 'Robert Frost',
  },
  {
    thoughtText: 'If you tell the truth, you don\'t have to remember anything.',
    username: 'Mark Twain',
  },
  {
    thoughtText: 'Always forgive your enemies; nothing annoys them so much.',
    username: 'Oscar Wilde',
  },  
  {
    thoughtText: 'Without music, life would be a mistake.',
    username: 'Friedrich Nietzsche',
  },

]

const reactions = [
  'Wow',
  'So cool',
  'Amazing',
  'I love you',
  'So wise',
  'Epic',
  'Amazing',
  'Where do you get this stuff?',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  

const getRandomReaction = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {

    results.push ({
      reactionBody: getRandomArrItem(reactions),
      username: getRandomArrItem(users).username,
    });
  }
  console.log(results)
  return results;
};


module.exports = { getRandomReaction, users, thoughts }