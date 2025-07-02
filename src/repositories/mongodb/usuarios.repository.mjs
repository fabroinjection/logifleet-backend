export class UsuarioRepository {
    constructor(UsuarioModel) {
        this.Usuario = UsuarioModel;
    }

    async getByEmail(email) {
        return await this.Usuario.findOne({ email, delete: false });
    }

    async register(data) {
        return await this.Usuario.create(data);
    }

    async delete(id) {
        const usuario = await this.Usuario.findOne({ _id: id, delete: false });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        return await usuario.updateOne({ delete: true });
    }
}
