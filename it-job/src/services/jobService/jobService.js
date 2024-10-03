export const getAllJob = async () => {
    const response = await fetch(`http://localhost:3002/jobs`)
    const result = await response.json()
    return result;
}
export const getListJob = async (id) => {
    const response = await fetch(`http://localhost:3002/jobs/?idCompany=${id}`)
    const result = await response.json()
    return result;
};
export const updateJob = async (id, data) => {
    const response = await fetch(`http://localhost:3002/jobs/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    return result;
};
export const creatJob = async (data) => {
    const response = await fetch(`http://localhost:3002/jobs`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
    return response;
};

export const deleteJob = async (id) => {
    const response = await fetch(`http://localhost:3002/jobs/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
    },
})
return response;
}