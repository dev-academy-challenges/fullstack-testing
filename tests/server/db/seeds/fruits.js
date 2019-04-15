exports.seed = (knex, Promise) => {
  return knex('fruits').del()
    .then(function () {
      // Inserts seed entries
      return knex('fruits').insert([
        { id: 1, name: 'banana', calories: 105 },
        { id: 2, name: 'apple', calories: 95 },
        { id: 3, name: 'feijoa', calories: 26 }
      ])
    })
}
