
function ErrorMsg({ message }) {
    return (
      <div className="bg-red-500 text-white p-4 rounded text-center transition-opacity duration-900 opacity-100">
        <p>{message}</p>
      </div>
    );
  }
  
  export default ErrorMsg;