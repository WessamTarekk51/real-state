// import { environment } from "../../../../environments/environment";

export const ASSET = {
  // baseUrl: environment.baseURL,
  buildings: {
    Buildings: '/api/buildings',
    GetBuildingsByID: '/{{id}}', // get
    CreateBuildings: '/create', // post
    UpdateBuildings: '/update', //PUT
    DeleteBuildings: '/delete', //DELETE
    AllBuildings: '/dropdown'

  },
  lands: {
    Lands: '/api/lands', // get
    GetLandsByID: '/{id}', // get
    CreateLands: '/create', // post
    UpdateLands: '/update', //PUT
    DeleteLands: '/delete', //DELETE
    AllLands: '/dropdown'
  },
  units: {
    Units: '/api/units',
    GetUnitsByID: '/{id}', // get
    CreateUnits: '/create', // post
    UpdateUnits: '/update', //PUT
    DeleteUnits: '/delete', //DELETE
    AllUnits: '/dropdown'
  },
  document: {
    documnet:
      '/api/documents',
    createDocumnet:
      '/create',

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
  client:{
    Clients: '/api/clients',
    GetClientsByID: '/{id}', // get
    CreateClients: '/create', // post
    UpdateClients: '/update', //PUT
    DeleteClients: '/delete', //DELETE
  }
} as const;
