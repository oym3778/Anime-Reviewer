export function SignUp() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-cyan-500">
        <h1 className="text-5xl">Revo</h1>
        {/* TODO Might chance this from a form to not be... We arent sending this data anywhere yet */}
        <form
          className="flex flex-col justify-center items-center bg-blue-500 size-150"
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
          <label className="label" htmlFor="password-confirm">
            Re-enter password
            <input
              className="input "
              required
              type="password"
              id="password-confirm"
            />
          </label>
          <button className="button">Sign-Up</button>
        </form>
        <button className="button" id="Sign-Up">
          Login
        </button>
      </div>
    </>
  );
}
