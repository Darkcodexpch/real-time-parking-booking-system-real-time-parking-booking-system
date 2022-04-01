import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
function Protected(props) {
  let navigate = useNavigate()
  let Cmp = props.Cmp
  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem('logindata'));
      if(!data){
        navigate('/')
      }
  else if (data[0].type === 1) {
    navigate('/Booker')
  }

  else if (data[0].type === 0) {
    navigate('/Admin')
  }


  else{
    navigate('/')
  }

    
      
  },[])

    return (

      <div>
          <Cmp/>
      </div>
  )
}

export default Protected