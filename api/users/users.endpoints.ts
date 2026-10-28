// The addresses (paths) of the Users API.
export const UsersEndpoints = {
  byId: (id: number) => `/users/${id}`,
  create: '/users/add',
} as const;