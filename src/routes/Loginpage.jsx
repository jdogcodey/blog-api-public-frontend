

export default function LoginPage() {
    return (
        <main>
            <form>
                <label htmlFor='first_name'>First Name:</label>
                <input id='first_name' name='first_name' type='text' placeholder='e.g. John' ></input>
                <label htmlFor='last_name'>Last Name:</label>
                <input id='last_name' name='last_name' type='text' placeholder='e.g. Smith'></input>
                <label htmlFor='username'>Username:</label>
                <input id='username' name='username' type='text' placeholder='e.g. JohnSmith123'></input>
                <label htmlFor='email'>Email:</label>
                <input id='email' name='email' type='email' placeholder='e.g. johnsmith@email.com'></input>
                <label htmlFor='password'>Password:</label>
                <input id='password' name='password' type='password'></input>
                <label htmlFor='confirm-password'>Confirm password:</label>
                <input id='confirm-password' name='confirm-password' type='password'></input>
                <input type='submit' value='Sign Up'></input>
            </form>
        </main>
    )
}