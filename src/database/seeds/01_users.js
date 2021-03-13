
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { 
          email: 'oarthurdev@gmail.com', 
          password: '78124770',
          nickname: 'Slayon', 
          name: 'Arthur Wagenknecht', 
          role: 'Developer',
          permission: 4,
          registered_by: 'DB', 
          social_network: 'Github', 
          link_social_network: 'https://github.com/oarthurdev', 
          activated: true,
          updated_at: null},
        ]);
    });
};
