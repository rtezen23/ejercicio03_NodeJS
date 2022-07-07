const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Review } = require('./models/review.model');
const { Game } = require('./models/game.model');
const { Console } = require('./models/console.model');

// Utils
const { db } = require('./utils/database.util');

db.authenticate()
    .then(() => console.log('Db authenticated'))
    .catch(err => console.log(err));

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

Game.hasMany(Review, { foreignKey: 'gameId' });
Review.belongsTo(Game);

Console.belongsToMany(Game, { foreignKey: 'consoleId', through: 'gamesInConsole' });
Game.belongsToMany(Console, { foreignKey: 'gameId', through: 'gamesInConsole' });

db.sync()
    .then(() => console.log('Db synced'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
