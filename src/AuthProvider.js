import React, {useState, useEffect} from 'react';
import axios from './Components/axios/axios';
import {useNavigate} from 'react-router-dom';

export const AuthContext = React.createContext({
    user: null,
    token: null,
    role: null,
    showCreateForum: false,
    mostReadBlog: null,
    marginDiv: false,
    query: null,
    visible: false,
    isPopUpOpen: false,
    searchData: null,
    appInit: false,
    setToken: () => {
    },
    setRole: () => {
    },
    fetchUser: () => {
    },
    fetchMostReadBlog: () => {
    },
    setMarginDiv: () => {
    },
    handleShowCreateForum: () => {
    },
    handleSearch: () => {
    },
    setQuery: () => {
    },
    setVisible: () => {
    },
    setIsPopUpOpen: () => {
    },
});


const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [showCreateForum, setCreateForum] = useState(false);
    const [token, setToken] = useState(null);
    const [appInit, setAppInit] = useState(false);
    const [mostReadBlog, setMostReadBlog] = useState({});
    const [marginDiv, setMarginDiv] = useState(false);
    const [query, setQuery] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setMarginDiv(localStorage.getItem("isOpen"))
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        localStorage.setItem("query", query);

        // axios.get(`/api/search/?search=${query}`)
        /*  axios.post("/api/search/", {*/
        axios.post("/api/advance/search/", {
                search_key: query
            }
        )
            .then(response => {
                // console.log(response.data);
                setSearchData(response.data);
                setTimeout(() => {
                    setAppInit(true);
                }, 500);
                navigate("/search")
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleShowCreateForum = () => {
        setCreateForum(!showCreateForum);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('access');
        const roleName = localStorage.getItem('role');
        if (accessToken) {
            handleSetToken(accessToken);
        }
        if (roleName) {
            handleSetRole(roleName);
        }
        setTimeout(() => {
            setAppInit(true);
        }, 500);
    }, []);

    const handleSetToken = (token) => {
        if (token) {
            setToken(token);
            localStorage.setItem('access', token);
            fetchUser(token);
        } else {
            setToken(null);
            setUser(null);
            setRole(null)
            localStorage.removeItem('access');
            localStorage.removeItem('role');
            localStorage.removeItem('jwt');
        }
    }
    const handleSetRole = (role) => {
        if (role) {
            setRole(role);
            localStorage.setItem('role', role);
        } else {
            setToken(null);
            setUser(null);
            setRole(null)
            localStorage.removeItem('access');
            localStorage.removeItem('role');
            localStorage.removeItem('jwt');
        }
    }
    const fetchUser = (jwt = token) => {
        axios.post('/api/profile/',
            {jwt}
        )
            .then(response => {
                setUser(response.data);
                if (response.data.role!==localStorage.getItem('role')){
                    navigate("/login")
                    handleSetToken(null);
                    localStorage.removeItem('access');
                    localStorage.removeItem('role');
                    localStorage.removeItem('jwt');
                }
            })
            .catch(error => {
                if (error.response.status === 403) {
                    navigate("/login")
                    handleSetToken(null);
                }
            });
    }

    const fetchMostReadBlog = () => {
        axios.get(
          /*  `/api/blogs/topviewer/`*/
            `/api/features/items/list/`
        )
            .then(res => {
                setMostReadBlog(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <AuthContext.Provider value={{
            user,role, token, appInit, mostReadBlog, marginDiv, showCreateForum, query, searchData,
            visible, isPopUpOpen,
            setUser,setRole:handleSetRole, setToken: handleSetToken, handleShowCreateForum, handleSearch,
            fetchUser, fetchMostReadBlog, setMarginDiv, setQuery, setVisible, setIsPopUpOpen
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
