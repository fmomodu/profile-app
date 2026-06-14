import { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom'

function ProfileDetails() {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${id}`)
        .then((response) => response.json())
        .then((data) => setProfile(data))
        .catch((error) => console.log(error))
    }, [id])

    if (!profile) {
        return <p>Loading profile... </p>

    }

    if (profile.error) {
        return <p>{profile.error}</p>
    }
    return (
        <section> 
            <h1>{profile.name}</h1>
            <p>Title: {profile.title}</p>
            <p>Year: {profile.year}</p>
            <p>Major: {profile.major}</p>
            </section>
    )
}

export default ProfileDetails