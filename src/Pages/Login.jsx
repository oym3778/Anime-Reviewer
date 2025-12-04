export function Login() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-blue-700">
        <h1 className="text-5xl">Revo</h1>
        {/* TODO Might chance this from a form to not be... We arent sending this data anywhere yet */}
        <form
          className="flex flex-col justify-center w-[80%] max-w-150 items-center bg-blue-500 size-150"
          action=""
        >
          <label className="label" htmlFor="username">
            Username:
            <input required className="input" type="text" id="username" />
          </label>
          <label className="label" htmlFor="password">
            Password:
            <input className="input " required type="password" id="password" />
          </label>
          <button className="button">Login</button>
        </form>
        <button className="button" id="Sign-Up">
          Sign-Up
        </button>
      </div>
    </>
  );
}
