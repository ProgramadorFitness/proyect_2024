import { ADMIN, CLIENT, COLLECTOR, SUPERVISOR } from "../../models/roles";

const roles = Object.freeze({
    admin: ADMIN, 
    client: CLIENT, 
    collector : COLLECTOR,
    supervisor: SUPERVISOR
});

export const hasRole = (arryRole: string[], rol: string) => {
    const roleArray = Object.keys(roles);

  const result = arryRole.filter((role) =>
    roleArray.find((item) => item === role)
  );

  return result.includes(rol);
}