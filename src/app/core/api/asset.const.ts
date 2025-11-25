// import { environment } from "../../../../environments/environment";

export const ASSET = {
  // baseUrl: environment.baseURL,
  buildings: {
    Buildings: '/api/buildings',
    GetBuildings: '/api/buildings', // get
    GetBuildingsByID: '/api/buildings/{{id}}', // get
    CreateBuildings: '/api/buildings/create', // post
    UpdateBuildings: '/api/buildings/{id}/update', //PUT
    DeleteBuildings: '/api/buildings/{id}/delete', //DELETE
  },
  lands: {
    Lands: '/api/lands',
    GetLands: '/api/lands', // get
    GetLandsByID: '/api/lands/{id}', // get
    CreateLands: '/api/lands/create', // post
    UpdateLands: '/api/lands/{id}/update', //PUT
    DeleteLands: '/api/lands/{id}/delete', //DELETE
  },
  units: {
    Units: '/api/units',
    GetUnits: '/api/units', // get
    GetUnitsByID: '/api/units/{id}', // get
    CreateUnits: '/api/units/create', // post
    UpdateUnits: '/api/units/{id}/update', //PUT
    DeleteUnits: '/api/units/{id}/delete', //DELETE
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
} as const;
