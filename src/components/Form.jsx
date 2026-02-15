import React, { useEffect } from 'react'
import { postApi, updateApi } from '../api/PostApi';

export const Form = ({ data, setData, editData, setEditData }) => {
    const [addData, setAddData] = React.useState({
        title: "",
        body: ""
    });

    let isEmpty = Object.keys(editData).length === 0;

    useEffect(() => {
        editData && setAddData({
            title: editData.title || "",
            body: editData.body || ""
        })
    }, [editData])

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddData({ ...addData, [name]: value });
    }

    const addPostApi = async () => {
        const res = await postApi(addData);
        console.log("response", res);
        if (res.status === 201) {
            setData([...data, { ...res.data, id: Date.now() }]);
            setAddData({ title: "", body: "" });
        }
    }

    const updatePostApi = async () => {

        try {
            const res = await updateApi(editData.id, addData);
            if (res.status === 200) {
                setData((prev) => {
                    return prev.map((currElem) => {
                        return currElem.id === res.data.id ? res.data : currElem;

                    })
                })
                setAddData({ title: "", body: "" });
                setEditData({});
            }

        } catch (error) {
            console.log(error);
        }

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if (action === "Add") {
            addPostApi();
        }
        else if (action === "Edit") {
            updatePostApi();
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title"></label>
                    <input name="title" value={addData.title}
                        type="text" id='title' placeholder='Add Title'
                        onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="body"></label>
                    <input name="body" value={addData.body}
                        type="text" id='body' placeholder='Add Body'
                        autoComplete='off' onChange={handleInputChange} />
                </div>
                <button type='submit' value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
            </form>
        </div>
    )
}

export default Form