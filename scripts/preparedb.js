/* global printjson, db */
'use strict'

printjson(db.dropDatabase());

db.place.save({
  _id: ObjectId('52ef69b5e4b09d399c7befe4'),
  name: 'Test Place 1'
});

