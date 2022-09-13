import { useState, useEffect, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"

export default function useUserData(user, access) {
    let [userData, setUserdata] = useState(null)
    let [loading, setLoading] = useState(true)
    let fetchData = useCallback(() => {
        async function fetchUser() {
            try {
                let response = await fetch(`https://quickly-a.herokuapp.com/api/${access}/${user}`, {
                    method: "GET",
                })
                let { payload } = await response.json()
                setUserdata(payload)
                setLoading(false)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [user, access])

    useFocusEffect(fetchData)
    
    async function postData(data) {
        setLoading(true)
        try {
            let response = await fetch(`https://quickly-a.herokuapp.com/api/${access}/${user}`, {
                method: "POST",
                body: JSON.stringify(data)
            })
        }
        catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    return { userData, loading, fetchData, postData }
}