import "../index.css"

// eslint-disable-next-line react/prop-types
export default function Alert({type,message}){
  
    return(
    
    <div className={`alert ${type}`}  >
        
        <h4>{message}</h4>

    </div>
    
    
    );
}