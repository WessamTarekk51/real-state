// import { environment } from "../../../../environments/environment";

export const ASSET = {
  // baseUrl: environment.baseURL,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUZXJyYUxpbmsiLCJleHAiOjE3NjkwNTQ2ODQsImlhdCI6MTc2NjQyNjY4NCwianRpIjoiNGJjNjMyMWYtOWVlZC00ZjA3LWIyNTgtYmQ1MzZiMTQwMzVkIiwiYXVkIjoiVGVycmFMaW5rQVBJIiwic3ViIjoiODYzOWYzNDctM2MyMi00NmZmLWE0MDAtYmY2ODgyMTYyNzliIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AdGVycmFsaW5rLmxvY2FsIiwibmFtZSI6IlN5c3RlbSBBZG1pbiIsInBob25lIjoiMDAwLTAwMDAtMDAwMCIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6IkFkbWluaXN0cmF0b3IiLCJuYmYiOjE3NjY0MjY2ODR9.frV82reEMxgR7z1XCarreV73rT4P1vy9NAvUoxpnfUo',
  buildings: {
    Buildings: '/api/buildings',
    GetBuildingsByID: '/{{id}}', // get
    CreateBuildings: '/create', // post
    UpdateBuildings: '/update', //PUT
    DeleteBuildings: '/delete', //DELETE
    AllBuildings: '/dropdown',
  },
  lands: {
    Lands: '/api/lands', // get
    GetLandsByID: '/{id}', // get
    CreateLands: '/create', // post
    UpdateLands: '/update', //PUT
    DeleteLands: '/delete', //DELETE
    AllLands: '/dropdown',
  },
  units: {
    Units: '/api/units',
    GetUnitsByID: '/{id}', // get
    CreateUnits: '/create', // post
    UpdateUnits: '/update', //PUT
    DeleteUnits: '/delete', //DELETE
    AllUnits: '/dropdown',
  },
  document: {
    documnet: '/api/documents',
    createDocumnet: '/create',

    createDocumnetBulidingPermit:
      '/api/documents/019aacb7-f6b5-72e3-aeaa-8f8a8dc01cd0/create',
    createDocumnetOwnershipCertificate:
      '/api/documents/019aacc1-ee89-7aad-8b32-323669f30b37/create',
    createDocumnetOwnershipContract:
      '/api/documents/019aacc2-e92c-7e11-8eeb-a4c1527f9106/create',
    createDocumnetRealStateRegistrationDocuments:
      '/api/documents/019aacc4-303c-79b3-916d-2cb2d2fe5a15/create',
  },
  lookup: {
    getSetByCode: '/api/lookups/sets/by-code',
    getItemByCode: '/items/by-code',
  },
  client: {
    Clients: '/api/clients',
    GetClientsByID: '/{id}', // get
    CreateClients: '/create', // post
    UpdateClients: '/update', //PUT
    DeleteClients: '/delete', //DELETE
  },
  role: {
    Roles: '/api/roles',
    Dashboard: '/dashboard',
    GetRoleByID: '/{id}', // get
    UpdateRole: '/update', //PUT
    DeleteRole: '/delete', //DELETE
  },
  user: {
    Users: '/api/user',
    Dashboard: '/dashboard',
    GetRoleByID: '/{id}', // get
    UpdateRole: '/update', //PUT
    DeleteRole: '/delete', //DELETE
  },
  worker: {
    workers: '/api/employees', // get
    GetWorkerByID: '/{id}', // get
    CreateWorker: '/create', // post
    UpdateWorker: '/update', //PUT
    DeleteWorker: '/delete', //DELETE
  },
  OutCome: {
    OutComes: '/api/outgoing-payments', // get
    GetOutComes: '/get', // get
    GetOutComeByID: '/get', // get
    CreateOutCome: '/create', // post
    UpdateOutCome: '/update', //PUT
    DeleteOutCome: '/delete', //DELETE
  },
} as const;
