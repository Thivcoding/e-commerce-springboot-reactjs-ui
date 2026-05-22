import { useAuth } from '../hooks/useAuth';
import UnAuthentication from '../pages/error/UnAuthentication';

const ProtectRoute = ({children}) => {
    const {token, user} = useAuth();

    if(!token || !user) {
        return <UnAuthentication />
    }

  return children;
}

export default ProtectRoute