const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const {page = 1} = request.query;  // criando paginacao

    const [count] = await connection('incidents').count(); // pega o total de casos

    const incidents = await connection('incidents')
      .join('ongs', 'ong_id', '=', 'incidents.ong_id') // podendo mostrar o numero total de incidentes
      .limit(5) // criando paginacao
      .offset((page - 1) * 5) // criando paginacao
      .select(['incidents.*', 
      'ongs.name', 
      'ongs.email', 
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf']); // limitando cols, sem mostrar id da ong

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body; // s id pq é increment
    // id da ong não vem aqui, porque é a ong que está autenticada.
    // nesses casos de info de login , acessamos como abaixo:
    // contexto de dados do autenticado, localização, idioma... contexto da req
    const ong_id = request.headers.authorization;
    
    const [id] /*pega apenas o index 0=id*/= await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    })

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();
  
      if (incidents.ong_id != ong_id) {
        return response.status(401).json({error: 'Operation not permited'})
        // vai retornar que a operação é não permitida
      }

      await connection('incidents').where('id', id).delete();

      return response.status(204).send();
  
    }

}