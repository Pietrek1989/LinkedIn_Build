export const GET_USER_PROFILE_LIST = "GET_USER_PROFILE_LIST"; //GET - fetches the user list https://striveschool-api.herokuapp.com/api/profile/
export const GET_USER_PROFILE_API = "GET_USER_PROFILE_API"; //GET - Retrieves the API owner's profile https://striveschool-api.herokuapp.com/api/profile/me
export const GET_USER_PROFILE_ID = "GET_USER_PROFILE_ID"; //GET - Retrieves a specifit profile with ID https://striveschool-api.herokuapp.com/api/profile/{userId}
export const PUT_USER_PROFILE_UPDATE = "PUT_USER_PROFILE_UPDATE"; //PUT - Update the current user's profile https://striveschool-api.herokuapp.com/api/profile/
export const GET_USER_LOADING = "GET_USER_LOADING"; //For loaders & spinners
export const GET_USER_ERROR = "GET_USER_ERROR"; //For error messages
export const GET_SEARCH_RESULT = "GET_SEARCH_RESULT";
export const GET_ALL_PROFILE = "GET_ALL_PROFILE";
export const GET_EXPERIENCE = "GET_EXPERIENCE";
export const GET_SPECIFIC_PROFILE = "GET_SPECIFIC_PROFILE";
export const GET_EXPERIENCE_WITH_EXP_ID = "GET_EXPERIENCE_WITH_EXP_ID";
export const DELETE_EXPERIENCE = "DELETE_EXPERIENCE";
export const POST_USER_EXPERIENCE = "POST_USER_EXPERIENCE";
export const POST_THE_POST = "POST_THE_POST";
export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_WITH_ID = "GET_POSTS_WITH_ID";
export const PUT_USER_EXPERIENCE_UPDATE = "PUT_USER_EXPERIENCE_UPDATE"

const options = {
    method: "GET",
    headers: {
        Authorization:
            `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
};

export const getUserProfileApi = () => {
    return async (dispatch, getState) => {
        const baseEndpoint = `https://striveschool-api.herokuapp.com/api/profile/me`;
        try {
            let resp = await fetch(baseEndpoint, options);
            if (resp.ok) {
                dispatch({
                    type: GET_USER_LOADING,
                    payload: true,
                });
                let data = await resp.json();
                dispatch({
                    type: GET_USER_PROFILE_API,
                    payload: data,
                });
                dispatch({
                    type: GET_USER_LOADING,
                    payload: false,
                });
            } else {
                dispatch({
                    type: GET_USER_LOADING,
                    payload: false,
                });
                dispatch({
                    type: GET_USER_ERROR,
                    payload: true,
                });
            }
        } catch (error) {
            dispatch({
                type: GET_USER_LOADING,
                payload: false,
            });
            dispatch({
                type: GET_USER_ERROR,
                payload: true,
            });
        }
    };
};

export const putUserProfileApi = () => {
    const nameInput = document.getElementById("change-name")
    const surnameInput = document.getElementById("change-surname")
    const emailInput = document.getElementById("change-email")
    const titleInput = document.getElementById("change-title")
    const areaInput = document.getElementById("change-area")
    const usernameInput = document.getElementById("change-username")
    const bioInput = document.getElementById("change-bio")
    const editedData = {
        "name": nameInput.value ? (nameInput.value) : (nameInput.placeholder),
        "surname": surnameInput.value ? (surnameInput.value) : (surnameInput.placeholder),
        "email": emailInput.value ? (emailInput.value) : (emailInput.placeholder),
        "title": titleInput.value ? (titleInput.value) : (titleInput.placeholder),
        "area": areaInput.value ? (areaInput.value) : (areaInput.placeholder),
        "username": usernameInput.value ? (usernameInput.value) : (usernameInput.placeholder),
        "bio": bioInput.value ? (bioInput.value) : (bioInput.placeholder)
    }

    const optionsPUT = {
        method: "PUT",
        headers: new Headers(
            {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            }),
        body: JSON.stringify(editedData),
    };

    return async (dispatch, getState) => {
        const baseEndpoint = `https://striveschool-api.herokuapp.com/api/profile/`;

        try {
            let resp = await fetch(baseEndpoint, optionsPUT);
            if (resp.ok) {
                dispatch({
                    type: GET_USER_LOADING,
                    payload: true,
                })
                let data = await resp.json();
                dispatch({
                    type: PUT_USER_PROFILE_UPDATE,
                    payload: data,
                })
                dispatch(getUserProfileApi())
                dispatch({
                    type: GET_USER_LOADING,
                    payload: false,
                })
            } else {
                dispatch({
                    type: GET_USER_LOADING,
                    payload: false,
                })
                dispatch({
                    type: GET_USER_ERROR,
                    payload: true,
                })
            }
        } catch (error) {
            dispatch({
                type: GET_USER_LOADING,
                payload: false,
            })
            dispatch({
                type: GET_USER_ERROR,
                payload: true,
            })
        }
    }
};


