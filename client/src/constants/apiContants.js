import axios from "axios";
import decode from "jwt-decode";
//export const API_BASE_URL = 'http://localhost:3001/api/';
// make all the function to get post update and delete for each and every one and then call from separate file 
// const user = JSON.parse(sessionStorage.getItem("user"));
// const token = user?.token;
const logout = () => {
    sessionStorage.clear();
    window.location.pathname = "/login";
}
let decodedToken;
let authAxios;
const apiUrl = "/";
const getUser =()=>{
    const user = JSON.parse(sessionStorage.getItem("user")); 
    decodedToken = decode(user.token);
    if (user) {
        
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout();
            return
        }
    }
     
    authAxios = axios.create({
     baseURL: apiUrl,
     headers: {
       Authorization: `Bearer ${user.token}`,
       userId: decodedToken.id,
     },
})}



export default{
    // journal
    getJournal:function(id){
        getUser();
        return authAxios.get(`user/journal/${decodedToken.id}`)
    },
    deleteJournal:function(id){
        getUser();
        return authAxios.delete(`user/journal/`+ id)
    },
    createJournal:function(journal){
        return authAxios.post(`user/journal/`, journal)
    },
    // article
    getArticle:function(id){
        getUser();
        return authAxios.get(`article/get/` + id )
    },
    createArticle:function(article){
        getUser();
        return authAxios.post(`article/create/`, article )
    },
    deleteArticle:function(id){
        getUser();
        return authAxios.delete(`article/delete/`+ id )
    },
    updateArticle:function(article){
        getUser();
        return authAxios.put(`article/update/`, article )
    },
    // quote
    // to save quote
    createQuote:function(quote){
        getUser();
        return authAxios.post(`quote/create/`, quote )
    },
    // to delete quote
    deleteQuote:function(id){
        getUser();
        return authAxios.delete(`quote/delete/${id}`)
    },
    // to get quote
    getQuote:function(id){
        getUser();
        return authAxios.get(`quote/get/${decodedToken.id}`)
    },


}