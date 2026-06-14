import { Outlet, useNavigate } from 'react-router-dom'

function ProfileLayout() {
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <Outlet />
    </div>
  )
}

export default ProfileLayout