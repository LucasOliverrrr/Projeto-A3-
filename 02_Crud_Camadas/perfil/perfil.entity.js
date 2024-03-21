class Perfil {

    constructor(id, address_id, profile_endereco, profile_cidade, country_id) {
        this.id = id;
        this.address_id = address_id;
        this.profile_endereco = profile_endereco;
        this.profile_cidade = profile_cidade;
        this.country_id = country_id;
    }
}

module.exports = Perfil;