export const getAllProfileActionAsync = () => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(
                "https://striveschool-api.herokuapp.com/api/profile/",
                {
                    headers: {
                        Authorization:
                            `Bearer ${process.env.REACT_APP_API_KEY}`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                dispatch({
                    type: GET_ALL_PROFILE,
                    payload: data,
                });
            } else {
                alert("Error fetching results");
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getSearchResultActionAsync = (data, search) => {
    return {
        type: GET_SEARCH_RESULT,
        payload: data.filter(
            (el) =>
                el.name.toLowerCase().includes(search.toLowerCase()) ||
                el.surname.toLowerCase().includes(search.toLowerCase())
        ),
    };
};

export const getSpecificProfileAction = (query) => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(
                "https://striveschool-api.herokuapp.com/api/profile/" + query,
                options
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                dispatch({
                    type: GET_SPECIFIC_PROFILE,
                    payload: data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getExperienceAction = (query) => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(
                `https://striveschool-api.herokuapp.com/api/profile/${query}/experiences`,
                options
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                dispatch({
                    type: GET_EXPERIENCE,
                    payload: data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getExperienceWithExpIdAction = (query, expId) => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(
                `https://striveschool-api.herokuapp.com/api/profile/${query}/experiences/${expId}`,
                options
            );
            if (response.ok) {
                const data = await response.json();
                dispatch({
                    type: GET_EXPERIENCE_WITH_EXP_ID,
                    payload: data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const postUserExperience = (query) => {
    const roleInput = document.getElementById("experience-role")
    const companyInput = document.getElementById("experience-company")
    const startdateInput = document.getElementById("experience-startdate")
    const enddateInput = document.getElementById("experience-enddate")
    const descriptionInput = document.getElementById("experience-description")
    const areaInput = document.getElementById("experience-area")
    const editedData = {
        "role": roleInput.value,
        "company": companyInput.value,
        "startDate": startdateInput.value,
        "endDate": enddateInput.value,
        "description": descriptionInput.value,
        "area": areaInput.value,
    }
    return async (dispatch, getState) => {
        try {
            let res = fetch(`https://striveschool-api.herokuapp.com/api/profile/${query}/experiences`, {
                method: "POST",
                body: JSON.stringify(editedData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                },
            });
            dispatch(getUserProfileApi())
        } catch (error) {
            console.log(error);
        }
      );
    } catch (error) {
    console.log(error);
}
  };
};


export const deleteSpecificExperienceAction = (query, expId) => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(
                `https://striveschool-api.herokuapp.com/api/profile/${query}/experiences/${expId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                }
            }
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                dispatch({
                    type: DELETE_EXPERIENCE,
                    payload: data,
                });
                dispatch(getUserProfileApi())
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const putUserExperience = (query, expId) => {
    const roleInput = document.getElementById("put-experience-role")
    const companyInput = document.getElementById("put-experience-company")
    const startdateInput = document.getElementById("put-experience-startdate")
    const enddateInput = document.getElementById("put-experience-enddate")
    const descriptionInput = document.getElementById("put-experience-description")
    const areaInput = document.getElementById("put-experience-area")
    const editedData = {
        "role": roleInput.value ? (roleInput.value) : (roleInput.placeholder),
        "company": companyInput.value ? (companyInput.value) : (companyInput.placeholder),
        "startDate": startdateInput.value ? (startdateInput.value) : (startdateInput.placeholder),
        "endDate": enddateInput.value ? (enddateInput.value) : (enddateInput.placeholder),
        "description": descriptionInput.value ? (descriptionInput.value) : (descriptionInput.placeholder),
        "area": areaInput.value ? (areaInput.value) : (areaInput.placeholder),
    }
    return async (dispatch, getState) => {
        try {
            let res = fetch(`https://striveschool-api.herokuapp.com/api/profile/${query}/experiences/${expId}`, {
                method: "PUT",
                body: JSON.stringify(editedData),
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                }),
            })
            if (res.ok) {
                dispatch({
                    type: PUT_USER_EXPERIENCE_UPDATE,
                    payload: editedData,
                })
            };
        } catch (error) {
            console.log(error);
        }
    }
};

export const getUserbyId = (query) => {
    return async (dispatch, getState) => {
        const baseEndpoint =
            `https://striveschool-api.herokuapp.com/api/profile/` + query;
        try {
            let resp = await fetch(baseEndpoint, options);
            if (resp.ok) {
                dispatch({
                    type: GET_USER_LOADING,
                    payload: true,
                });
                let data = await resp.json();
                dispatch({
                    type: GET_USER_PROFILE_API,
                    payload: data,
                });
                dispatch({
                    type: GET_USER_LOADING,
                    payload: false,
                });
            } else {
                dispatch({
                    type: GET_USER_LOADING,
                    payload: false,
                });
                dispatch({
                    type: GET_USER_ERROR,
                    payload: true,
                });
            }
        } catch (error) {
            dispatch({
                type: GET_USER_LOADING,
                payload: false,
            });
            dispatch({
                type: GET_USER_ERROR,
                payload: true,
            });
        }
    };
};

export const sendPostAsyncAction = (editedData) => {
    return async (dispatch, getState) => {
        try {
            let res = fetch(`https://striveschool-api.herokuapp.com/api/posts/`, {
                method: "POST",
                body: JSON.stringify(editedData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y0OTAxNzExZDczZDAwMTM3YWFhZTQiLCJpYXQiOjE2NzY5NzIwNTUsImV4cCI6MTY3ODE4MTY1NX0.1aXNualFVdmtwB69PKh30KDhyA2nhUtW2MLjYMIt0qw",
                },
            });
            if (res.ok) {
                console.log("sending");
            }
        } catch (error) {
            console.log(error);
        }
    };
};
//POSTS

export const getPostAction = () => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(
                `https://striveschool-api.herokuapp.com/api/profile/posts`,
                options
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                dispatch({
                    type: GET_POSTS,
                    payload: data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getPostWithIdAction = (query) => {
    return async (dispatch, getState) => {
        try {
            const response = await fetch(
                `https://striveschool-api.herokuapp.com/api/profile/posts/${query}`,
                options
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                dispatch({
                    type: GET_POSTS_WITH_ID,
                    payload: data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
