/* eslint-disable no-unused-vars */


import supabase from './supabase';




export const signUp = async (email,password,name) => {
    const {data, error} = await supabase.auth.signUp(
        {
            email,
            password,
            options: {
                data: {
                    name: name,
                }
            }
        
        }
    )
    return {data,error}
}

export const signIn = async (email,password) => {
    const {data, error} = await supabase.auth.signInWithPassword(
        {
            email,
            password
        }
    )
    return {data,error}
}

export const signOut = async () => {
    const {error} = await supabase.auth.signOut({scope:'global',})
    return {error}
}


export const signInWithGoogle = async () => {
    try {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            queryParams: {
                access_type: 'offline',
                prompt:'select_account',
              } 
        })
        if (error) throw new Error("Error signing in with Google");
        return data;
    } catch (error) {
        console.log(error)
        
    }
}

