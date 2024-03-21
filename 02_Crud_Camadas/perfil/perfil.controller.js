const PerfilService = require('./perfil.service');
const perfilService = new PerfilService(); //Perguntar depois

class PerfilController {

    createPerfil (req, res) {

        const { id, profile_endereco, profile_cidade, country_id } = req.body;
        const perfil = perfilService.create(id, profile_endereco, profile_cidade, country_id);
        res.json(perfil);
    }

    getAllPerfis(req, res) {
        const perfis = perfilService.findAll();
        res.json(perfis);
    }

    getPerfilById (req, res){

        const { id } = req.params;
        const perfil = perfilService.findOne(id);

        if(!perfil) {
            return res.status(404).send('Register not found');
        }

        res.json(perfil);
    }

    getPerfilByIdAndAddress(req, res){

        const { id, address_id } = req.params;
        const perfil = perfilService.findOneByIdAndAddress(id, address_id);

        if(!perfil) {
            return res.status(404).send('Register not found');
        }

        res.json(perfil);
    }

    updatePerfil (req, res){

        const { id, address_id } = req.params;
        const { profile_endereco, profile_cidade, country_id } = req.body;
        const updatedPerfil = perfilService.update(id, address_id, profile_endereco, profile_cidade, country_id)
        if (!updatedPerfil) return res.status(404).send('User not found');
        console.log("jose");
        res.status(200).json(updatedPerfil);
    }   

    deletePerfil (req, res) {
        const { id, address_id } = req.params;
        const result = perfilService.remove(id, address_id);
        if (!result) return res.status(404).send('User not found');
        res.status(204).send();
    }

    patchPerfil (req, res) {

        const { id } = req.params;
        const { profile_endereco, profile_cidade, country_id } = req.body;

        const perfil = perfilService.findOne(id);

        if(!perfil) return res.status(404).send('User not found');

        const updatedFields = {};
        if (profile_endereco) {
            updatedFields.profile_endereco = profile_endereco;
        }
        if (profile_cidade) {
            updatedFields.profile_cidade = profile_cidade;
        }
        if (country_id) {
            updatedFields.country_id = country_id;
        }

        const updatedPerfil = perfilService.patch(id, updatedFields);

        res.status(200).json(updatedPerfil);
    }
}

module.exports = PerfilController;