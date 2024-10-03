export const getListCity  = async () => {
    const response = await fetch(`http://localhost:3002/city`)
    const result = await response.json()
    return result;
};

export const getJobDetail = async (api) => {
    const response = await fetch(api)
    const result = await response.json()
    return result;
};

export const getDetailCompany = async (api) => {
    const response = await fetch(api)
    const result = await response.json()
    return result;
};

export const getInfoCompany = async (id) => {
    const response = await fetch(`http://localhost:3002/commpany/?id=${id}`)
    const result = await response.json()
    return result;
};

export const getAllCompany = async () => {
    const response = await fetch(`http://localhost:3002/commpany`)
    const result = await response.json()
    return result;
};

export const creatCv = async (data) => {
    const response = await fetch(`http://localhost:3002/cv`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response;
};
export const CheckExist = async (name, value) => {
    const response = await fetch(`http://localhost:3002/commpany/?${name}=${value}`,
        {
            method: 'GET',
        }
    )
    const result = await response.json()
    return result;
};

export const creatCompany = async (data) => {
    const response = await fetch(`http://localhost:3002/commpany`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response;
};

export const CheckLogin = async (email, password) => {
    const response = await fetch(`http://localhost:3002/commpany/?email=${email}&password=${password}`,
        {
            method: 'GET',
        }
    )
    const result = await response.json()
    return result;
};

export const getListCv = async (id) => {
    const response = await fetch(`http://localhost:3002/cv/?idCompany=${id}`)
    const result = await response.json()
    return result;
};

export const updateInfoCompany = async (id, data) => {
    const response = await fetch(`http://localhost:3002/commpany/${id}`,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }        
    )
    const result = await response.json();
    return result;
};
export const getTags = async () => {
    const response = await fetch(`http://localhost:3002/tags`)
    const result = await response.json()
    return result;
};
export const getCv = async (id) => {
    const response = await fetch(`http://localhost:3002/cv?idCompany=${id}`)
    const result = await response.json()
    return result;
};

export const deleteCv = async (id) => {
    const response = await fetch(`http://localhost:3002/cv/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
    },
})
return response;
};
export const getDetailCv = async (id) => {
    const response = await fetch(`http://localhost:3002/cv/${id}`)
    const result = await response.json()
    return result;
};

export const changeStatusCv = async (id, data) => {
    const response = await fetch(`http://localhost:3002/cv/${id}`,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        } 
    )
    const result = await response.json()
    return result;
}