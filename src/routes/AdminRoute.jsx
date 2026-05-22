import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import UnAuthentication from '../pages/error/UnAuthentication';

const AdminRoute = ({children}) => {
    const {token, user} = useAuth();

    if(!token || !user) {
        return <UnAuthentication />
    }

    if(user.role !== 'ADMIN') {
        return <Navigate to="/" />
    }

  return children;
}

export default AdminRoute