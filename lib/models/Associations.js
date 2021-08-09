import Review from './Review.js';
import Reviewer from './Reviewer.js';
import Actor from './Actor.js';
import Film from './Film.js';
import Studio from './Studio.js';



Studio.hasMany(Film);
Reviewer.hasMany(Review);
Film.hasMany(Review);
Review.belongsTo(Reviewer);
Review.belongsTo(Film);
Film.belongsTo(Studio);
Film.belongsToMany(Actor, { through: 'ActorFilm' });
Actor.belongsToMany(Film, { through: 'ActorFilm' });



