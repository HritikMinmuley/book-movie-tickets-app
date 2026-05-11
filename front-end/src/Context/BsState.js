import { useEffect, useState } from "react";
import BsContext from "./BsContext";
  
const BsState = (props) => {

    const [errorPopup,setErrorPopup] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const [movie, changeMovie] = useState('')

    const [time,changeTime] = useState('')

    const [noOfSeat, changeNoOfSeats] = useState({
        A1: "",
        A2: "",
        A3: "",
        A4: "",
        D1: "",
        D2: ""
    })

    const [lastBookingDetails, setLastBookingDetails] = useState(null)

    const handlePostBooking = async() => {
        try{
        const response = await fetch("http://localhost:5000/book",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({movie:movie,slot:time,seats:noOfSeat})
    })

    const data = await response.json()

    setErrorPopup(true)
    setErrorMessage(data.message)

    if(response.status === 201){
        changeTime("")
        changeMovie("")
        setLastBookingDetails(data.data)
        window.localStorage.clear()
    }
    }catch(error){

        console.log(error)
    }
}

    const handleGetBooking = async () => {
        try{
        const response = await fetch(
            "http://localhost:5000/tickets",{
                method: "GET",
            }
        )

        const data = await response.json()
        if(data.length > 0){
            setLastBookingDetails(data[data.length - 1])
        }
    }catch(error){

        console.log(error)
    }
}

    useEffect(()=>{
        const movie = window.localStorage.getItem("movie")
        const slot = window.localStorage.getItem("slot")
        const seats = JSON.parse(window.localStorage.getItem("seats"))

        if(movie){
            changeMovie(movie)
        }
        if(slot){
            changeTime(slot)
        }
        if(seats){
            changeNoOfSeats(seats)
        }
    },[])

    return(
        <BsContext.Provider value={{movie,changeMovie,time,changeTime,noOfSeat,changeNoOfSeats,lastBookingDetails,handleGetBooking,handlePostBooking,errorMessage,errorPopup,setErrorMessage,setErrorPopup}}>{props.children}</BsContext.Provider>
     )
}

export default BsState;