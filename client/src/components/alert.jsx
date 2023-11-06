import "../index.css"

// eslint-disable-next-line react/prop-types
export default function Alert({type,message}){
  
    return(
    
    <div className={`alert ${type}`}  >
        
        <h1>{message}</h1>

    </div>
    
    
    );
}