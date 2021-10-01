import {
  GET_ALL_ROLES, ROLES_PENDING, ROLES_ERROR,
  GET_SINGLE_ROLE, CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE,
} from '../constants/constants';

export const getAllRoles = rolesList => ({
  type: GET_ALL_ROLES,
  rolesList,
});

export const getSingleRole = role => ({
  type: GET_SINGLE_ROLE,
  role,
});

export const createRole = role => ({
  type: CREATE_ROLE,
  role
});

export const updateRole = (role, id) => ({
  type: UPDATE_ROLE,
  role,
  id,
});

export const deleteRole = id => ({
  type: DELETE_ROLE,
  id
});

export const rolesError = error => ({
  type: ROLES_ERROR,
  error,
});

export const rolesPending = () => ({
  type: ROLES_PENDING,
});