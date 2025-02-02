import { Link, Route, Routes } from "react-router-dom";

import { useUserContext } from "../../context/userContext"
import { useGetOneUser } from "../../hooks/useAuth"
import { onProfileImageError } from "../../utils/imageError";

import styles from "./Profile.module.css"

import LikedMovies from "./liked-movies/LikedMovies";
import SavedMovies from "./saved-movies/SavedMovies";
import CreatedMovies from "./created-movies/CreatedMovies";
import ProfileEdit from "./profile-edit/ProfileEdit";
import ProfileChangePassword from "./profile-change-password/ProfileChangePassword";
import SuccessfullyChangedPassword from "./successfully-changed-password/SuccessfullyChangedPassword";
import FullImage from "./full-image/FullImage";
import AdminGuard from "../../commons/AdminGuard";
import UserProfileGuard from "../../commons/UserProfileGuard";

export default function Profile() {
    const { user } = useUserContext();
    const initialValues={
        _id:"",
        username:"",
        email:"",
        profileImage:"",
        isAdmin:false,
        likedMovies: [], savedMovies: [], createdMovies: []
    }
    const { curUser, setCurUser } = useGetOneUser(initialValues, user?._id);

    return (
        <>
            <Routes>
                <Route element={<UserProfileGuard />}>
                    <Route path="likedMovies" element={<LikedMovies likedMovies={(curUser as { likedMovies: [] }).likedMovies} />} />
                    <Route path="savedMovies" element={<SavedMovies savedMovies={(curUser as { savedMovies: [] }).savedMovies} />} />
                </Route>
                <Route element={<AdminGuard />}>
                    <Route path="createdMovies" element={<CreatedMovies createdMovies={(curUser as { createdMovies: [] }).createdMovies} />} />
                </Route>
                <Route path=":userId/edit" element={<ProfileEdit user={curUser} setUser={setCurUser} />} />
                <Route path=":userId/changePassword" element={<ProfileChangePassword setCurUser={setCurUser} />} />
                <Route path="successfullyChanged" element={<SuccessfullyChangedPassword />} />
                <Route path="fullImage" element={<FullImage image={(curUser as { profileImage: string }).profileImage} username={(curUser as { username: string }).username} />} />
            </Routes>
            {(curUser as { isAdmin: boolean }).isAdmin
                ? <>
                    <section className={styles.profileHeader}>
                        <Link to={`/profile/fullImage`}><img src={(curUser as { profileImage: string }).profileImage} alt={(curUser as { username: string }).username} onError={onProfileImageError} /></Link>
                        <h2>{curUser.username}</h2>
                        <h3>{curUser.email}</h3>
                        <p>Created movies: {curUser.createdMovies.length}</p>
                        <Link to={`/profile/${curUser._id}/edit`}><button>Edit profile</button></Link>
                        <Link to={`/profile/${curUser._id}/changePassword`}><button>Change password</button></Link>
                    </section>
                    <section className={styles.profileBody}>
                        <Link to="/profile/createdMovies">
                            <article>
                                <p>Created Movies</p>
                            </article>
                        </Link>
                    </section>
                </>
                : <>
                    <section className={styles.profileHeader}>
                        <Link to={`/profile/fullImage`}><img src={curUser.profileImage} alt={curUser.username} onError={onProfileImageError} /></Link>
                        <h2>{curUser.username}</h2>
                        <h3>{curUser.email}</h3>
                        <p>Saved movies count: {curUser.savedMovies.length}</p>
                        <p>Liked movies count: {curUser.likedMovies.length}</p>
                        <Link to={`/profile/${curUser._id}/edit`}><button>Edit profile</button></Link>
                        <Link to={`/profile/${curUser._id}/changePassword`}><button>Change password</button></Link>
                    </section>
                    <section className={styles.profileBody}>
                        <Link to="/profile/savedMovies">
                            <article>
                                <p>Saved movies</p>
                            </article>
                        </Link>
                        <Link to="/profile/likedMovies">
                            <article>
                                <p>Liked Movies</p>
                            </article>
                        </Link>
                    </section>
                </>
            }
        </>
    )
}