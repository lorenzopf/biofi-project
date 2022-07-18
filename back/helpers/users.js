const User = require('../models/userModel'); 

/**
 *
 * @param {*} pseudo - The User pseudo
 *
 * This function return all the Users of the User collection
 */
 function isPseudoExist(pseudo) {
    let pseudoExist = false;

    pseudoExist = User.findOne({ pseudo: pseudo }).then((user) => {
        if (user)
            return true;
        return false;
    });

    return pseudoExist;
}

module.exports.isPseudoExist = isPseudoExist;