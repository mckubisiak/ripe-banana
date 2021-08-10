# ripe-banana

Await actor.setFilm(film)
Await film.setStudio(studio)
Await film.setActors(actor)


LAB: ORM Data Modelling - Ripe Banana
Description
For this assignment, you'll be creating a database of movie films (with reviews), movie studios, actors, reviews and reviewers.

You'll be using the Sequelize ORM for this lab. Make sure to search the documentation before asking questions.

Working on this Lab
You cannot pass this lab without a commit history that indicates a vertical approach.

Setup
Create a ripe-banana repository using the express-sql bootstrap

Approach
Work vertically. That means build the tests, route and model for one entity/resource at a time. Horizontal would be building all the models first. Do not do that, go vertical!
Start with the entities/resources that don't depend on other resources: Studio, Actor, and Reviewer
Models (Entities/Resources)
Studio
Film
Actor
Reviewer
Review
Directions Key
<...> is a placeholder for actual data.
S = string, D = date, N = number, I = BIGINT
Properties marked with R are required.
id property omitted for clarity.

Studio
{
  name: <name-of-studio RS>,
  city: <city S>
  state: <state S>
  country: <country S>
}
Film (Many-to-Many with actor)
{
  title: <title of film RS>,
  studio: <studio id RI>,
  released: <4-digit year RN>
}
Actor (Many-to-Many with film)
{
  name: <name RS>,
  dob: <date-of-birth D>,
  pob: <place-of-birth S>
}
Reviewer
{
  name: <string RS>,
  company: <company or website name RS>
}
Review
{
  rating: <rating number 1-5 RN>,
  reviewer: <review id RI>
  review: <review-text, max-length 140 chars RS>,
  film: <film-id RI>
}
Routes
Pick the set of routes that fit with your vertical slice.

GET
While the schemas should look like the data definitions above, these are descriptions of the data that should be returned from the various GET methods.

GET /studios
[{ id, name }]
GET /studios/:id
{ id, name, city, state, country, films: [{ id, title }] }
GET /films
[{
    id, title, released,
    studio: { id, name }
}]
GET /films/:id
{
    title,
    released,
    studio: { id, name },
    cast: [{ id, name }], // actor id and name
    reviews: [{
        id,
        rating,
        review,
        reviewer: { id, name }
    }]
}
GET /actors
[{ id, name }]
GET /actors/:id
{
    name,
    dob,
    pob,
    films: [{
      id,
      title,
      released
    }]
}
GET /reviewer
[{
  id,
  name,
  company
}]
GET /reviewer/:id
{
    id,
    name,
    company,
    reviews: [{
        id,
        rating,
        review,
        film: { id, title }
    }]
}
GET /reviews
limit to 100 highest rated

[{
    id,
    rating,
    review,
    film: { id, title }
}]
POST/PUT
POST: Studio, Films, and Actors, Reviewers and Reviews can be added.
PUT: Only Reviewers can be updated.
DELETE
Reviews and Reviewers However:

Reviewers cannot be deleted if there are reviews
Testing
E2E API tests for supported routes
Deploy
Deploy to heroku

Rubric:
Models: 5pts
Relationships: 5pts
Routes: 5pts
Project Organization and Testing: 5pts