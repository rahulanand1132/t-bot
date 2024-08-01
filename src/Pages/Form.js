import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import form from './Form.module.css'

export function Form() {
    useEffect(() => { console.log("Form"); }, []);
    const [name, setName] = useState("")
    const handleSubmit = () => {
        setName(name.toUpperCase())
    }
    return (
        <>
            <label>Enter your name:</label>
            <input className={form.text} type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} />
            <button onClick={() => handleSubmit()}>Upper Case</button>
            <div>Your name is {name}</div>
            <br />
            <Link to={"/"}>Go To Home</Link>
            <br />
            <Link to={"https://www.google.com"}>Go To Google</Link>
        </>
    )
}