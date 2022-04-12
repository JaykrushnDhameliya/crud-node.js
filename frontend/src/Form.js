import React, {useState} from "react";
import axios from "axios";
import {Table, Button} from "antd";
import 'antd/dist/antd.css';


export default function Form() {
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [details, setDetails] = useState([]);
    const [id, setId] = useState('');
    const URL = 'http://localhost:5000/users';

    const submit = async () => {
        if(user.name===''&& user.email===''&&user.number===""){
            return
        }
        if (id === '') {
            console.log(id, "index");
            await setDetails([...details, user]);
            // console.log("data",);
            await axios.post(URL, user);
        } else {
            details[id] = user;
            console.log(details[id], "details[id]");
            setDetails([...details, user]);
            console.log(user, "user");
            await axios.put(`${URL}/${id}`, user);

        }
        setUser({name: '', email: '', number: ''})

        await showTable();
    };

    const handleChange = async (e) => {
        await setUser({...user, [e.target.name]: e.target.value})

    };

    const Edit = async (rec, index) => {
        console.log(rec, index, "edit")
        console.log(rec._id, "id")
        setId(rec._id)
        setUser({name: rec.name, email: rec.email, number: rec.number})
    };

    const Delete = async (id) => {
        console.log(id, "del");
        await axios.delete(`${URL}/${id}`);
        showTable();
    };

    const showTable = async () => {
        const storeData = await axios.get(URL)
            .then(res => res.data)
        console.log(storeData, "storeData")
        await setData(storeData)
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Action',
            render: (record, value, index) => {
                return (
                    <>
                        <Button type="primary" ghost onClick={() => Edit(record, index)}>Edit</Button>
                        <Button type="primary" danger ghost onClick={() => Delete(record._id)}>Delete</Button>
                    </>
                )
            }

        }
    ];
    console.log(user.number,"user.number")
    return (
        <>
            <form>
                <div className='container'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" name="name" className="form-control" id="name"
                               placeholder="Enter Your Name"
                               value={user.name} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" id="email"
                               placeholder="Enter Your Email-Id"
                               value={user.email} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Number</label>
                        <input type="number" name="number" className="form-control" id="number"
                               placeholder="Enter Your Mobile Number"
                               value={user.number} onChange={handleChange}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={submit}>Submit</button>
                    <button type="button" className="btn btn-primary" onClick={showTable}>showData</button>
                </div>

                <Table dataSource={data} columns={columns}/>;

            </form>
        </>

    )
}
