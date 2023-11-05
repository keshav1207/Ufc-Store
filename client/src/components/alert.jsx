import "../index.css"

// eslint-disable-next-line react/prop-types
export default function Alert({message,type}){
    return(
    
    <div className={`alert ${type}` }>
        
        <h1>{message}</h1>

    </div>
    
    
    );
}