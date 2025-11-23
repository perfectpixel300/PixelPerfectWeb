import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
    return (
        <div className='flex items-center justify-between sm:px-20 px-5 py-4'>
            <div className="logo text-sm font-semibold">
                PixelPerfect
            </div>
            <ul className='flex items-center gap-3 text-xs'>
                <li>
                    <Link to={"/admin/"}>
                        DashBoard
                    </Link>

                </li>
                <li>
                    <Link to={"/admin/create-product"}>
                    Create Product
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminNav