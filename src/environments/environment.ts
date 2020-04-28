// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl : 'http://localhost:8088/',
  usersUrl : 'http://localhost:8088/users/',
  loginUrl : 'http://localhost:8088/auth/login',
  addresses : '/addresses',
  pagedUsersUrl : 'http://localhost:8088/users/page/',
  logoutUrl: 'http://localhost:8088/auth/logout',
  headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Set-Cookie'
},
skills: '/skills',
usernames: 'usernames'

  
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
