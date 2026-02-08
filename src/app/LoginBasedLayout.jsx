import React, { Children } from 'react'
import AdminLayout from './AdminLayout'
import { useSelector } from 'react-redux';

export default function LoginBasedLayout({children}) {
    const user = useSelector((state) => state.user.token);
  return (
    <div>
      {
        user?
        <AdminLayout>
           {children}
        </AdminLayout>
        :
        children
      }
    </div>
  )
}
