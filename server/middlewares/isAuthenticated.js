
export const isAuthenticated = ( requestSessionObject ) => {
    if ( requestSessionObject.isAuthenticated ) {
        return true 
    }else {
        false 
    }
}