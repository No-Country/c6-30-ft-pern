import { useFocusEffect } from '@react-navigation/native'
import { useState, useEffect, useCallback } from 'react'
import { defaultText, buildDate, filterSchedule } from "./helpers"
import { url, days } from './helpers'
import axios from 'axios'

export function useDate(provider) {
    let [date, setDate] = useState(new Date())
    let [dateText, setDateText] = useState(defaultText)
    let [finalDate, setFinalDate] = useState(date.toString())
    let updateDate = dateObject => {
        setDate(dateObject);
        setDateText(buildDate(dateObject))
        setFinalDate(dateObject.toString())
    }
    let emptyDate = () => {
        let resetDate = new Date()
        setDate(resetDate)
        setDateText(defaultText)
        setFinalDate(resetDate.toString())
    }
    let cleanup = useCallback(() => {
        return emptyDate
    }, [])

    useEffect(() => { emptyDate() }, [provider])
    useFocusEffect(cleanup)

    return { date, dateText, finalDate, updateDate }
}

export function useCategories() {
    let [data, setData] = useState(null)
    let [pickedCategory, setPickedCategory] = useState(null)
    let [categories, setCategories] = useState([])
    let [provider, setProvider] = useState(null)
    let [providers, setProviders] = useState([])
    let fetchData = useCallback(() => {
        async function fetchCategories() {
            try {
                let res = await axios.get(`${url}/api/service`)
                let uniqueList = new Set(res.data.payload.map(k => k.category))
                let categories = Array.from(uniqueList)
                setData(res.data.payload)
                setCategories(categories)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchCategories()
        return () => {
            setPickedCategory(null)
            setProvider(null)
            setProviders([])
        }
    }, [])

    useFocusEffect(fetchData)

    function updateCategory(selectedService) {
        let filteredData = data.filter(k => k.category === selectedService)
        setPickedCategory(selectedService)
        setProviders(filteredData)
    }
    return { data, categories, pickedCategory, setPickedCategory, updateCategory, provider, providers, setProvider }
}

export function useTime(provider, date) {
    let [schedule, setSchedule] = useState([])
    let [pickedTime, setPickedTime] = useState(null)
    let updateSchedule = useCallback(() => {
        if (!provider) return
        let dayOfTheWeek = days[date.getDay()]
        let times = provider.Date[dayOfTheWeek]
        let ordersDates = provider.Orders.map(k => new Date(k.date).toString())
        let filteredSchedule = filterSchedule(times, date, ordersDates)
        setSchedule(filteredSchedule)
    }, [provider, date.getFullYear(), date.getDate(), date.getMonth()])

    useEffect(() => {
        setPickedTime(null)
        updateSchedule()
    }, [updateSchedule])

    return { schedule, pickedTime, setPickedTime, updateSchedule }
}

export function useMode() {
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    return { mode, show, setShow, showMode }
}
