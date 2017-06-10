db = new Mongo().getDB("teaser2017")
db.createCollection("people")

db.people.createIndex({ 'email': 1 })

