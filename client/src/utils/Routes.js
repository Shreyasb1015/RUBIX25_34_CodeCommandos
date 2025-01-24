const BASE_URL = "http://localhost:3000"
const BASE_URL_2 = "http://localhost:5000"
const ADD = "api"
const ADD2="v1"
const USER = "users"

export const SIGNUP_ROUTE = `${BASE_URL}/${ADD}/${ADD2}/${USER}/register`
export const LOGIN_ROUTE = `${BASE_URL}/${ADD}/${ADD2}/${USER}/login`
export const LOGOUT_ROUTE = `${BASE_URL}/${ADD}/${USER}/logout`
export const TOKEN_ROUTE = `${BASE_URL}/${ADD}/${USER}/verify-token`
export const EDIT_PROFILE_ROUTE = `${BASE_URL}/${ADD}/${USER}/`
export const GET_ALL_JUDGES_HACKATHON_ROUTE = `${BASE_URL}/${ADD}/${ADD2}/users/alljudgehackathons`
export const GET_ALL_JUDGES=`${BASE_URL}/${ADD}/${ADD2}/users/alljudges`    

export const CHATBOT_URL=`${BASE_URL_2}/query`
export const FETCH_RELEVANT_TEAMMATES=`${BASE_URL_2}/fetch_relevant_users`
export const GET_AI_REVIEW=`${BASE_URL_2}/analyze-repo`



export const CREATE_HAKATHON_ROUTE = `${BASE_URL}/${ADD}/${ADD2}/hackathons/create`
export const GET_ACTIVE_UPCOMING_HACKATHONS_ROUTE = `${BASE_URL}/${ADD}/${ADD2}/hackathons/active-upcoming`
export const GET_HACKATHON_BY_ID_ROUTE = `${BASE_URL}/${ADD}/${ADD2}/hackathons`


export const SEND_TEAM_INVITE_ROUTE = `${BASE_URL}/${ADD}/${ADD2}/teams/send-invite`;
export const GET_TEAMS_BY_HACKATHON_ROUTE = `${BASE_URL}/${ADD}/${ADD2}/teams/hackathon`;
export const GET_TEAM_BY_ID_ROUTE = `${BASE_URL}/${ADD}/${ADD2}/teams/getteam`;
export const UPDATE_RANKING_ROUTE = `${BASE_URL}/${ADD}/${ADD2}/teams/rank`;
export const CREATE_TEAM_ROUTE = `${BASE_URL}/${ADD}/${ADD2}/teams/create`;
