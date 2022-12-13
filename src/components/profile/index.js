import * as service from "../../services/auth-service"
import {Route, Routes, useNavigate, useLocation, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import MyTuits from "./my-tuits";
import MyLikes from "./my-likes"
import MyDislikes from "./my-dislikes";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);
  const logout = () => {
    service.logout()
        .then(() => navigate('/login'));
  }

  return(
      <div>
        <h4>{profile.username}</h4>
        <h6>@{profile.username}</h6>
        <button onClick={logout}>
          Logout
        </button>

          <ul className="mt-4 nav nav-pills nav-fill">
              <li className="nav-item">
                  <Link to="/profile/mytuits"
                        className={`nav-link ${location.pathname.indexOf('mytuits') >= 0 ? 'active': ''}`}>
                      Tuits</Link>
              </li>
              <li className="nav-item">
                  <Link to="/profile/mylikes"
                        className={`nav-link ${location.pathname.indexOf('mylikes') >= 0 ? 'active': ''}`}>
                      Likes</Link>
              </li>
              <li className="nav-item">
                  <Link to="/profile/mydislikes"
                        className={`nav-link ${location.pathname.indexOf('mydislikes') >= 0 ? 'active': ''}`}>
                      Dislikes</Link>
              </li>
          </ul>
          <Routes>
              <Route path="/mytuits" element={<MyTuits/>}/>
              <Route path="/mylikes" element={<MyLikes/>}/>
              <Route path="/mydislikes" element={<MyDislikes/>}/>
          </Routes>
      </div>
  );
};
export default Profile;