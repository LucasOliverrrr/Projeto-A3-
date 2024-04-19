const { v4: uuidv4 } = require("uuid");
const Perfil = require("./perfil.entity.js");
const PerfilDTO = require("./perfil.dto.js");

const perfis = [

  //Perfis na memória são locados aqui

  {
    user_id: "1",
    profile_address_id: "1",
    profile_endereco: "enderecos",
    profile_cidade: "belo horizonte",
    country_id: "br",
  },

  {
    user_id: "1",
    profile_address_id: "2",
    profile_endereco: "enderecos",
    profile_cidade: "belo horizonte",
    country_id: "br",
  }

];

class PerfilService {

  findAll() {
    return perfis.map((perfil) => new PerfilDTO(perfil)); 
  }

  findOne(user_id){
    return perfis.find((perfil) => perfil.user_id === id);
  }

  findOneByIdAndAddress(user_id, address_id){
    return perfis.find((perfil) => perfil.user_id === id && perfil.address_id === address_id);
  }

  create(perfilDTO) {
    perfilDTO.profile_address_id = uuidv4();
    perfis.push(perfilDTO);
    return perfilDTO;
  }

  update(user_id, address_id, profile_endereco, profile_cidade, country_id){
    const perfilIndex = perfis.findIndex((perfil) => perfil.id === id && perfil.address_id === address_id);
    if (perfilIndex === -1) return null;
    const updatedPerfil = { user_id, profile_endereco, profile_cidade, country_id };
    perfis[perfilIndex] = updatedPerfil;
    return updatedPerfil;
  }

  remove(user_id, address_id) {

    const perfilIndex = perfis.findIndex((perfil) => perfil.user_id === id && perfil.address_id === address_id);
    if(perfilIndex === -1) return false;
    perfis.splice(perfilIndex, 1);
    return true;
  }

  patch(id, updatedFields){
    
    const perfilIndex = perfis.findIndex((perfil) => perfil.id === id);
    if(perfilIndex === -1) return null;

    const perfil = perfis[perfilIndex];

    for (const field in updatedFields) {
      if (Object.prototype.hasOwnProperty.call(updatedFields, field)) {
        perfil[field] = updatedFields[field];
      }
    }

    return perfil;
  }
}

module.exports = PerfilService;
export default PerfilService; 