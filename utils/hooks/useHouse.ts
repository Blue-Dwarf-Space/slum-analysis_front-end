import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { db } from '../db'
import { House } from '../../types/ash'




export function NewHouse() {
    const [inserting, setInserting] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [newHouse, setHouse] = useState<House | null>(null)


    useEffect(() => {
        ; (async function () {
            try {
                setInserting(true)

                const newHouseData = await db
                    .houses()
                    .insert({
                        // name: 'New House',
                    })

                    if (newHouseData.data) {
                        console.log('useHouse.ts - newHouseData.data', newHouseData.data)
                        setHouse(newHouseData.data[0])
                    }

            } catch (newHouseError: any) {
                setError(newHouseError)
            } finally {
                setInserting(false)
            }
        })()
    }, [])

    // console.log('newHouseasdf', newHouse)
    // console.log('errorasdf', error)

    return { error, newHouse }
}





// TODO: figure out how to deal with single vs multiple houses

export function GetHouse(houseId: number) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [house, setHouse] = useState<House | null>(null)


    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                if (!houseId) {
                    console.log('useHouse.ts - no houseId')
                    throw new Error('No houseId provided')
                }

                const { data, error, status } = await db
                    .houses()
                    .select('*')
                    .eq('id', houseId)
                    .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setHouse(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setError(null)
                setLoading(false)
            }
        })()
    }, [houseId])

    // console.log('loadingasdf', loading)
    // console.log('errorasdf', error)
    // console.log('houseasdf', house)

    return { loading, error, house }

}




export function GetHouses(session: AuthSession) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [houses, setHouses] = useState<House[] | null>(null)

    useEffect(() => {
        ; (async function () {
            try {
                setLoading(true)

                const { data, error, status } = await db
                    .houses()
                    .select('*')
                // .eq('id', user.id)
                // .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setHouses(data)
                }
            } catch (error: any) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [session])

    if (loading) {
        console.count('GetHouses - loading: ' + loading + ' | callCownt')
    }
    if (error) {
        console.count('GetHouses - error: ' + error + ' | callCownt')
    } else {
        console.count('GetHouses - houses.length: ' + houses?.length + ' | callCownt')
    }

    return { loading, error, houses }
}
