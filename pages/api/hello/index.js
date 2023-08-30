import {getSession} from 'next-auth/react'

export default async function handler(req,res) {
    const session = await getSession({req}); // If getServersideProps, then {context}
    console.log('desde /api/hello: ', session)
    if (!session) return res.status(403).send('Forbidden') 
    
    res.status(200).json({ name: 'John Doe Hardcoded' })
}