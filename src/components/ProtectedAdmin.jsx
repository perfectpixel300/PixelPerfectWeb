import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedAdmin = ({ children }) => {
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(false)
    async function Request() {
        axios.get(`${import.meta.env.VITE_API_URL}/auth/is-admin`, {
            withCredentials: true
        }).then(result => {
            {
                console.log(result);
                if (result.data.isAdmin) {
                    setIsAdmin(true)
                }
                else {
                    navigate("/admin/login")
                }
            }
        }).catch(() => {
            {
                navigate("/admin/login")

            }
        })


    }
    useEffect(() => {
        Request()
    }, [])
    return (
        <>
            {(isAdmin) ? children : ""}
        </>
    )
}

export default ProtectedAdmin