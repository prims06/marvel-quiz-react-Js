import React, {useState, useEffect, useContext} from 'react'
import { FirebaseContext } from '../Firebase'
import {Tooltip as ReactToolTip} from 'react-tooltip'

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
            <span className='slider round' data-tooltip-id="disconnect" data-tooltip-content='Deconnexion'></span>
        </label>
        <ReactToolTip id='disconnect' place={'left'} effect={'solid'}/>
    </div>
  )
}

export default Logout