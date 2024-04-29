class User {
    constructor({user_id, user_email, user_password}) {
        this.user_id = user_id;
        this.user_email = user_email;
        this.user_password = user_password;
    }
}

module.exports = User;