import Review from '../lib/models/Review.js';
import Reviewer from '../lib/models/Reviewer.js';
import Actor from '../lib/models/Actor.js';
import Film from '../lib/models/Film.js';
import Studio from '../lib/models/Studio.js';



Studio.hasMany(Film);
Film.hasMany(Actor);
Actor.hasMany(Film);
Reviewer.hasMany(Review);
Film.hasMany(Review);
Review.belongsTo(Reviewer);
Review.belongsTo(Film);
Film.belongsTo(Studio);
Film.belongsToMany(Actor, { through: 'ActorFilm' });
Actor.belongsToMany(Film, { through: 'ActorFilm' });



