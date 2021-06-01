import axios from "axios";
import decode from "jwt-decode";
// defining logout function
const logout = () => {
    sessionStorage.clear();
    
}
let decodedToken;
let authAxios;
let user;
const apiUrl = "/";
// check in session storage if there is user ro not
const getUser =()=>{
     user = JSON.parse(sessionStorage.getItem("user")); 
    
    if (user) {
        decodedToken = decode(user.token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            // if token expires logout and return
            logout();
            return
        }
        authAxios = axios.create({
            baseURL: apiUrl,
            headers: {
              Authorization: `Bearer ${user.token}`,
              userId: decodedToken.id,
            },
       })
    }
     else if(!user){
         // if user is not login and try to hit the other route redirect them to login.
        window.location.pathname = "/login";
         return
     }
  }



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