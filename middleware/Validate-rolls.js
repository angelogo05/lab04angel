const { request, response } = require('express');

const Roles = {
    admin: 'admin',
    employee: 'employee'
};

const RequiereRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.Rol) {
            return res.status(500).json({
                ok: false,
                msg: "No se puede verificar el rol sin validar el token primero"
            });
        }
        const isInclude = roles.includes(req.Rol.toLowerCase());
        if (!isInclude) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado'
            });
        }
        next();
    }
}
module.exports = {
    Roles,
    RequiereRole
}