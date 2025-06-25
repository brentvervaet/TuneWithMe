const userRepo = require('../repository/user');
const ServiceError = require('../core/serviceError');
const Role = require('../core/roles');
const {verifyPassword, hashPassword} = require('../core/password');
const {generateJWT, verifyJWT} = require('../core/jwt');
const {getLogger} = require('../core/logging');

const handleDBError = require('./_handleDBError');

const makeExposedUser = ({id, firstname, lastname, username, email, roles}) => ({
    id,
    firstname,
    lastname,
    username,
    email,
    roles,
});

const makeLoginData = async (user) => {
    const token = await generateJWT(user);
    return {user: makeExposedUser(user), token};
};
const login = async (email, password) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
        throw ServiceError.unauthorized('The given email or password do not match');
    }

    const passwordValid = await verifyPassword(password, user.password_hash);
    if (!passwordValid) {
        throw ServiceError.unauthorized('The given email or password do not match');
    }

    return await makeLoginData(user);
};

//GET
const getAll = async () => {
    const items = await userRepo.findAll();
    return {
        items: items.map(makeExposedUser),
        count: items.length,
    };
};

const getById = async (id) => {
    const user = await userRepo.findById(id);
    if (!user) {
        throw new Error(`User with id ${id} not found`, {id});
    }
    return makeExposedUser(user);
};

const register = async ({firstname, lastname, username, email, password}) => {
    getLogger().info('Registering user', {firstname, lastname, username, email});

    const passwordHash = await hashPassword(password);

    const userId = await userRepo.create({
        firstname,
        lastname,
        username,
        email,
        passwordHash,
        roles: [Role.USER],
    });
    const user = await userRepo.findById(userId);
    return await makeLoginData(user);
};

const updateById = async (id, {username, email}) => {
    try {
        await userRepo.updateById(id, {username, email});
        return getById(id);
    } catch (err) {
        handleDBError(err);
    }
};

const deleteById = async (id) => {
    const deleted = await userRepo.deleteById(id);
    if (!deleted) {
        throw new Error(`User with id ${id} not found`, {id});
    }
    return deleted;
};

// This function will check if the user is signed in and parse the session data.
const checkAndParseSession = async (authHeader) => {
    if (!authHeader) {
        throw ServiceError.unauthorized('You need to be signed in');
    }

    if (!authHeader.startsWith('Bearer ')) {
        throw ServiceError.unauthorized('Invalid authentication token');
    }

    const authToken = authHeader.substring(7);
    try {
        const {roles, userId} = await verifyJWT(authToken);

        return {
            userId,
            roles,
            authToken,
        };
    } catch (err) {
        getLogger().error(err.message, {err});
        throw new Error(err.message);
    }
};

// This function will check if the user has the required role to access the given resource.
const checkRole = (role, roles) => {
    const hasPermission = roles.includes(role);

    if (!hasPermission) {
        throw ServiceError.forbidden(
            'You are not allowed to view this part of the application',
        );
    }
};

module.exports = {
    getAll,
    getById,
    register,
    updateById,
    deleteById,
    login,
    checkAndParseSession,
    checkRole,
};
