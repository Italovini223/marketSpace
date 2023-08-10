import { useState } from 'react'
import{ NavigationContainer } from '@react-navigation/native'

import { useAuth } from '@hooks/useAuth'
import { useProduct } from '@hooks/useProduct'


import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { Loading } from '@components/Loading'
import { Alert } from '@components/Alert'

export function Routes(){
  const [alertActive, setAlertActive] = useState(true)
  const { user, isLoadingUserData } = useAuth()

  const { product } = useProduct()

  if(isLoadingUserData){
    return <Loading />
  }
  
  return(
    <NavigationContainer>
      { user.id ? <AppRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  )
}