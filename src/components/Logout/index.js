import React, {useState, useEffect, useContext} from 'react'
import { FirebaseContext } from '../Firebase'

const Logout = () => {

    const firebase = useContext(FirebaseContext);
    const [checked, setChecked] = useState(false)
    const handleChange = (event)=>{
        setChecked(event.target.checked)
    }
    useEffect( () => {
      if(checked){
        try {
            firebase.signout()
        } catch (error) {
            console.log(error)
        }
      }
    }, [checked, firebase])
    

  return (
    <div className='logoutContainer'>
        <label className='switch'>
            <input onChange={handleChange} type='checkbox' checked={checked}/>
            <span className='slider round'></span>
        </label>
    </div>
  )
}

export default Logout