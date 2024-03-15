const { v4: uuidv4 } = require("uuid");
const Perfil = require("./perfil.entity.js");
const PerfilDTO = require("./perfil.dto.js");

const perfis = [

  //Perfis na memória são locados aqui

  {
    id: uuidv4(),
    profile_endereco: "São Paulo",
    profile_cidade: "São Paulo",
    country_id: "1",
  },

  {
    id: uuidv4(),
    profile_endereco: "Rio de Janeiro",
    profile_cidade: "Rio de Janeiro",
    country_id: "2",
  }

];

class PerfilService {

  findOne(id){
    return perfis.find((perfil) => perfil.id === id);
  }

  findAll() {
    return perfis.map((perfil) => new PerfilDTO(perfil)); 
  }

  create(id, profile_endereco, profile_cidade, country_id) {
    id = uuidv4();
    const newPerfil = new Perfil(id, profile_endereco, profile_cidade, country_id);
    perfis.push(newPerfil);
    return newPerfil;
  }

  update(id, profile_endereco, profile_cidade, country_id){
    const perfilIndex = perfis.findIndex((perfil) => perfil.id === id);
    if (perfilIndex === -1) return null;
    const updatedPerfil = { id, profile_endereco, profile_cidade, country_id };
    perfis[perfilIndex] = updatedPerfil;
    return updatedPerfil;
  }

  remove(id) {

    const perfilIndex = perfis.findIndex((perfil) => perfil.id === id);
    if(perfilIndex === -1) return false;
    perfis.splice(perfilIndex, 1);
    return true;
  }

  patch(id, profile_endereco, profile_cidade, country_id){
    
    const perfilIndex = perfis.findIndex((perfil) => perfil.id === id);
    const perfil = perfis[perfilIndex];

    if(perfilIndex === -1) return null;

    //

    return perfil;
  }
}

module.exports = PerfilService;