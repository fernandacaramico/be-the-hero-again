
const crypto = require('crypto'); // gera sequência
const connection = require('../database/connection'); // cria conexão com banco

module.exports = {

  async index(request, response) {
    const ongs = await connection('ongs').select('*');
    
    return response.json(ongs);
  },

  async create(request, response) {
    // vamos armazenar cada dado em 1 var, assim n aceita nada q n está aqui
    const { name, email, whatsapp, city, uf } = request.body;

    // gera aqui o id
    const id = crypto.randomBytes(4).toString('HEX');

    // agora sim, vamos conectar ao banco!!
    // como insert pode demorar, colocamos como ASYNC e entao o insert é AWAIT
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return response.json({ id });
  }
};