// import { environment } from "../../../../environments/environment";

export const ASSET = {
  // baseUrl: environment.baseURL,
  buildings: {
    Buildings: '/api/buildings',
    GetBuildings: '/api/buildings',  // get
    GetBuildingsByID: '/api/buildings/{{id}}',  // get
    CreateBuildings: '/api/buildings/create',   // post
    UpdateBuildings: '/api/buildings/{id}/update', //PUT
    DeleteBuildings: '/api/buildings/{id}/delete' //DELETE
  },
  lands: {
    Lands: '/api/lands',
    GetLands: '/api/lands',  // get
    GetLandsByID: '/api/lands/{id}',  // get
    CreateLands: '/api/lands/create',   // post
    UpdateLands: '/api/lands/{id}/update',  //PUT
    DeleteLands: '/api/lands/{id}/delete' //DELETE
  },
  units: {
    Units: '/api/units',
    GetUnits: '/api/units',  // get
    GetUnitsByID: '/api/units/{id}',  // get
    CreateUnits: '/api/units/create',   // post
    UpdateUnits: '/api/units/{id}/update', //PUT
    DeleteUnits: '/api/units/{id}/delete' //DELETE
  }

} as const;
