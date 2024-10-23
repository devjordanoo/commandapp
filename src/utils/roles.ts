export enum Roles {
    admin = 0,
    attendant = 1
}

export const getUserRoleName = (role: Roles) => {
    switch (role) {
        case Roles.admin:
            return "Administrador"
        case Roles.attendant:
            return "Atendente"
    }
}