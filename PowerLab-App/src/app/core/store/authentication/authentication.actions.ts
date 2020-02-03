import { Action } from '@ngrx/store'
import AuthenticationDataModel from '../../models/AuthnticationDataModel'

export const AUTHENTICATE = '[AUTHENTICATION] AUTHENTICATE'
export const DEAUTHENTICATE = '[AUTHENTICATION] DEAUTHENTICATE'

export class Authenticate implements Action {
    readonly type: string = AUTHENTICATE

    constructor(public payload: AuthenticationDataModel) {}
}

export class Deauthenticate implements Action {
    readonly type: string = DEAUTHENTICATE
}
